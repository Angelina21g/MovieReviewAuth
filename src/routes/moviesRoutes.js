// Express routes for movie CRUD operations.
import express from "express"; 

//Imports controller functions and defines endpoints.
import{ getMovies, getMovieById, addMovie, updateMovie, deleteMovie,} from "../controllers/movieController.js";

const router = express.Router();

//GET /Get all movies
router.get("/",getMovies);

//GET /Get a movie by ID
router.get("/:id", getMovieById);

//POST /Add a new movie
router.post("/", addMovie);

//PUT /Update a movie
router.put("/:id", updateMovie);

//DELETE/ Delete a movie
router.delete("/:id", deleteMovie);

export default router;