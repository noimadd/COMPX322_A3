import express from 'express';
import {
    createTaskHandler,
} from './resources/tasks.js';

// app setup
const app = express();
const PORT = process.env.PORT || 5000;

// environment variables
import dotenv from 'dotenv';
dotenv.config();

// static files
app.use(express.json());
app.use(express.static('public'));

// route stuff
app.post('/tasks', createTaskHandler);

// start server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});