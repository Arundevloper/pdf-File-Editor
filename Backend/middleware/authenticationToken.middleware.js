const jwt = require('jsonwebtoken');
const jwtSecret ="arun@321";

function authenticateToken(req, res, next) {
    
    const token = req.cookies.uid;
    
    if (!token) {
        
        return res.status(401).json({ error: "Unauthorized",token });
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
