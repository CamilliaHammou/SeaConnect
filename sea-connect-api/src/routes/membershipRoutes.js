import { Router } from "express";
import isLoggedIn from "../middlewares/isLoggein.js";
import { getMemberShipHistory, createMembership } from "../controllers/membershipHistoryConntroller.js";


const memberShipRoutes = Router();
memberShipRoutes.get('/', isLoggedIn, getMemberShipHistory)
memberShipRoutes.post('/create-membership', isLoggedIn, createMembership)

export default memberShipRoutes
