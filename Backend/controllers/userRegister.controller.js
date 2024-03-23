const { UserModel } = require('../models/userRegister.model');



async function register(req, res) {
    const { name, email, password,gender} = req.body;

    try {
        // Check if a user with the same email already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Create a new user instance
        const newUser = new UserModel({
            name,
            email,
            password,
            gender
        });

        // Save the new user to the database
        await newUser.save();

        console.log("Register successfully");
        // Respond with success message or perform any additional actions
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'An error occurred while registering user' });
    }
}

module.exports = register;
