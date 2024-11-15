// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');  // Import the DB connection function
const signupRoutes = require('./Routes/User.Route');  // Import the signup route
const uploadRoutes = require('./Routes/Upload.Route');  // Import the upload route

dotenv.config();  // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

// Connect to MongoDB
connectDB();

// Use the signup and upload routes
app.use('/api/auth', signupRoutes); // Adjust the path as needed
app.use('/api/upload', uploadRoutes); // Adjust the path as needed

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
