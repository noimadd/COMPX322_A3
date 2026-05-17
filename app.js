import express from 'express';
import {
    createTaskHandler,
    getAllTasksHandler,
    getTaskByIdHandler,
    getTasksByStatusHandler,
    getTasksByTitleHandler,
    updateTaskHandler,
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
app.get('/tasks', getAllTasksHandler);
app.get('/tasks/:id', getTaskByIdHandler);
app.get('/tasks/status/:status', getTasksByStatusHandler);
app.get('/tasks/search/:title', getTasksByTitleHandler);
app.put('/tasks/:id', updateTaskHandler);

// start server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});