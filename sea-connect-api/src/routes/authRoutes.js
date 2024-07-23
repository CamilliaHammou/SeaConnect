import { Router } from "express";
import isLoggedIn from "../middlewares/isLoggein.js";
import { register, login, me } from "../controllers/usersController.js";

const authRoutes = Router();
authRoutes.get('/me', isLoggedIn, me)
authRoutes.post('/login', login)
authRoutes.post('/register', register)

export default authRoutes
