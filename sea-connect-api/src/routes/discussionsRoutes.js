import { Router } from "express";
import isLoggedIn from "../middlewares/isLoggein.js";
import isAdmin from "../middlewares/isAdmin.js";
import { startDiscussion, addComment, getComments, deleteComment, getAllDiscussions } from "../controllers/discussionController.js";


const discussionRoutes = Router();
discussionRoutes.get('/', isLoggedIn, getAllDiscussions)
discussionRoutes.post('/start', isLoggedIn, isAdmin, startDiscussion)
discussionRoutes.post('/add-comment', isLoggedIn, addComment)
discussionRoutes.get('/get-comment/:discussionId', isLoggedIn, getComments)
discussionRoutes.delete('/delete-comment/:commentId', isLoggedIn, deleteComment)


export default discussionRoutes
