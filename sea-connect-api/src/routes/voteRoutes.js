import { Router } from "express";
import isLoggedIn from "../middlewares/isLoggein.js";
import isAdmin from "../middlewares/isAdmin.js";
import { createVote, getActiveVotes, getCompletedRounds } from "../controllers/voteController.js";
import { createVoteRound, castVote, getRoundResult, updateRound } from "../controllers/voteRoundsController.js";

const voteRoutes = Router();
voteRoutes.post('/create-vote', isLoggedIn, isAdmin, createVote)
voteRoutes.post('/create-round', isLoggedIn, isAdmin, createVoteRound)
voteRoutes.get('/get-active-votes', isLoggedIn, getActiveVotes)
voteRoutes.post('/cast-vote', isLoggedIn, castVote)
voteRoutes.get('/get-round-result/:roundId', isLoggedIn, getRoundResult)
voteRoutes.put('/update-round/:roundId', isLoggedIn, isAdmin, updateRound)
voteRoutes.get('/get-compeleted-votes', isLoggedIn, getCompletedRounds)

export default voteRoutes
