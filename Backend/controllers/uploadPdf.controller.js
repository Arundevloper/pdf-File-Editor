const PDF = require('../models/pdfFile.model');

const saveUploadedFile = async (req, res) => {
    try {
        const userId = req.userId;
        
        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Get the incoming filename and substring (14) from it
        const incomingFilename = req.file.filename;
        const incomingSubstring = incomingFilename.substring(14);

      //  console.log("substring incomeing file name"+incomingSubstring);

        // Find all existing PDFs for the users
        const existingPDFs = await PDF.find({ user: userId });

        // Check if any existing filenames match the incoming substring
        const isDuplicate = existingPDFs.some(pdf => {
            const existingSubstring = pdf.filename.substring(14);
            return existingSubstring === incomingSubstring;
        });

        // If there's a duplicate, return an error response
        if (isDuplicate) {
            return res.status(400).json({ error: 'Duplicate filename' });
        }

        // Create a new PDF document with the user ID and other details
        const newPDF = new PDF({
            user: userId, 
            filename: incomingFilename, 
        });

        // Save the new PDF document to the database
        await newPDF.save();

        // Respond with success message
        return res.status(201).json({ message: 'PDF saved successfully', data: newPDF });
    } catch (error) {
        console.error('Error saving PDF document:', error);
        
        // Handle other errors
        return res.status(500).json({ error: 'An error occurred while saving the PDF document' });
    }
};

module.exports = {
    saveUploadedFile
};
