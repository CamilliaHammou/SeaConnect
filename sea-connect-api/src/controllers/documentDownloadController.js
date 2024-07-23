import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';
import Document from '../models/document.js';

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const conn = mongoose.connection;

let gfs;
conn.once('open', () => {
  gfs = new GridFSBucket(conn.db, {
    bucketName: 'documents'
  });
});

const getDocument = async (req, res) => {
  const { title } = req.params;

  try {
    const document = await Document.getDocument(title);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }
    if (document.owner !== req.user.role) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const downloadStream = gfs.openDownloadStreamByName(document.documentUrl);
    
    downloadStream.on('error', (err) => {
      console.error('Stream error:', err);
      res.status(404).json({ message: "File not found" });
    });

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${document.documentUrl}"`);
    downloadStream.pipe(res);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Error retrieving document", error: err.message });
  }
};

const getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.getAllDocuments(req.user);
    res.status(200).json({ message: "Documents retrieved successfully", data: documents });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving documents", error: err.message });
  }
}

const deleteDocument = async (req, res) => {
  const title = req.params.title;

  if (!title) return res.status(400).json({ message: "Title is required", success: false });

  try {
    const comment = await Document.deleteDocument(title);
    res.status(200).json({ message: "Comment deleted successfully", success: true, data: comment });
  } catch (err) {
    res.status(500).json({ message: "Error deleting comment", success: false, error: err.message });
  }
}

export { getDocument, getAllDocuments, deleteDocument };
