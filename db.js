const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
    host: 'localhost',    // replace with your actual host
    user: 'username',         // replace with your actual username
    password: 'password',   // replace with your actual password
    database: 'signup_login',  // replace with your actual database name
});


module.exports = db;
console.log('Database connection details:', process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_NAME);
