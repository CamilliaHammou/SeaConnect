import MemberShipHistory from '../models/membershipHistory.js';

const getMemberShipHistory = async (req, res) => {
  const currentUser = req.user;
  const userEmail =  currentUser.role === 'ADMIN' ? req.query.email: currentUser?.email
  if (!userEmail) return res.status(400).json({ message: "Member Email is required", success: false });

  try {
    const memberShipHistory = await MemberShipHistory.getMembershipHistory(userEmail);
    res.status(200).json({ message: "MemberShip Hostory retrieved successfully", success: true, data: memberShipHistory });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving Membership history", success: false, error: err.message });
  }
}

const createMembership = async (req, res) => {
  const currentUser = req.user;

  if (!req.body.membershipType || !req.body.membershipPlanId) {
    return res.status(400).json({ message: "Membership Type and Membership Plan Id are required", success: false });
  }

  const data = {
    membershipType: req.body.membershipType.toUpperCase(),
    membershipPlanId: req.body.membershipPlanId
  }

  try {
    const membership = await MemberShipHistory.createMembership(currentUser, data);
    res.status(200).json({ message: "Membership created successfully", success: true, data: membership });
  } catch (err) {
    res.status(500).json({ message: "Error creating Membership", success: false, error: err.message });
  }
}

export { getMemberShipHistory, createMembership };
