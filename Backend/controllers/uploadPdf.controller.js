const PDF = require('../models/pdfFile.model');

const saveUploadedFile = async (req, res) => {
    try {
        
        const userId = req.userId;

        // Create a new PDF document with the user ID and other details
        const newPDF = new PDF({
            user: userId, 
            filename: req.file.filename, 
        });

        // Save the new PDF document to the database
        await newPDF.save();

        // Respond with success message
        res.status(201).json({ message: 'PDF saved successfully', data: newPDF });
    } catch (error) {
        console.error('Error saving PDF document:', error);
        // Handle errors
        res.status(500).json({ error: 'An error occurred while saving the PDF document' });
    }
};


module.exports = {
    saveUploadedFile
};
