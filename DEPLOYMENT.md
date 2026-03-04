# Portfolio Deployment Guide

## Option 1: Render.com (Recommended - Free)

### Steps:

1. **GitHub Repository banao:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```

2. **Render.com pe jao:**
   - https://render.com pe signup karo
   - "New +" button click karo
   - "Web Service" select karo

3. **Repository connect karo:**
   - GitHub repository select karo
   - Name: `shubham-portfolio`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **PostgreSQL Database add karo:**
   - Dashboard pe "New +" click karo
   - "PostgreSQL" select karo
   - Name: `shubhamportfolio`
   - Free plan select karo
   - Create karo

5. **Environment Variables set karo:**
   Web Service mein "Environment" tab pe jao:
   ```
   DB_USER=<from_render_postgres>
   DB_HOST=<from_render_postgres>
   DB_NAME=<from_render_postgres>
   DB_PASSWORD=<from_render_postgres>
   DB_PORT=5432
   NODE_ENV=production
   ```

6. **Deploy karo:**
   - "Manual Deploy" ya automatic deploy hoga
   - Live URL milega: `https://shubham-portfolio.onrender.com`

---

## Option 2: Railway.app (Free)

### Steps:

1. **Railway.app pe jao:**
   - https://railway.app pe signup karo
   - "New Project" click karo

2. **Deploy from GitHub:**
   - GitHub repository connect karo
   - Automatic detect karega Node.js

3. **PostgreSQL add karo:**
   - "New" button click karo
   - "Database" > "PostgreSQL" select karo

4. **Environment Variables:**
   - Automatic set ho jayenge
   - Ya manually add karo

5. **Domain:**
   - Settings mein custom domain add kar sakte ho
   - Ya Railway ka domain use karo

---

## Option 3: Vercel (Frontend) + Supabase (Database)

### Frontend (Vercel):

1. **Vercel pe jao:**
   - https://vercel.com pe signup karo
   - "New Project" click karo
   - GitHub repository import karo

2. **Build Settings:**
   - Framework Preset: Other
   - Build Command: `npm install`
   - Output Directory: `.`

### Database (Supabase):

1. **Supabase pe jao:**
   - https://supabase.com pe signup karo
   - New project banao

2. **Database setup:**
   - SQL Editor mein `setup-database.sql` run karo

3. **Connection String:**
   - Settings > Database > Connection String copy karo
   - Vercel Environment Variables mein add karo

---

## Option 4: Heroku (Paid but Popular)

### Steps:

1. **Heroku CLI install karo:**
   ```bash
   # Download from: https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login karo:**
   ```bash
   heroku login
   ```

3. **App create karo:**
   ```bash
   heroku create shubham-portfolio
   ```

4. **PostgreSQL add karo:**
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

5. **Deploy karo:**
   ```bash
   git push heroku main
   ```

6. **Open karo:**
   ```bash
   heroku open
   ```

---

## Quick Start Commands

### Git Setup:
```bash
git init
git add .
git commit -m "Portfolio website with PostgreSQL"
git branch -M main
```

### Create GitHub Repository:
1. GitHub pe jao: https://github.com/new
2. Repository name: `portfolio`
3. Public select karo
4. Create repository

### Push to GitHub:
```bash
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

---

## Recommended: Render.com

**Pros:**
- ✅ Completely FREE
- ✅ PostgreSQL included
- ✅ Easy setup
- ✅ Auto-deploy from GitHub
- ✅ SSL certificate free
- ✅ Custom domain support

**Cons:**
- ⚠️ Free tier sleeps after 15 mins inactivity
- ⚠️ Cold start takes 30-60 seconds

---

## After Deployment:

1. **Test contact form**
2. **Check database connection**
3. **Update social links**
4. **Add your profile photo**
5. **Share your portfolio URL!**

---

## Need Help?

- Render Docs: https://render.com/docs
- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
