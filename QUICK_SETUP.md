# Quick Setup Guide - Steps 2 & 4

## Step 2: Database Setup

You have 3 options for setting up PostgreSQL:

### Option 1: Supabase (Easiest - Recommended) ⭐

1. Go to https://supabase.com and sign up (free)
2. Click "New Project"
3. Fill in:
   - Project name: `ichiban`
   - Database password: (choose a strong password)
   - Region: Choose closest to you
4. Wait for project to be created (~2 minutes)
5. Go to **Settings** → **Database**
6. Find "Connection string" section
7. Copy the **URI** connection string (it looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres`)
8. Paste it into your `.env` file as `DATABASE_URL`

**Done!** Skip to Step 3 below.

---

### Option 2: Install PostgreSQL Locally

#### macOS:
```bash
# Using Homebrew
brew install postgresql@14
brew services start postgresql@14

# Create database
createdb ichiban
```

#### Linux (Ubuntu/Debian):
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql

# Create database
sudo -u postgres createdb ichiban
```

#### Windows:
1. Download from https://www.postgresql.org/download/windows/
2. Install with default settings
3. Open pgAdmin or use command line:
```bash
createdb ichiban
```

Then update `.env`:
```
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/ichiban?schema=public"
```

---

### Option 3: Other Cloud Providers

- **Railway**: https://railway.app (free tier available)
- **Neon**: https://neon.tech (free tier available)
- **Render**: https://render.com (free tier available)

Just create a PostgreSQL database and copy the connection string to your `.env`.

---

## Step 4: Configure Environment Variables

### 1. Create .env file

If you don't have a `.env` file yet, create it:

```bash
cp env.example .env
```

### 2. Open `.env` in your editor

### 3. Update these REQUIRED values:

```env
# Database - Replace with your connection string from Step 2
DATABASE_URL="postgresql://username:password@host:5432/ichiban?schema=public"

# NextAuth - Already generated for you, but you can regenerate if needed
NEXTAUTH_SECRET="T8gB6jKGm9up7KKbCecR9whdpkPjRnE+4COpSWJRzbk="

# These are already set correctly for local development
NEXTAUTH_URL="http://localhost:3000"
APP_URL="http://localhost:3000"
```

### 4. Optional values (can add later):

- `RESEND_API_KEY` - For email (sign up at resend.com)
- `BAC_API_KEY`, etc. - For payments (add when ready)
- `YOUTUBE_API_KEY` - For video courses (add when ready)

---

## Step 3: Run Database Migrations

Once your `.env` is configured with the correct `DATABASE_URL`:

```bash
# Generate Prisma Client
npx prisma generate

# Create database tables
npx prisma migrate dev --name init
```

This will:
- Create all the database tables
- Set up the schema
- Generate the Prisma Client

If you see any errors:
- **"Can't reach database server"** → Check your DATABASE_URL
- **"database does not exist"** → Create the database first
- **"password authentication failed"** → Check your password in DATABASE_URL

---

## Verify Everything Works

```bash
# Start the dev server
npm run dev
```

Then open http://localhost:3000

You should see:
- ✅ Homepage with hero carousel (if you added images)
- ✅ Navigation working
- ✅ Can navigate to different pages

Test registration:
- Go to http://localhost:3000/register
- Create a test account
- Try logging in

---

## Quick Checklist

- [ ] Chose database option (Supabase recommended)
- [ ] Got database connection string
- [ ] Created `.env` file
- [ ] Updated `DATABASE_URL` in `.env`
- [ ] Updated `NEXTAUTH_SECRET` in `.env` (already done)
- [ ] Ran `npx prisma generate`
- [ ] Ran `npx prisma migrate dev --name init`
- [ ] Started dev server: `npm run dev`
- [ ] Verified homepage loads

---

## Need Help?

### Database Connection Issues?

**Check your DATABASE_URL format:**
```
postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE?schema=public
```

**Common mistakes:**
- Missing password
- Wrong port (should be 5432 for PostgreSQL)
- Database name doesn't exist
- Special characters in password need to be URL-encoded

### Prisma Issues?

**"Prisma Client has not been generated yet"**
```bash
npx prisma generate
```

**"Migration failed"**
- Make sure database exists
- Check DATABASE_URL is correct
- Try: `npx prisma migrate reset` (WARNING: deletes data)

---

**Once you complete these steps, your website will be ready to run! 🎉**
