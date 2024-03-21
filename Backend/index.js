const express=require('express');
const app=express();
require('dotenv').config();
const path = require('path');


const Routes=require('./Routes/auth.Routes');
const pdfRoutes=require('./Routes/pdf.Routes');
const connectDb=require('./database/dbConnect');

//app.use(express.static('public'));
//app.set('view engine','ejs');
//app.set('views', path.join(__dirname, 'views'));
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use('/',Routes);
app.use('/',pdfRoutes);

const PORT = process.env.PORT || 3000;
connectDb('pdf_Editor');
app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`);
});