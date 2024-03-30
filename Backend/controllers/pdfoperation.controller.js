const PDF = require('../models/pdfFile.model');
const fs = require('fs').promises;
const path = require('path');
const { PDFDocument } = require('pdf-lib');

const getPdfByUser = async (req, res) => {
    try {
        const userId = req.userId;
        const page = parseInt(req.query.page) || 1; // Current page (default: 1)
        const limit = parseInt(req.query.limit) || 4; // Items per page (default: 4)
        const startIndex = (page - 1) * limit;

        // Fetch PDF files count for the user
        const totalItems = await PDF.countDocuments({ user: userId });

        // Calculate total pages
        const totalPages = Math.ceil(totalItems / limit);

        // Fetch PDF files for the user with pagination, sorted by createdAt in descending order
        const pdfFiles = await PDF.find({ user: userId })
            .sort({ createdAt: -1 }) // Sorting in descending order based on createdAt
            .skip(startIndex)
            .limit(limit);

        res.status(200).json({ pdfFiles, totalPages }); // Sending total pages in response
    } catch (error) {
        console.error('Error retrieving PDF files for user:', error);
        res.status(500).json({ error: 'An error occurred while retrieving PDF files for user' });
    }
};





const deletePDF = async (req, res) => {
    try {
        console.log("check");

        const filename = req.params.filename;
        const pdf = await PDF.findOne({ filename });


        const filePath = path.join(__dirname, '../uploads', filename);
        await fs.unlink(filePath);

        await PDF.deleteOne({ filename });

        res.status(200).json({ message: 'PDF file deleted successfully' });
    } catch (error) {
        console.error('Error deleting PDF file:', error);
        res.status(500).json({ error: 'An error occurred while deleting the PDF file' });
    }
};

const getPdfPagesCount = async (req, res) => {
    const filename = req.params.filename;

    try {
        const pdfBytes = await fs.readFile(path.join(__dirname, '../uploads', filename));
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const pageCount = pdfDoc.getPageCount();
        res.status(200).json({ pageCount });
    } catch (error) {
        console.error('Error getting PDF page count:', error);
        res.status(500).json({ error: 'An error occurred while getting PDF page count' });
    }
};

module.exports = { getPdfByUser, deletePDF, getPdfPagesCount };
