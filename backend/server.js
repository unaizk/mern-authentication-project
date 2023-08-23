
// ==========================================Import required modules and configuration files==========================================
import express from "express";
import cors from "cors"
import path from 'path';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"; // Custom error handling middleware
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";  // importing mongodb connected function
const port = process.env.PORT || 5000; // Define the port for the server to listen on
import adminRoutes from "./routes/adminRoutes.js"
import userRoutes from "./routes/userRoutes.js"; // Import user-related routes

connectDB(); //calling mongoDB connected function that is imported from config folder

// Create an instance of the Express application
const app = express();

// Middleware to parse incoming JSON data in the request body.
// This allows us to access the JSON data in route handlers using req.body.
app.use(express.json());

// Middleware to parse incoming URL-encoded data in the request body.
// The extended option set to true allows handling rich objects and arrays in the URL-encoded data.
// This middleware makes the parsed data available in route handlers using req.body.
app.use(express.urlencoded({extended:true}))


app.use(cookieParser());

app.use(express.static('backend/public'));

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// Set up routes for handling user-related API requests
app.use('/api/users/', userRoutes);

// Set up routes for handling admin-related API requests
app.use('/api/admin/', adminRoutes);

// Set up a basic route for the root URL
app.get('/', (req, res) => res.send("Server is ready"));

// Handle cases when no route matches the request with the 'notFound' middleware
app.use(notFound);

// Handle errors and provide consistent responses with the 'errorHandler' middleware
app.use(errorHandler);

// Start the Express server on the specified port
app.listen(port, () => console.log(`Server started on port ${port}`));
