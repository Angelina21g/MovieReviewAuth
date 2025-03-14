# Movie Review API

A simple Node.js API for managing movie reviews. This API allows you to add, view, update, and delete movies with their ratings. It uses Express for routing and Mongoose to interact with MongoDB Atlas.

## Installation

1. **Clone the repository:**

   git clone <repository_url>
   cd movie-review-api

2. **Install dependencies:**
npm install

3. **Set up environment variables:**

Create a .env file in the root directory and add:

MONGODB_URI=mongodb+srv://<username>:<password>@clustermovie.benpl.mongodb.net/movie-review-api?retryWrites=true&w=majority
PORT=3000

4. **Run the project:**

npm run dev

The server will be running at http://localhost:3000.

# What the API Does
This API is a basic CRUD application for managing movies:

Create: Add new movies with a title and rating.
Read: Retrieve all movies or a specific movie by its ID.
Update: Modify the title and rating of an existing movie.
Delete: Remove a movie from the collection.