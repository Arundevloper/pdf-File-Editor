const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

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
    return jwt.verify(token, jwtSecret);
}

module.exports = {
    setUser,
    getUser
};
