const { Server } = require('http');
const path = require('path');
const express = require('express');

// route stuff

// index routes
const indexRoutes = require('./routes/index.routes.js');

// app setup
const app = express();
const PORT = process.env.PORT || 3000;

// environment variables
const dotenv = require('dotenv');
dotenv.config();

// pages
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// static files
app.use(express.static(path.join(__dirname, 'public')));

// main routes
app.use('/', indexRoutes);

// start server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});