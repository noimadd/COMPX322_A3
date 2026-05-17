const express = require('express');

// app setup
const app = express();
const PORT = process.env.PORT || 5000;

// environment variables
const dotenv = require('dotenv');
dotenv.config();

// static files
app.use(express.json());
app.use(express.static('public'));

// start server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});