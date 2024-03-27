const multer = require("multer");


// Define storage options for customer images
const customerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../Backend/uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });



  const multerErrorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      res.status(500).json({ error: 'pdf Files are allowed only' });
    } else {
      res.status(500).json({ error: 'An error occurred during file upload' });
    }
  };
  
  // Define file filters
  const fileFilter = (req, file, cb) => {
    const allowedTypes = ['application/pdf']; // Allow PDF files for documents
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("File type is not supported"), false);
    }
  };
  
  // Multer configuration for customer images
  const uploadpdf = multer({
    storage: customerStorage,
    fileFilter: fileFilter
  }).single('uploadpdf');
  

  module.exports=uploadpdf;