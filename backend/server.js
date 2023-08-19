
// ==========================================Import required modules and configuration files==========================================
import express from "express";
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"; // Custom error handling middleware

const port = process.env.PORT || 5000; // Define the port for the server to listen on

import userRoutes from "./routes/userRoutes.js"; // Import user-related routes

// Create an instance of the Express application
const app = express();

// Set up routes for handling user-related API requests
app.use('/api/users/', userRoutes);

// Set up a basic route for the root URL
app.get('/', (req, res) => res.send("Server is ready"));

// Handle cases when no route matches the request with the 'notFound' middleware
app.use(notFound);

// Handle errors and provide consistent responses with the 'errorHandler' middleware
app.use(errorHandler);

// Start the Express server on the specified port
app.listen(port, () => console.log(`Server started on port ${port}`));
