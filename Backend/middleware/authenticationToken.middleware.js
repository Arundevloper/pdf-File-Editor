const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
    
    const token = req.cookies.uid;


    if (!token) {
        // return res.render("/login", {
        //     error:"Please login to register"
        // });

        return res.send("please login to continue");
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (error) {
        return res.redirect("/login");
    }
}

module.exports = authenticateToken;
