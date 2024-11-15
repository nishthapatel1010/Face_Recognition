const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: function () {
      return this.role === "user";
    },
    match: /^[0-9]{10}$/,
    unique: true,
  },
  dateOfJoining: {
    type: Date,
    required: function () {
      return this.role === "user";
    },
  },
  age: {
    type: Number,
    required: function () {
      return this.role === "user";
    },
    min: 1,
  },
  gender: {
    type: String,
    required: function () {
      return this.role === "user";
    },
  },
  role: { type: String, required: true, enum: ["user", "admin"] },
});

// Hash password before saving the user model
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
