import { Router } from "express";
import isLoggedIn from "../middlewares/isLoggein.js";
import isAdmin from "../middlewares/isAdmin.js";
import { createAssembly, getAllAssemblies, updateAssembly, recordVote, voteResult } from "../controllers/assembliesController.js";

const assembliesRoutes = Router();
assembliesRoutes.post('/create', isLoggedIn, isAdmin, createAssembly)
assembliesRoutes.get('/get', isLoggedIn, getAllAssemblies)
assembliesRoutes.put('/update/:id', isLoggedIn, isAdmin, updateAssembly)
assembliesRoutes.post('/:id/vote', isLoggedIn, recordVote)
assembliesRoutes.get('/:id/result', isLoggedIn, isAdmin, voteResult)


export default assembliesRoutes

