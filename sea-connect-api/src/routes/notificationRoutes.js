import { Router } from "express";
import isLoggedIn from "../middlewares/isLoggein.js";
import isAdmin from "../middlewares/isAdmin.js";
import { createNotification, markRead, getNotifications } from "../controllers/notificationController.js";


const notificationRoutes = Router();
notificationRoutes.post('/create-notification', isLoggedIn, isAdmin, createNotification)
notificationRoutes.post('/mark-read', isLoggedIn, markRead)
notificationRoutes.get('/', isLoggedIn, getNotifications)

export default notificationRoutes
