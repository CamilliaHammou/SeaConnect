import MembershipPlan from "../models/membershipPlan.js";

const getActiveMembershipPlans = async (req, res) => {
  try {
    const activeMembershipPlans = await MembershipPlan.getActiveMembershipPlans();
    res.status(200).json({ message: "Membership Plans retrieved successfully", success: true, data: activeMembershipPlans });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving Membership Plans", success: false, error: err.message });
  }
}

const getAllMembershipPlans = async (req, res) => {
  try {
    const allMembershipPlans = await MembershipPlan.getAllMembershipPlans();
    res.status(200).json({ message: "Membership Plans retrieved successfully", success: true, data: allMembershipPlans });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving Membership Plans", success: false, error: err.message });
  }
}

const createMembershipPlan =  async (req, res) => {
  const body = req.body;

  if (!body.membershipType || !body.amount) {
    return res.status(400).json({ message: "Fields are missing", success: false });
  }

  const data = {
    membershipType: body?.membershipType?.toUpperCase(),
    amount: body?.amount,
    description: body?.description,
    status: 'ACTIVE',
  };

  try {
    const membershipPlan = await MembershipPlan.createMembershipPlan(data);
    res.status(201).json({ message: "Membership plan created successfully", success: true, data: membershipPlan });
  } catch (err) {
    res.status(500).json({ message: "Error creating membership plan", success: false, error: err.message });
  }
}


const updateMembershipPlan = async (req, res) => {
  const membershipPlanId = req.params.planid;
  const data = {};

  if (req.body.membershipType) data.membershipType = req.body.membershipType.toUpperCase();
  if (req.body.description) data.description = req.body.description;
  if (req.body.amount) data.amount = req.body.amount;
  if (req.body.status) data.status = req.body.status.toUpperCase();

  try {
    const updateMembershipPlan = await MembershipPlan.updateMembershipPlan(membershipPlanId, data);
    res.status(200).json({ message: "Event updated successfully", success: true, data: updateMembershipPlan });
  } catch (err) {
    res.status(500).json({ message: "Error updating Event", success: false, error: err.message });
  }
}


export { getActiveMembershipPlans, getAllMembershipPlans, createMembershipPlan, updateMembershipPlan };
