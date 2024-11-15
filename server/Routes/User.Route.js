const express = require('express');
const User = require('../models/User');  // Import the User model
const bcrypt = require('bcrypt'); // Ensure bcrypt is imported
const jwt = require('jsonwebtoken'); // Import jwt for token generation
const router = express.Router();  // Create a new router instance


// Signup route
router.post('/signup', async (req, res) => {
  const { name, email, phone, age, gender, dateOfJoining, password, secretKey, role } = req.body;

  // Validate required fields for all users
  if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Required fields are missing." });
  }

  // Validate email format
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
  }

  // Password validation (at least 8 characters, 1 number, and 1 special character)
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordPattern.test(password)) {
      return res.status(400).json({ message: "Password must be at least 8 characters long, include a number and a special character." });
  }

  // Additional validations for 'user' role
  if (role === 'user') {
      if (!phone || !age || !gender || !dateOfJoining) {
          return res.status(400).json({ message: "Required user fields are missing." });
      }

      const phonePattern = /^[0-9]{10}$/;
      if (!phonePattern.test(phone)) {
          return res.status(400).json({ message: "Phone number must be 10 digits." });
      }

      if (isNaN(age) || age <= 0) {
          return res.status(400).json({ message: "Invalid age provided." });
      }
  }

  // Admin role validation with secret key
  if (role === 'admin') {
      if (!secretKey || secretKey !== process.env.ADMIN_SECRET_KEY) {  // Ensure ADMIN_SECRET_KEY is defined in environment variables
          return res.status(403).json({ message: "Invalid admin secret key." });
          // console.log("Loaded ADMIN_SECRET_KEY:", process.env.ADMIN_SECRET_KEY);
      }
  }

  try {
      // Check if user with this email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: "User with this email already exists." });
      }

      // (Optional) Check if phone number already exists for user role
      if (role === 'user') {
          const existingPhone = await User.findOne({ phone });
          if (existingPhone) {
              return res.status(400).json({ message: "User with this phone number already exists." });
          }
      }

      // Hash password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create and save new user
      const newUser = new User({
          name,
          email,
          phone,
          age,
          gender,
          dateOfJoining,
          password: hashedPassword,
          role,
      });

      await newUser.save();

      // Respond with success message
      res.status(201).json({ message: "Signup successful. Please log in." });
  } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: "Internal server error. Please try again." });
  }
});


// Sign-in route
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  // Validate email and password presence
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide both email and password",
    });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare entered password (trimmed) with stored hash
    const isMatch = await bcrypt.compare(password.trim(), user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const authToken = jwt.sign(
      { userId: user._id, role: user.role }, // Optionally include role
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      success: true,
      message: "Sign-in successful",
      authToken,
    });

  } catch (err) {
    console.error("Error in sign-in route:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
});


module.exports = router;
