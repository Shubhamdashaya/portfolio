# Shubham Dashaya - Portfolio Website

Portfolio website with PostgreSQL database integration for contact form.

## Features
- Modern green-black theme
- Contact form with PostgreSQL storage
- Responsive design
- REST API backend

## Setup Instructions

### 1. Install PostgreSQL
Make sure PostgreSQL is installed on your system.

### 2. Create Database
```bash
# Login to PostgreSQL
psql -U postgres

# Run the setup script
\i setup-database.sql
```

Or manually:
```sql
CREATE DATABASE shubhamportfolio;
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Database
Edit `server.js` and update PostgreSQL credentials:
```javascript
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'shubhamportfolio',
    password: 'your_password',  // Change this
    port: 5432,
});
```

### 5. Run Server
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

### 6. Open Website
Open browser and go to: `http://localhost:3000`

## API Endpoints

### Save Contact Message
```
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello!"
}
```

### Get All Messages
```
GET /api/messages
```

## Database Schema

### contact_messages table
- `id` - Serial Primary Key
- `name` - VARCHAR(255)
- `email` - VARCHAR(255)
- `message` - TEXT
- `created_at` - TIMESTAMP

## Technologies Used
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: PostgreSQL
