import VoteRound from "../models/voteRound.js";
import VoteCast from "../models/voteCast.js";
import VoteService from "../services/voteService.js";

const createVoteRound = async (req, res) => {
  const body = req.body;

  if (!body.voteId || !body.startDate || !body.endDate || !body.voteOptions) return res.status(400).json({ message: "fields are missing", success: false });

  const data = {
    voteId: body.voteId,
    startDate: body.startDate,
    endDate: body.endDate,
    voteOptions: body.voteOptions    
  }

  try {
    const vote = await VoteRound.createRound(data);
    res.status(201).json({ message: "Vote created successfully", success: true, data: vote });
  } catch (err) {
    res.status(500).json({ message: "Error creating Vote", success: false, error: err.message });
  }
}


const castVote = async (req, res) => {
  const body = req.body;
  if (!body.voteId || !body.roundId || !body.voteOption) return res.status(400).json({ message: "fields are missing", success: false });
  const vote = await VoteCast.exists(req.user.email, body.roundId)
  if (vote) return res.status(400).json({ message: "You have already casted your vote", success: false });

  const data = {
    voteId: body.voteId,
    roundId: body.roundId,
    voteOption: body.voteOption,
    voterId: req.user.id,
    voterEmail: req.user.email
  }

  try {
    const vote = await VoteCast.castVote(data);
    res.status(201).json({ message: "Vote casted successfully", success: true, data: vote });
  } catch (err) {
    res.status(500).json({ message: "Error casting Vote", success: false, error: err.message });
  }
}

const getRoundResult = async (req, res) => {
  const roundId = req.params.roundId;
  if (!roundId) return res.status(400).json({ message: "Round ID is required", success: false });

  try {
    const round = await VoteRound.getRound(roundId);
    if (round.endDate > new Date()) return res.status(404).json({ message: "Round not finished yet", success: false });

    const result = await VoteService.getRoundResult(round);
    res.status(200).json({ message: "Round result retrieved successfully", success: true, data: result });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving round result", success: false, error: err.message });
  }
}

const updateRound = async (req, res) => {
  const roundId = req.params.roundId;
  const data = {};

  if (req.body.startDate) data.startDate = req.body.startDate;
  if (req.body.endDate) data.endDate = req.body.endDate;
  if (req.body.voteOptions) data.voteOptions = req.body.voteOptions;

  try {
    const round = await VoteRound.updateRound(roundId, data);
    res.status(200).json({ message: "Round updated successfully", success: true, data: round });
  } catch (err) {
    res.status(500).json({ message: "Error updating Round", success: false, error: err.message });
  }
}


export { createVoteRound, castVote, getRoundResult, updateRound };
