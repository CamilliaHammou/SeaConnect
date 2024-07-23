import User from "../models/user.js";
import bcrypt from "bcrypt";

const getAllMembers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    const usersWithoutPassword = users.map(item => {
      const { password, ...rest } = item;
      return rest;
    });
    res.status(200).json({ message: "Members retrieved successfully", success: true, data: usersWithoutPassword });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving members", success: false, error: err.message });
  }
}


const updateMember = async (req, res) => {
  const memberEmail = req.body.memberEmail;
  const updateFields = req.body.updateFields;
  if (updateFields.role) {
    updateFields.role = updateFields.role.toUpperCase();
  }

  if (!memberEmail || !updateFields) {
    return res.status(400).json({ message: "Member email and update fields are required", success: false });
  }

  try {
    const user = await User.exists(memberEmail);

    if (!user) {
      return res.status(404).json({ message: `User with email ${memberEmail} not found`, success: false });
    }

    await User.update(user, updateFields);
    res.status(200).json({ message: "Member updated successfully", success: true });
  } catch (err) {
    res.status(500).json({ message: "Error updating member", success: false, error: err.message });
  }
}


const updateEmail = async (req, res) => {
  const memberEmail = req.body.memberEmail;
  const newEmail = req.body.newEmail;

  if (!memberEmail || !newEmail) {
    return res.status(400).json({ message: "Member email and new email are required", success: false });
  }

  try {
    const user = await User.exists(memberEmail);

    if (!user) {
      return res.status(404).json({ message: `User with email ${memberEmail} not found`, success: false });
    }

    const emailExists = await User.exists(newEmail);
    if (emailExists) {
      return res.status(409).json({ message: 'User with new email already exists', success: false });
    }

    await User.update(user, { email: newEmail });
    res.status(200).json({ message: "Email updated successfully", success: true });
  } catch (err) {
    res.status(500).json({ message: "Error updating email", success: false, error: err.message });
  }
}


const updatePhone = async (req, res) => {
  const memberEmail = req.body.memberEmail;
  const newPhone = req.body.newPhone;

  if (!memberEmail || !newPhone) {
    return res.status(400).json({ message: "Member email and new phone are required", success: false });
  }

  try {
    const user = await User.exists(memberEmail);

    if (!user) {
      return res.status(404).json({ message: `User with email ${memberEmail} not found`, success: false });
    }

    const phoneExists = await User.phoneExists(newPhone);
    if(phoneExists) {
      return res.status(409).json({ message: 'User with new phone already exists', success: false });
    }

    await User.update(user, { phone: newPhone });
    res.status(200).json({ message: "Phone updated successfully", success: true });
  } catch (err) {
    res.status(500).json({ message: "Error updating phone", success: false, error: err.message });
  }
}

const addMember = async (req, res) => {
  const { email, password, firstName, lastName, role } = req.body;


  if (!email || !password || !firstName || !lastName, !role) {
    return res.status(400).json({ message: "fields are missing", success: false });
  }

  try {
    const userExists = await User.exists(email.toLowerCase());
    if (userExists) {
      return res.status(409).json({ message: 'User already exists with this email', success: false });
    }

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.HASH_PASSWORD_SALT_ROUNDS) || 10);

    await User.create(email.toLowerCase(), hashedPassword, firstName, lastName, role);
    res.status(201).json({ message: "User registered successfully!", success: true });

  } catch(error) {
    res.status(500).json({ message: "Error registering new user", success: false, error: error.message });
  }

}

const deleteMember = async (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).json({ message: "Email is required", success: false });
  }

  try {
    const user = await User.exists(email);

    if (!user) {
      return res.status(404).json({ message: `User with email ${email} not found`, success: false });
    }

    await User.delete(user);
    res.status(200).json({ message: "User deleted successfully", success: true });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", success: false, error: err.message });
  }
}

export { getAllMembers, addMember, updateMember, updateEmail, updatePhone, deleteMember };
