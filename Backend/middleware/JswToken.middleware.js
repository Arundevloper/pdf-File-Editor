const jwt = require("jsonwebtoken");
const jwtSecret = "arun@321";

function setUser(user) {
    try {
        // Extract necessary information from the user object
        const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
        };

        // Set expiration time 
        const expiresIn = '1h'; // 1 hour

        // Generate JWT token with the payload and expiration time
        return jwt.sign(payload, jwtSecret, { expiresIn });
    } catch (error) {
        console.error("Error generating JWT token:", error);
        throw new Error("Failed to generate JWT token");
    }
}

function getUser(token) {
    try {
        // Verify and decode the JWT token
        return jwt.verify(token, jwtSecret);
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            // Token expired error
            throw new Error("Token expired. Please log in again.");
        } else if (error instanceof jwt.JsonWebTokenError) {
            // Invalid token error
            throw new Error("Invalid token. Please log in again.");
        } else {
            // Other errors
            console.error("Error decoding JWT token:", error);
            throw new Error("Failed to decode JWT token");
        }
    }
}

module.exports = {
    setUser,
    getUser
};
