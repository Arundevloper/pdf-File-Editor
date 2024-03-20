const { UserModel } = require("../models/userRegister.model");
const {setUser}=require("../middleware/JswToken.middleware");
const bcrypt = require('bcrypt');


async function login(req, res) {
    const { email, password } = req.body;


    try {
        // Find the user by email
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).send("invalid user Name and password");
        }

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).send("invalid user Name and password");
        }
        console.log(user);
        const token = setUser(user);
        res.cookie("uid", token);

        //if successfully logined send this respose to the user
        return res.redirect('/home');



    } catch (error) {
        console.error("Login error:", error.message);
        return res.status(500).send( "Internal server error" );
    }
}

module.exports=login;