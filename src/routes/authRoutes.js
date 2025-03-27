// Import Express to create the router
import express from 'express';

// Import the controller functions for registering and logging in users
import { registerUser, loginUser } from '../controllers/authControllers.js';

// Create a new router object from Express
const router = express.Router();


// Route for registering a new user
// URL: POST /api/auth/register
// This route will call the registerUser controller

router.post('/register', registerUser);


// Route for logging in an existing user
// URL: POST /api/auth/login
// This route will call the loginUser controller

router.post('/login', loginUser);

// Export the router so it can be used in app.js
export default router;
