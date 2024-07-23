import { Router } from "express";
import isLoggedIn from "../middlewares/isLoggein.js";
import isAdmin from "../middlewares/isAdmin.js";
import { uploadDocument } from "../controllers/documentUploadController.js";
import { getDocument, getAllDocuments, deleteDocument } from "../controllers/documentDownloadController.js";

const documentRoutes = Router();
documentRoutes.get('/', isLoggedIn, getAllDocuments);
documentRoutes.get('/:title', isLoggedIn, getDocument);
documentRoutes.post('/upload/:title', isLoggedIn, uploadDocument);
documentRoutes.delete('/delete/:title', isLoggedIn, isAdmin, deleteDocument);

export default documentRoutes
