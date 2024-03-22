const PDF = require('../models/pdfFile.model');
const fs = require('fs');
const path = require('path');


const getPdfByUser = async (req, res) => {
    try {
        // Extract user ID from request parameters
        const userId =  req.userId;

        // Query PDF documents associated with the specified user ID
        const pdfFiles = await PDF.find({ user: userId });

        // Respond with the list of PDF files for the specified user
        res.status(200).json({ data: pdfFiles });
    } catch (error) {
        console.error('Error retrieving PDF files for user:', error);
        // Handle errors
        res.status(500).json({ error: 'An error occurred while retrieving PDF files for user' });
    }
};


// Controller function to delete a PDF file
const deletePDF = async (req, res) => {
    try {
        const filename = req.params.filename;

        // Find the PDF document in the database
        const pdf = await PDF.findOne({ filename });

        if (!pdf) {
            return res.status(404).json({ error: 'PDF file not found' });
        }

        // Delete the PDF file from the 'uploads' directory
        const filePath = path.join(__dirname, '../uploads', filename);
        fs.unlinkSync(filePath);

        // Delete the PDF document from the database
        await PDF.deleteOne({ filename });

        res.status(200).json({ message: 'PDF file deleted successfully' });
    } catch (error) {
        console.error('Error deleting PDF file:', error);
        res.status(500).json({ error: 'An error occurred while deleting the PDF file' });
    }
};


async function getPdfPagesCount(req, res) {
    const filename = req.params.filename;

    try {
        // Read the PDF file
        const pdfBytes = await fs.readFile(`../Backend/uploads/${filename}`);

        // Load the PDF document
        const pdfDoc = await PDFDocument.load(pdfBytes);

        // Get the number of pages
        const pageCount = pdfDoc.getPageCount();

        // Send the number of pages as a response
        res.status(200).json({ pageCount });
    } catch (error) {
        console.error('Error getting PDF page count:', error);
        res.status(500).json({ error: 'An error occurred while getting PDF page count' });
    }
}

module.exports = {
    getPdfByUser,deletePDF,getPdfPagesCount
};
