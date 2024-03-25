const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
    
    const token = req.cookies.uid;
    
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    else{
        
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
    }

}

module.exports = authenticateToken;
