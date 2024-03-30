const jwt = require('jsonwebtoken');
const jwtSecret = "arun@321";

const extractUserDataFromToken = (req, res, next) => {
    const token = req.cookies.uid; 

    //if token is not in cookie response with loggedin false
    if (!token) {
        console.log("User token not found");
        return res.json({
            loggedIn: false,
            username: null
        });
    }

    try {
        // Decode JWT token
        const decoded = jwt.verify(token, jwtSecret);

        // Add user ID and username to the request object
        req.userId = decoded.id;
        req.username = decoded.name;

        next(); // Move to the next middleware or route handler

    } catch (error) {
        console.error('Error decoding JWT token:', error);
        res.status(401).send('Unauthorized'); // Send 401 Unauthorized if token is invalid
    }
};

module.exports = extractUserDataFromToken;
