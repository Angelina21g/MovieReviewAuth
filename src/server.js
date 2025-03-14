import app from "./app.js"; //import the Express app
import dotenv from 'dotenv'; //Load enviroment variables
import connectDB from "./config/db.js";

//To Access .env properties like (connection URI) 
dotenv.config(); 

//Connect to MongoDB Database
await connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { 
    console.log(` Server running on http://localhost:${PORT}`); 
});