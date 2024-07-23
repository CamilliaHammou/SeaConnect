import { Router } from "express";
import isLoggedIn from "../middlewares/isLoggein.js";
import { createCustomer, updateCustomer, createSetupIntent, deleteUserCard, getCardInfo, confirmAndMakePayment, readyForPayment, confirmSetupIntent } from "../controllers/stripe.js";

const stripeRoutes = Router();
stripeRoutes.post('/create-customer', isLoggedIn, createCustomer)
stripeRoutes.post('/update-customer', isLoggedIn, updateCustomer)
stripeRoutes.post('/create-setup-intent', isLoggedIn, createSetupIntent)
stripeRoutes.post('/confirm-setup-intent', isLoggedIn, confirmSetupIntent)
stripeRoutes.post('/ready-for-payment', isLoggedIn, readyForPayment)
stripeRoutes.post('/confirm-and-make-payment', isLoggedIn, confirmAndMakePayment)
stripeRoutes.post('/get-card-info', isLoggedIn, getCardInfo)
stripeRoutes.post('/delete-user-card', isLoggedIn, deleteUserCard)


export default stripeRoutes
