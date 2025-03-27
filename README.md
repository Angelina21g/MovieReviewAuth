# Movie Review API

A simple Node.js API for managing movie reviews. This API allows users to register, log in, and perform CRUD operations on movies and reviews. Each user can only manage their own data. It uses Express for routing, Mongoose for working with MongoDB Atlas, and JWT for secure authentication.

## Installation

1. **Clone the repository:**

   git clone <repository_url>
   cd movie-review-api-auth

2. **Install dependencies:**
npm install

3. **Set up environment variables:**

Create a .env file in the root directory and add:

MONGO_URI=mongodb+srv://<username>:<password>@clustermovie.benpl.mongodb.net/movie-review-api?retryWrites=true&w=majority
JWT_SECRET=yourSecretKey
PORT=3000

4. **Run the project:**

npm run dev

The server will be running at http://localhost:3000.

# What the API Does
This API allows each user to have a secure space where they can:

- Register and log in using their own email and password
 - Add, view, update, and delete their own movies
 - Leave reviews for specific movies (with rating and comments)
- Ensure no other user can modify their movies or reviews
-  Access protected routes only after logging in with a valid token

# Notes
- All passwords are hashed using bcrypt.
- Users can only access or modify their own movies and reviews.
- JWT tokens expire in 7 days.