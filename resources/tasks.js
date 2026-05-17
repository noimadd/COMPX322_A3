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

const validStatuses = ['todo', 'in-progress', 'completed']; // valid status options for tasks

// POST stuff

// create task
export async function createTaskHandler(req, res) {
    const { title, course, due_date, priority, status } = req.body;

    // validates all req fields are present
    if (!title || !course || !due_date || !priority || !status) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // validates status matches a valid option
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    // attempts to create a new task in db and returns the new id and task info 
    try {
        const result = await createTask(title, course, due_date, priority, status);
        return res.status(201).json({ message: 'Task created successfully', id: result.insertId, title, course, due_date, priority, status });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// GET stuff

// get all tasks
export async function getAllTasksHandler(req, res) {
    // attempts to get all tasks from db
    try {
        const tasks = await getAllTasks();
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// get task by id
export async function getTaskByIdHandler(req, res) {
    const id = parseInt(req.params.id); // converts id to an int for db query

    // validates that id is a positive integer
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'Invalid task ID. ID must be a positive integer.' });
    }

    // attempts to get task with matching id from db and returns it
    // throws error if the query fails or if no task with the id exists
    try {
        const task = await getTaskById(id);
        if (!task) {
            return res.status(404).json({ error: `No task with ID ${id} found` });
        }
        return res.status(200).json(task);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// get tasks by status
export async function getTasksByStatusHandler(req, res) {
    const status = req.params.status; // gets status from url params

    // validates status matches a valid option
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: `Status is Invalid - It must be one of: ${validStatuses.join(', ')}` });
    }

    // attempts to get tasks with matching status from db and returns them
    try {
        const tasks = await getTasksByStatus(status);
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// get tasks by title
export async function getTasksByTitleHandler(req, res) {
    const title = req.params.title; // gets title from url params

    // validates title is not empty
    if (!title || title.trim() === '') {
        return res.status(400).json({ error: 'A task title is required' });
    }

    // attempts to get tasks with a like title match from db and returns all of them
    try {
        const tasks = await getTasksByTitle(title.trim());
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// PUT stuff

// update task via id
export async function updateTaskHandler(req, res) {
    const id = parseInt(req.params.id); // converts id to an int for db query

    // validates that id is a positive integer
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'Invalid task ID. ID must be a positive integer.' });
    }

    const { title, course, due_date, priority, status } = req.body; // gets updated task info from request body

    // validates all req fields are present
    if (!title || !course || !due_date || !priority || !status) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // validates status matches a valid option
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: `Status is Invalid - It must be one of: ${validStatuses.join(', ')}` });
    }

    // attempts to update task in db and returns success message if it works
    try {
        const taskExists = await getTaskById(id);
        if (!taskExists) {
            return res.status(404).json({ error: `No task with ID ${id} found` });
        }

        await updateTask(id, title, course, due_date, priority, status);
        return res.status(200).json({ message: `Task with ID ${id} updated successfully` });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// DELETE stuff

// delete task via id
export async function deleteTaskHandler(req, res) {
    const id = parseInt(req.params.id); // converts id to an int for db query

    // validates that id is a positive integer
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'Invalid task ID. ID must be a positive integer.' });
    }

    // attempts to delete task with matching id from db and returns success message if it works
    try {
        const taskExists = await getTaskById(id);
        if (!taskExists) {
            return res.status(404).json({ error: `No task with ID ${id} found` });
        }

        await deleteTask(id);
        return res.status(200).json({ message: `Task with ID ${id} deleted successfully` });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// delete all tasks
export async function deleteAllTasksHandler(req, res) {
    // attempts to delete all tasks from the db and returns success message if it works
    try {
        await deleteAllTasks();
        return res.status(200).json({ message: 'All tasks deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}