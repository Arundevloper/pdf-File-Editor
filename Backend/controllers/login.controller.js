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




        res.cookie("uid", token, {
            Domain:undefined,
            secure:false,
            withCredentials: true,
            httpOnly: true,
          });
          res.status(201).json({ message: "User logged in successfully", success: true });


    } catch (error) {
        console.error("Login error:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = login;
