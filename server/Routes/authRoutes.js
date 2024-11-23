const express = require('express');
const { signup,signin } = require('../controllers/auth.controllers'); 
// const {signup}=require('../controllers/auth.controllers') // Import the controller

const router = express.Router();

// Signup route using controller
router.post('/signup', signup);
router.post('/signin', signin);
module.exports = router;
