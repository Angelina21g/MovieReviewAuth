// Import the User model to interact with users in the database
import User from '../models/userModel.js';

// Import JWT to create signed tokens
import jwt from 'jsonwebtoken';

// Import bcrypt to hash and compare passwords securely
import bcrypt from 'bcrypt';

// Generate a JWT token for a logged-in user

const generateToken = (user_id) => {
  // Sign a token using the user's ID and a secret from .env
  return jwt.sign({ user_id }, process.env.JWT_SECRET, {
    expiresIn: '7d', // Token expires in 7 days
  });
};


// REGISTER a New User
export const registerUser = async (req, res) => {
  try {
    // Get user info from request body
    const { username, email, password } = req.body;

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Create a new user (password is hashed in the model's pre-save hook)
    const newUser = new User({ username, email, password });
    await newUser.save();

    // Generate a token for the new user
    const token = generateToken(newUser.user_id);

    // Send the token back in the response
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};


// LOGIN an Existing User

export const loginUser = async (req, res) => {
  try {
    // Get login credentials from the request body
    const { email, password } = req.body;

    // Check if a user with this email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the entered password with the hashed password in the database
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a token if credentials are valid
    const token = generateToken(user.user_id);

    // Send the token in the response
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
