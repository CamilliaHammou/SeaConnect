import { Router } from "express";
import isLoggedIn from "../middlewares/isLoggein.js";
import isAdmin from "../middlewares/isAdmin.js";
import { getActiveMembershipPlans, getAllMembershipPlans, createMembershipPlan, updateMembershipPlan } from "../controllers/membershipPlanController.js";


const membershipPlanRoutes = Router();
membershipPlanRoutes.get('/', isLoggedIn, getActiveMembershipPlans);
membershipPlanRoutes.get('/all-plans', isLoggedIn, isAdmin, getAllMembershipPlans);
membershipPlanRoutes.post('/create-plan', isLoggedIn, isAdmin, createMembershipPlan);
membershipPlanRoutes.put('/update-plan/:planid', isLoggedIn, isAdmin, updateMembershipPlan);

export default membershipPlanRoutes
