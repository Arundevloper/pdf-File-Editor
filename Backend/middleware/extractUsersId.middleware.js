const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const extractUserDataFromToken = (req, res, next) => {
    const token = req.cookies.uid; // Assuming the JWT token is stored in a cookie named 'uid'

    if (!token) {
        console.log("User token not found");
        return res.json({
            loggedIn: false,
            username: null // or send an empty string, depending on your preference
        }); // Send 401 Unauthorized if token is missing
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
