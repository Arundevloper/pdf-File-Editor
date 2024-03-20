const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
},
    {
        timestamps: true
    });

// Hash the password before saving to the database
userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password'))
        return next();

    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = {
    userSchema,
    UserModel
};
