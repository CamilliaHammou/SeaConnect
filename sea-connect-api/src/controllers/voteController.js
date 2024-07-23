import Vote from "../models/vote.js";
import VoteService from "../services/voteService.js";

const createVote = async (req, res) => {
  const body = req.body;

  if (!body.title || !body.resultType) return res.status(400).json({ message: "fields are missing", success: false });

  const data = {
    title: body.title,
    description: body?.description, 
    totalRounds: body?.totalRounds || 1,
    resultType: body.resultType.toUpperCase(),
  }

  try {
    const vote = await Vote.createVote(data);
    res.status(201).json({ message: "Vote created successfully", success: true, data: vote });
  } catch (err) {
     console.log(err)
    res.status(500).json({ message: "Error creating Vote", success: false, error: err.message });
  }
}

const getActiveVotes = async (req, res) => {
  try {
    const votes = await VoteService.getVotes();
    res.status(200).json({ message: "Votes retrieved successfully", success: true, data: votes });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving Votes", success: false, error: err.message });
  }
}

const getCompletedRounds = async (req, res) => {
  try {
    const rounds = await VoteService.getVotes(true);
    res.status(200).json({ message: "Rounds retrieved successfully", success: true, data: rounds });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving Rounds", success: false, error: err.message });
  }
}

export { createVote, getActiveVotes, getCompletedRounds };
