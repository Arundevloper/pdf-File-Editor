const { PDFDocument } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');
const { overwritePDF } = require('../utils/pdfUtils');

async function extractPagesAndCreatePDF(req, res) {
    const { filename, selectedPages } = req.body;

    try {
        // Read the original PDF file
        const originalPdfBytes = await fs.readFile(`../Backend/uploads/${filename}`);

        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();

        // Loop through selected pages and add them to the new PDF
        for (const pageNum of selectedPages) {
            const [copiedPage] = await pdfDoc.copyPages(
                await PDFDocument.load(originalPdfBytes),
                [pageNum - 1]
            );
            pdfDoc.addPage(copiedPage);
        }

        // Save the new PDF to a buffer
        const pdfBytes = await pdfDoc.save();

        // Overwrite the existing PDF file with the new PDF content
        const success = await overwritePDF(filename, pdfBytes);
        if (success) {
            // Send the updated PDF file as a response
            res.sendFile(path.join(__dirname, '../uploads', filename));
        } else {
            res.status(500).json({ error: 'An error occurred while overwriting the PDF file' });
        }
    } catch (error) {
        console.error('Error extracting pages and creating PDF:', error);
        res.status(500).json({ error: 'An error occurred while processing the PDF' });
    }
}

module.exports = { extractPagesAndCreatePDF };
