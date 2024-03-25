const PDF = require('../models/pdfFile.model');

const saveUploadedFile = async (req, res) => {
    try {
        const userId = req.userId;
        
        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Create a new PDF document with the user ID and other details
        const newPDF = new PDF({
            user: userId, 
            filename: req.file.filename, 
        });

        // Save the new PDF document to the database
        await newPDF.save();

        // Respond with success message
        return res.status(201).json({ message: 'PDF saved successfully', data: newPDF });
    } catch (error) {
        console.error('Error saving PDF document:', error);
        
        // Handle specific errors
        if (error.code === 11000) { // Duplicate key error
            return res.status(400).json({ error: 'Duplicate filename' });
        }

        // Handle other errors
        return res.status(500).json({ error: 'An error occurred while saving the PDF document' });
    }
};

module.exports = {
    saveUploadedFile
};
