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



        res.cookie('uid', token, {
            // Set appropriate options based on the environment
            domain: undefined,
            secure:undefined,
            expires: new Date(Date.now() + 3600000), // 1 hour from now
            httpOnly: false
          });
          


    } catch (error) {
        console.error("Login error:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = login;
