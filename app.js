
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');

const AuthRoutes = require('./Routes/auth') ;
const HomeRoutes = require('./Routes/Home') ;


const app = express() ;


app.use(bodyParser.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.use(AuthRoutes) ;
app.use(HomeRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});


mongoose.connect('mongodb+srv://empo:Bassel12@cluster0.jfpug.mongodb.net/Task_Manager')
.then( () => {
    app.listen(8080) ;
})
.catch(err => {
    console.log(err) ;
});





