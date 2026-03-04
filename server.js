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

// PostgreSQL connection - Render automatically provides DATABASE_URL
// If DATABASE_URL has incomplete hostname, construct from individual parts
let connectionConfig;

if (process.env.DATABASE_URL) {
    connectionConfig = {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    };
} else {
    // Fallback to individual environment variables
    connectionConfig = {
        user: 'portfolio_user',
        host: 'dpg-d6k6c5h5pdvs73dt467g-a.singapore-postgres.render.com',
        database: 'portfolio_07k0',
        password: 'M7otsMvwitC5DaBfQGUeWrzsVTSX4ru8',
        port: 5432,
        ssl: {
            rejectUnauthorized: false
        }
    };
}

const pool = new Pool(connectionConfig);

// Initialize database
async function initializeDatabase() {
    try {
        // Test connection
        const client = await pool.connect();
        console.log('✅ Connected to PostgreSQL database');
        
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
        
        await client.query(createTableQuery);
        console.log('✅ Table "contact_messages" is ready');
        
        client.release();
    } catch (err) {
        console.error('❌ Database initialization error:', err);
        console.error('Connection string:', process.env.DATABASE_URL ? 'Set' : 'Not set');
    }
}

// Initialize on startup
initializeDatabase();

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

    let client;
    try {
        client = await pool.connect();
        
        const query = `
            INSERT INTO contact_messages (name, email, message) 
            VALUES ($1, $2, $3) 
            RETURNING *
        `;
        const values = [name, email, message];
        
        const result = await client.query(query, values);
        
        res.status(201).json({ 
            success: true, 
            message: 'Message saved successfully!',
            data: result.rows[0]
        });
    } catch (error) {
        console.error('❌ Error saving message:', error.message);
        console.error('Error details:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error saving message to database',
            error: process.env.NODE_ENV === 'production' ? 'Database error' : error.message
        });
    } finally {
        if (client) client.release();
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
