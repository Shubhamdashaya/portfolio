const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// PostgreSQL connection
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'shubhamportfolio',
    password: process.env.DB_PASSWORD || 'Root',
    port: process.env.DB_PORT || 5432,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test database connection
pool.connect((err, client, release) => {
    if (err) {
        console.error('Error connecting to database:', err.stack);
    } else {
        console.log('Connected to PostgreSQL database: shubhamportfolio');
        release();
    }
});

// Create table if not exists
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

pool.query(createTableQuery)
    .then(() => console.log('Table "contact_messages" is ready'))
    .catch(err => console.error('Error creating table:', err));

// API endpoint to save contact form data
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
        return res.status(400).json({ 
            success: false, 
            message: 'All fields are required' 
        });
    }

    try {
        const query = `
            INSERT INTO contact_messages (name, email, message) 
            VALUES ($1, $2, $3) 
            RETURNING *
        `;
        const values = [name, email, message];
        
        const result = await pool.query(query, values);
        
        res.status(201).json({ 
            success: true, 
            message: 'Message saved successfully!',
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error saving message to database' 
        });
    }
});

// API endpoint to get all messages
app.get('/api/messages', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM contact_messages ORDER BY created_at DESC'
        );
        res.json({ 
            success: true, 
            data: result.rows 
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching messages' 
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
