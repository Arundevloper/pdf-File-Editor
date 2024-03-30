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




        // Set the uid cookie with the token
        res.cookie("uid", token, {
            domain: '.pdf-file-editor.vercel.app',
            maxAge: 3600000, // Cookie expiry time in milliseconds (optional)
            httpOnly: true, // Set to true to prevent client-side access (optional)
            secure: true // Set to true if your application is served over HTTPS (optional)
        }).json({
            message: "Login successfully"
        });



    } catch (error) {
        console.error("Login error:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = login;
