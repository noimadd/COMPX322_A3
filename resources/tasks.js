import {
    createTask,
    getAllTasks,
    getTaskById,
    getTasksByStatus,
    getTasksByTitle,
    updateTask,
    deleteTask,
    deleteAllTasks
} from '../db.js';

const validStatuses = ['todo', 'in-progress', 'completed'];

// POST stuff

// create task
export async function createTaskHandler(req, res) {
    const { title, course, due_date, priority, status } = req.body;

    if (!title || !course || !due_date || !priority || !status) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    try {
        const result = await createTask(title, course, due_date, priority, status);
        return res.status(201).json({ message: 'Task created successfully', id: result.insertId, title, course, due_date, priority, status });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}