const PDF = require('../models/pdfFile.model');
const fs = require('fs').promises;
const path = require('path');
const { PDFDocument } = require('pdf-lib');

const getPdfByUser = async (req, res) => {
    try {
        const userId = req.userId;
        const pdfFiles = await PDF.find({ user: userId });
        console.log("file retrive successfully");
        res.status(200).json({ pdfFiles });
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

        if (!pdf) {
            return res.status(404).json({ error: 'PDF file not found' });
        }

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
