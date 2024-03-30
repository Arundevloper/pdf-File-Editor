const express = require('express');
const router = express.Router();

//Middlewares
const authenticate=require('../middleware/authenticationToken.middleware');
const extractUserDataFromToken=require('../middleware/extractUsersId.middleware');

//Controllers
const registerController = require('../controllers/userRegister.controller');
const loginController = require('../controllers/login.controller');

//jwt files
// const jwt = require('jsonwebtoken');
// const jwtSecret = process.env.JWT_SECRET;

// Register route
router.post('/api/register',registerController);

// Login route
router.post('/api/login',loginController);

// Login route
router.get('/trail',(req,res)=>{
  res.json("hello World");
})

// Checking if user credentials 
router.get('/api/checkLoginStatus', extractUserDataFromToken, (req, res) => {
  console.log(req.username);
  res.json({
    loggedIn: true,
    username: req.username,
    id: req.userId

  });
});


// Logout route
router.get('/api/logout', (req, res) => {
  // Clear the JWT token from cookies
  res.clearCookie('uid');

  // Respond with success message or status code
  res.status(200).json({ message: 'Logout successful' });
});



  

module.exports = router;
