# Render.com Setup Guide - Step by Step

## Step 1: PostgreSQL Database Setup

1. **Render Dashboard pe jao:** https://dashboard.render.com
2. **New PostgreSQL Database banao:**
   - Click "New +" button
   - Select "PostgreSQL"
   - Name: `shubhamportfolio`
   - Database: `shubhamportfolio`
   - User: `shubhamportfolio` (automatic)
   - Region: Choose closest to you
   - Plan: **Free**
   - Click "Create Database"

3. **Database ready hone ka wait karo** (2-3 minutes)

4. **Connection Details copy karo:**
   - Dashboard mein database click karo
   - "Connections" section mein:
     - **Internal Database URL** (for Render services)
     - **External Database URL** (for local testing)

## Step 2: Web Service Setup

1. **New Web Service banao:**
   - Click "New +" button
   - Select "Web Service"
   - Connect your GitHub repository

2. **Configure karo:**
   - **Name:** `shubham-portfolio`
   - **Region:** Same as database
   - **Branch:** `main`
   - **Root Directory:** (leave blank)
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free

3. **Environment Variables add karo:**
   Click "Advanced" > "Add Environment Variable"
   
   ```
   Key: DATABASE_URL
   Value: <Internal Database URL from Step 1>
   
   Key: NODE_ENV
   Value: production
   ```

4. **Create Web Service** button click karo

## Step 3: Database Table Create karo

1. **Render Dashboard mein PostgreSQL database open karo**
2. **"Connect" tab pe jao**
3. **"PSQL Command" copy karo** (looks like):
   ```
   PGPASSWORD=xxx psql -h xxx.oregon-postgres.render.com -U shubhamportfolio shubhamportfolio
   ```

4. **Local terminal mein run karo** (agar psql installed hai)
   
   Ya phir Render ke web console use karo:
   - Database dashboard mein "Shell" tab
   - Ya "Connect" > "External Connection" use karo

5. **Table create karo:**
   ```sql
   CREATE TABLE IF NOT EXISTS contact_messages (
       id SERIAL PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL,
       message TEXT NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

## Step 4: Deploy & Test

1. **Automatic deploy hoga** (5-10 minutes)
2. **Live URL milega:** `https://shubham-portfolio.onrender.com`
3. **Test karo:**
   - Website open karo
   - Contact form fill karo
   - Message submit karo

## Troubleshooting

### Error: "password authentication failed"
- DATABASE_URL environment variable check karo
- Internal Database URL use karo (not External)

### Error: "relation does not exist"
- Table create nahi hua
- Step 3 repeat karo

### Error: "connect ECONNREFUSED"
- DATABASE_URL galat hai
- Environment variables check karo

### Website slow hai
- Free tier cold start hota hai (30-60 seconds)
- First request slow hogi, phir fast

## Important Notes

1. **Free tier limitations:**
   - Service sleeps after 15 mins inactivity
   - 750 hours/month free
   - Database: 1GB storage, 97 connection limit

2. **DATABASE_URL format:**
   ```
   postgres://user:password@host:port/database
   ```

3. **Automatic table creation:**
   Server.js mein already code hai jo table automatically create karega
   Bas DATABASE_URL sahi hona chahiye

## Quick Commands

### Check if table exists:
```sql
\dt
```

### View table structure:
```sql
\d contact_messages
```

### View all messages:
```sql
SELECT * FROM contact_messages ORDER BY created_at DESC;
```

### Delete all messages:
```sql
DELETE FROM contact_messages;
```

## Need Help?

Agar koi problem aa rahi hai to:
1. Render logs check karo (Dashboard > Service > Logs)
2. Database connection test karo
3. Environment variables verify karo
