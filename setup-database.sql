-- PostgreSQL Database Setup Script
-- Database name: shubhamportfolio

-- Create database (run this first in PostgreSQL)
CREATE DATABASE shubhamportfolio;

-- Connect to the database
\c shubhamportfolio;

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster queries
CREATE INDEX idx_email ON contact_messages(email);

-- Create index on created_at for sorting
CREATE INDEX idx_created_at ON contact_messages(created_at DESC);

-- Display table structure
\d contact_messages;

-- Sample query to view all messages
-- SELECT * FROM contact_messages ORDER BY created_at DESC;
