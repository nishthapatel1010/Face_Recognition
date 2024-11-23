const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] }, // Ensures only specific values
  age: { type: Number, required: true, min: 0 }, // Age must be non-negative
  phone: { type: String, required: true, match: /^\d{10}$/ }, // Validates 10-digit phone number
  dateOfJoining: { type: Date, required: true }, // Date must be provided
});

module.exports = mongoose.model('User', userSchema);
