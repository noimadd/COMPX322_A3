import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

// create task
export async function createTask(title, course, due_date, priority, status) {
    const [result] = await pool.execute(
        'INSERT INTO tasks (title, course, due_date, priority, status) VALUES (?, ?, ?, ?, ?)',
        [title, course, due_date, priority, status]
    );
    return result;
}

// get all tasks
export async function getAllTasks() {
    const [rows] = await pool.execute(
        'SELECT * FROM tasks'
    );
    return rows;
}

// get task by id
export async function getTaskById(id) {
    const [rows] = await pool.execute(
        'SELECT * FROM tasks WHERE id = ?', 
        [id]
    );
    return rows[0];
}

// get tasks by status
export async function getTasksByStatus(status) {
    const [rows] = await pool.execute(
        'SELECT * FROM tasks WHERE status = ?', 
        [status]
    );
    return rows;
}

// get tasks by title
export async function getTasksByTitle(title) {
    const [rows] = await pool.execute(
        'SELECT * FROM tasks WHERE title LIKE ?', 
        [`%${title}%`]
    );
    return rows;
}

// update task via id
export async function updateTask(id, title, course, due_date, priority, status) {
    const [result] = await pool.execute(
        'UPDATE tasks SET title = ?, course = ?, due_date = ?, priority = ?, status = ? WHERE id = ?',
        [title, course, due_date, priority, status, id]
    );
    return result;
}

// delete task via id
export async function deleteTask(id) {
    const [result] = await pool.execute(
        'DELETE FROM tasks WHERE id = ?',
        [id]
    );
    return result;
}

// delete all tasks
export async function deleteAllTasks() {
    const [result] = await pool.execute(
        'DELETE FROM tasks'
    );
    return result;
}