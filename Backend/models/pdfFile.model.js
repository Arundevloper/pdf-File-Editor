const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({

    //Refrence of user for each pdf file
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userRegister',
        required: true
    },

    filename: { type: String, required: true },

}, {
    timestamps: true
});

const PDF = mongoose.model('PDF', pdfSchema);

module.exports = PDF;
