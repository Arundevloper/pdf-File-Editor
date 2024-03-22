const fs = require('fs').promises;

async function overwritePDF(filename, newPdfBytes) {
    try {
        // Read the existing PDF file
        const existingPdfBytes = await fs.readFile(`../Backend/uploads/${filename}`);

        // Overwrite the existing PDF file with the new PDF content
        await fs.writeFile(`../Backend/uploads/${filename}`, newPdfBytes);

        console.log('PDF file overwritten successfully');
        return true;
    } catch (error) {
        console.error('Error overwriting PDF file:', error);
        return false;
    }
}

module.exports = { overwritePDF };
