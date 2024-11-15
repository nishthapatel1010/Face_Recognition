const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true, // Optional, adds validation for the image field
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
    },
  },
);

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;


