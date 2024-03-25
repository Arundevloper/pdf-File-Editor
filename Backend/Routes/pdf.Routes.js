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
router.post('/api/uploadpdf',uploadpdf,extractUserDataFromToken,saveUploadedFile);




// Home page route
router.get('/api/getPdfByUser',authenticate, extractUserDataFromToken,getPdfByUser);
  
// Define a route to serve PDF files
router.get('/api/view-pdf/:filename', (req, res) => {
    const filename = req.params.filename;
    res.sendFile(path.join(__dirname, '../uploads', filename));
});

router.delete('/api/delete-pdf/:filename',authenticate, deletePDF);

router.get('/api/pdfPageCount/:filename',authenticate,getPdfPagesCount);

router.post('/api/extract-pdf/',authenticate,extractPagesAndCreatePDF);


module.exports=router;