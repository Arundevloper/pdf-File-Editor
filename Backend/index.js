const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const connectDb = require('./database/dbConnect');
const Routes = require('./Routes/auth.Routes');
const pdfRoutes = require('./Routes/pdf.Routes');


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true 
}));

dotenv.config({
  path: './.env'
})

app.get("/" ,(req,res)=>{
  res.json("hello World");
})

app.get("/login" ,(req,res)=>{
  res.json("hello World");
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
