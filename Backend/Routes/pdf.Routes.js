const express = require('express');
const router = express.Router();
const path = require('path');

//Middlewares
const uploadpdf=require('../middleware/uploadpdf.middleware');
const extractUserDataFromToken=require('../middleware/extractUsersId.middleware');
const authenticate=require('../middleware/authenticationToken.middleware');

//controllers
const {saveUploadedFile}=require('../controllers/uploadPdf.controller');
const {getPdfByUser,deletePDF,getPdfPagesCount}=require('../controllers/pdfoperation.controller');
const { extractPagesAndCreatePDF }=require('../controllers/extractPagesAndCreatePDF.controller');

//Router to save pdf file in database and in upload file
router.post('/api/uploadpdf',authenticate,uploadpdf,extractUserDataFromToken,saveUploadedFile);




// Home page route
router.post('/home',authenticate, extractUserDataFromToken,getPdfByUser);
  
// Define a route to serve PDF files
router.get('/view-pdf/:filename', (req, res) => {
    const filename = req.params.filename;
    res.sendFile(path.join(__dirname, '../uploads', filename));
});

// Define a route to delete a PDF file
router.delete('/delete-pdf/:filename',authenticate, deletePDF);

router.get('/extract-pdf/:filename',getPdfPagesCount);

router.post('/extract-pdf',extractPagesAndCreatePDF);


module.exports=router;