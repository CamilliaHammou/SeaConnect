import { Router } from "express";
import isLoggedIn from "../middlewares/isLoggein.js";
import isAdmin from "../middlewares/isAdmin.js";
import { getAllContributions, createContribution, getMyContributions, getUserContributions } from "../controllers/contributionsController.js";


const contributionRoutes = Router();
contributionRoutes.get('/', isLoggedIn, isAdmin, getAllContributions)
contributionRoutes.get('/user-contribution/:email', isLoggedIn, isAdmin, getUserContributions)
contributionRoutes.get('/my-contribution', isLoggedIn, getMyContributions)
contributionRoutes.post('/create-contribution', isLoggedIn, createContribution)

export default contributionRoutes
