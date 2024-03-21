const express = require('express');
const router = express.Router();

//Middlewares
const authenticate=require('../middleware/authenticationToken.middleware');
const extractUserDataFromToken=require('../middleware/extractUsersId.middleware');

//Controllers
const registerController = require('../controllers/userRegister.controller');
const loginController = require('../controllers/login.controller');

//jwt files
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

// Register route
router.post('/register',registerController);

// Login route
router.post('/login',loginController);




// Logout route
router.get('/logout', (req, res) => {
  // Clear the JWT token from cookies
  res.clearCookie('uid');

  // Respond with success message or status code
  res.status(200).json({ message: 'Logout successful' });
});



  

module.exports = router;
