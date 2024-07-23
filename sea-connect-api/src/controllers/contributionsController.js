import Contribution from "../models/contribution.js";

const getAllContributions = async (req, res) => {
  try {
    const contributions = await Contribution.getAllContributions();
    res.status(200).json({ message: "Contributions retrieved successfully", success: true, data: contributions });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving Contributions", success: false, error: err.message });
  }
}

const getUserContributions = async (req, res) => {
  const userEmail = req.params.email
  if (!userEmail) return res.status(400).json({ message: "Member Email is required", success: false });

  try {
    const contributions = await Contribution.getUserContributions(userEmail);
    res.status(200).json({ message: "Contributions retrieved successfully", success: true, data: contributions });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving Contributions", success: false, error: err.message });
  }
}

const getMyContributions = async (req, res) => {
  const userEmail = req.user.email

  try {
    const contributions = await Contribution.getUserContributions(userEmail);
    res.status(200).json({ message: "Contributions retrieved successfully", success: true, data: contributions });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving Contributions", success: false, error: err.message });
  }
}

const createContribution = async (req, res) => {
  const currentUser = req.user;
  const body = req.body;

  if (!body.amount || !body.contributionType) return res.status(400).json({ message: "fields are missing", success: false });

  const data = {
    userID: currentUser.id,
    userEmail: currentUser.email,
    amount: body.amount,
    contributionDate: new Date(),
    contributionType: body.contributionType.toUpperCase(),
  }

  try {
    const contribution = await Contribution.createContribution(data);
    res.status(201).json({ message: "Contribution created successfully", success: true, data: contribution });
  } catch (err) {
    res.status(500).json({ message: "Error creating Contribution", success: false, error: err.message });
  }
}


export { getAllContributions, createContribution, getUserContributions, getMyContributions };
