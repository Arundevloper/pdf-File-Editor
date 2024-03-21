const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

const UPLOADS_DIR = './uploads';

async function updatePDF(req, res) {
    try {
        const { filename, selectedPages } = req.body;

        // Load the existing PDF file
        const filePath = `${UPLOADS_DIR}/${filename}`;
        const existingPdfBytes = fs.readFileSync(filePath);
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        // Remove existing pages
        pdfDoc.removePages(selectedPages);

        // Save the updated PDF
        const updatedPdfBytes = await pdfDoc.save();
        fs.writeFileSync(filePath, updatedPdfBytes);

        res.status(200).send({ message: 'PDF updated successfully' });
    } catch (error) {
        console.error('Error updating PDF:', error);
        res.status(500).send({ error: 'An error occurred while updating PDF' });
    }
}

module.exports = {
    updatePDF
};
