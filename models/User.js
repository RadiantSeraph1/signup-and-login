// models/User.js
const mysql = require('mysql2');
const util = require('util');

// Create the database connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Promisify the connection for async/await
connection.query = util.promisify(connection.query).bind(connection);

const User = {
    create: async (username, email, password_hash) => {
        const sql = 'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)';
        return await connection.query(sql, [username, email, password_hash]);
    },

    findByUsername: async (username) => {
        const sql = 'SELECT * FROM users WHERE username = ?';
        const results = await connection.query(sql, [username]);
        return results[0]; // Return the first result
    }
};

module.exports = User;
