// backend/server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./Routes/authRoutes");
const uploadRoutes=require("./Routes/Upload.Route")
const cors = require('cors');
// const signup=require('./')
const app = express();  

dotenv.config();
connectDB();

app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from the frontend running on localhost:3000
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
}));
// Middleware
app.use(express.json());
// console.log("Signup function:", signup); // Should log the function definition
// console.log("Signin function:", signin);
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/upload",uploadRoutes)
// app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
