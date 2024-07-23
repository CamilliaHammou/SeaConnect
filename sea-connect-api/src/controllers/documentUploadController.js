import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import Document from '../models/document.js';

const storage = new GridFsStorage({
  url: process.env.DATABASE_URL,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: 'documents'
    };
  }
});

const upload = multer({ storage }).single('file');


const uploadDocument = async (req, res) => {
  var title = req.params.title

  const document = await Document.getDocument(title)
  if (document) {
    return res.status(409).json({ message: "Document already exists", success: false });
  }

  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "File upload failed", success: false, error: err.message });
    }
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded", success: false });
      }

      var { title } = req.params;
      var { description, owner, category } = req.body;
      if (!title || !owner || !category) {
        return res.status(400).json({ message: "Missing required metadata", success: false });
      }

      const sanitizeInput = (input) => {
        if (typeof input === 'string') {
          return input.replace(/^"|"$/g, '');
        }
        return input;
      };

      owner = sanitizeInput(owner);

      console.log("params", title, description, owner)
      const data = {
        title,
        description,
        owner: owner.toUpperCase(),
        category: category.toUpperCase(),
        documentUrl: req.file.filename,
        fileId: req.file.id
      };

      const newDocument = await Document.createDocument(data);
      res.json({
        message: "File uploaded successfully",
        success: true,
        document: newDocument
      });

    } catch (error) {
      return res.status(500).json({ message: "Error processing upload", success: false, error: error.message });
    }
  });
};

export { uploadDocument };
