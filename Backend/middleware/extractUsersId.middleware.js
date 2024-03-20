const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const extractEmployeeId = (req, res, next) => {
    try {
        const token = req.cookies.uid; // Assuming JWT is stored in a cookie named 'uid'
        if (!token) {
            throw new Error('Token not found');
        }
        const decoded = jwt.verify(token, jwtSecret); // Replace 'arun@123' with your actual JWT secret key
        req.id = decoded.id; // Assuming 'id' is stored in the token
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = extractEmployeeId;
