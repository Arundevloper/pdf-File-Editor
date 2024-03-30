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

        // If login is successful, generate JWT token
        const token = setUser(user);

        // Set cookie options based on the environment
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : undefined
        };

        // Set the JWT token as a cookie
        res.cookie('uid', token, cookieOptions);

        // Send JSON response indicating success
        return res.status(200).json({ message: "Cookie set successfully" });

    } catch (error) {
        console.error("Login error:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = login;
