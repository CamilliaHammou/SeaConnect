import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const isLoggedIn = async (req, res, next) => {
  const token = req.headers.authorization;

  if(!token) { return res.status(401).json({ message: "Unauthorized: No token provided" })}

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const email = decoded.email;
    req.user = await User.exists(email)
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default isLoggedIn;
