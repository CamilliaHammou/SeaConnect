import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { config } from 'dotenv';
const result = config();

//register
const jwtSecretKey = process.env.JWT_SECRET_KEY

const register = async (req, res) => {
  const { email, password, firstName, lastName} = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: "Fields are missing", success: false });
  }

  try {
    const userExists = await User.exists(email.toLowerCase());
    if (userExists) {
      return res.status(409).json({ message: 'User already exists with this email', success: false });
    }

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.HASH_PASSWORD_SALT_ROUNDS) || 10);

    const user = await User.create(email.toLowerCase(), hashedPassword, firstName, lastName);

    const token = jwt.sign({ email: user.email.toLowerCase() }, jwtSecretKey, { expiresIn: '24h' });

    const { password: userPassword, ...userWithoutPassword } = user;

    res.status(201).json({ message: "User registered successfully!", success: true, token: token, role: user.role, user: userWithoutPassword });

  } catch(error) {
    res.status(500).json({ message: "Error registering new user", success: false, error: error.message });
  }
}

//login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.exists(email.toLowerCase());
    if (!user) return res.status(404).json({ message: `User with email ${email} not found`, success: false });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid password", success: false });

    const token = jwt.sign({ email: user.email.toLowerCase() }, jwtSecretKey, { expiresIn: '24h' });
    const { password: userPassword, ...userWithoutPassword } = user;

    return res.status(200).json({ message: "Login successful", token: token, success: true, role: user.role, user: userWithoutPassword });
  }
  catch (error) {
    res.status(500).json({ message: error.message, success: false })
  }
}

const me = async (req, res) => {
  const user = req.user;
  const { password: userPassword, ...userWithoutPassword } = user;
  res.status(200).json({ message: "User found", success: true, role: user.role, user: userWithoutPassword });
}

export { register, login, me };
