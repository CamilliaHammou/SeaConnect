import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.js";
import memberRoutes from "./src/routes/memberRoutes.js";
import contributionRoutes from "./src/routes/contributionRoutes.js";
import memberShipRoutes from "./src/routes/membershipRoutes.js";
import eventRoutes from "./src/routes/eventRoutes.js";
import membershipPlanRoutes from "./src/routes/membershipPlanRoutes.js";
import stripeRoutes from "./src/routes/stripeRoutes.js";
import voteRoutes from "./src/routes/voteRoutes.js";
import assembliesRoutes from "./src/routes/assembliesRoutes.js";
import documentRoutes from "./src/routes/documentRoutes.js";
import notificationRoutes from "./src/routes/notificationRoutes.js";
import discussionRoutes from "./src/routes/discussionsRoutes.js";

import { config } from 'dotenv';
const result = config();

const app = express();
const PORT = process.env.SERVER_PORT || 3002

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes)
app.use('/api/member', memberRoutes)
app.use('/api/contribution', contributionRoutes)
app.use('/api/membership', memberShipRoutes)
app.use('/api/event', eventRoutes)
app.use('/api/plans', membershipPlanRoutes)
app.use('/api/stripe', stripeRoutes)
app.use('/api/vote', voteRoutes)
app.use('/api/assemblies',assembliesRoutes)
app.use('/api/document', documentRoutes)
app.use('/api/notification', notificationRoutes)
app.use('/api/discussion', discussionRoutes)


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
