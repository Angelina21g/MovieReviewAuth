// Database connection using Mongoose.

import dotenv from 'dotenv';
import mongoose from 'mongoose';

//To Access .env properties like (connection URI)
dotenv.config();

//Function to Connect with Database
const connectDB = async () => {
    try {
await mongoose.connect(process.env.MONGODB_URI,{
    //Need to add atleast these 2 properties
    dbName: "movie-review-api",
    appName: "movie-review-api"
});
 console.log("Database connected successfully!")
    } catch (error){
        console.error(error);
    }
};
export default connectDB;