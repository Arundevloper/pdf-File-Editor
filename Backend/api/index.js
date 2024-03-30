const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const connectDb = require('../database/dbConnect');
const Routes = require('../Routes/auth.Routes');
const pdfRoutes = require('../Routes/pdf.Routes');

app.use(
  cors({
    origin: ["https://pdf-file-editor.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.get("/api/" ,(req,res)=>{
  res.json("hello World 1234");
})


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const cookieParser = require('cookie-parser');
app.use(cookieParser());



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', Routes);
app.use('/', pdfRoutes);


const PORT = process.env.PORT || 5000;
connectDb();


app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});

