const { UserModel } = require("../models/userRegister.model");
const { setUser } = require("../middleware/JswToken.middleware");
const bcrypt = require('bcrypt');

async function login(req, res) {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        console.log("Login successfully");
        const token = setUser(user);

        // Define cookie configuration
        const cookieConfig = {
            httpOnly: true, // Set to true to mitigate XSS attacks
            expires: new Date(Date.now() + 24 * 3600000), // Example: Expires in 24 hours
            secure: process.env.NODE_ENV !== 'development', // Set to true in production
        };

        // Customize cookie settings for development environment
        if (process.env.NODE_ENV === 'development') {
            cookieConfig.domain = 'undefined'; // Set domain to "undefined" in development
            cookieConfig.secure = false; // Set secure to false in development
            cookieConfig.name = 'uid'; // Omit the "__Secure-" prefix in development
        }

        // Set the token as a cookie
        res.cookie(process.env.NODE_ENV === 'development' ? 'uid' : '__Secure-uid', token, cookieConfig);




        res.status(201).json({ message: "User logged in successfully", success: true });


    } catch (error) {
        console.error("Login error:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = login;
