import { Router } from "express";
import isLoggedIn from "../middlewares/isLoggein.js";
import isAdmin from "../middlewares/isAdmin.js";
import { getActiveEvents, getAllEvents, createEvent, updateEvent, deleteEvent, registerEvent } from "../controllers/eventsController.js";


const eventRoutes = Router();
eventRoutes.get('/', isLoggedIn, getActiveEvents);
eventRoutes.get('/getAllEvents', isLoggedIn, isAdmin, getAllEvents);
eventRoutes.post('/createEvent', isLoggedIn, isAdmin, createEvent);
eventRoutes.put('/updateEvent/:eventId', isLoggedIn, isAdmin, updateEvent);
eventRoutes.delete('/deleteEvent/:eventId', isLoggedIn, isAdmin, deleteEvent);
eventRoutes.post('/register', isLoggedIn, registerEvent);

export default eventRoutes
