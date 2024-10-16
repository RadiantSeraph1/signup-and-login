// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const multer = require('multer'); // Multer for file uploads
const path = require('path');
const session = require('express-session'); // Session handling
const app = express();
const port = process.env.PORT || 3000;

// Load environment variables from .env file
dotenv.config();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads')); // Serve the uploads folder

// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET || 'fallbackSecret',
    resave: false,
    saveUninitialized: true
}));

// Create a MySQL connection using environment variables
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.log('Error connecting to the database:', err);
    } else {
        console.log('Database connected');
    }
});

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
    }
});
const upload = multer({ storage });

// User sign up
app.post('/api/signup', upload.single('profile_image'), async (req, res) => {
    const { username, email, password, dateOfBirth, location } = req.body;
    const profileImage = req.file ? req.file.filename : null;

    // Rest of the signup logic remains the same...

    // Check if email already exists
    const emailCheckQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(emailCheckQuery, [email], async (err, results) => {
        if (err) {
            return res.status(500).send('Error checking email');
        }
        if (results.length > 0) {
            return res.status(400).send('Email already registered');
        }

        // Hash the password and insert user details into the database
        const password_hash = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (username, email, password_hash, date_of_birth, location, profile_image) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(query, [username, email, password_hash, dateOfBirth, location, profileImage], (err) => {
            if (err) {
                console.error('Error signing up:', err.message);
                return res.status(500).send('Error signing up');
            }
            res.redirect('/index.html');
        });
    });
});

// User sign in
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';

    db.query(query, [email], async (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send('Error querying database');
        }
        if (results.length === 0) {
            return res.status(401).send('Invalid email or password');
        }
        
        const user = results[0];
        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) {
            return res.status(401).send('Invalid email or password');
        }

        // Store user details in session
        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email,
            dateOfBirth: user.date_of_birth,
            location: user.location,
            profileImage: user.profile_image
        };

        res.redirect('/userdet.html');
    });
});

// Get user details from session and send to the front-end
app.get('/api/userdetails', (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Not logged in');
    }
    res.json(req.session.user); // Send the user details from the session
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
