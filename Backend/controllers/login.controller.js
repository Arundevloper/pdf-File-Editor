const { UserModel } = require("../models/userRegister.model");
const { setUser } = require("../middleware/JswToken.middleware");
const bcrypt = require('bcrypt');

async function login(req, res) {
    const { email, password } = req.body;
        res.status(200).json("2000");
}

module.exports = login;
