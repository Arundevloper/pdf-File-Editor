const express = require('express');
const router = express.Router();
const authenticate=require('../middleware/authenticationToken.middleware');
const registerController = require('../controllers/userRegister.controller');
const loginController = require('../controllers/login.controller');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;


// Register route
router.post('/register',registerController);

// Login route
router.post('/login',loginController);

//Home page route
router.post('/home',authenticate,(req,res)=>{
    const token = req.cookies.uid;
    if (token) {
        // Decode JWT token
        const decoded = jwt.verify(token, jwtSecret);
        
        //res.render('dashboard', {name: decoded.name });
        res.send( {name: decoded.name });
      } else {
        // Handle case where token is missing or invalid
        res.send( {"error": "login First" }) 
      }
    });
  

module.exports = router;
