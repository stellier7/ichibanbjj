# Setup Guide - Ichiban Website

## Step 1: Environment Variables

### Create .env file

1. Copy the example file:
   ```bash
   cp env.example .env
   ```

2. Open `.env` and fill in the values:

#### Required for Basic Setup:

**Database URL:**
```
DATABASE_URL="postgresql://username:password@localhost:5432/ichiban?schema=public"
```
Replace:
- `username` - Your PostgreSQL username (usually `postgres` or your system username)
- `password` - Your PostgreSQL password
- `ichiban` - Database name (you can change this)

**NextAuth Secret:**
```
NEXTAUTH_SECRET="T8gB6jKGm9up7KKbCecR9whdpkPjRnE+4COpSWJRzbk="
```
(Use the generated secret or create a new one with: `openssl rand -base64 32`)

**NextAuth URL:**
```
NEXTAUTH_URL="http://localhost:3000"
```

**App URL:**
```
APP_URL="http://localhost:3000"
```

#### Optional (for now - can add later):

- `RESEND_API_KEY` - For email functionality (sign up at resend.com)
- `BAC_API_KEY`, etc. - For payment processing (add when ready)
- `YOUTUBE_API_KEY` - For video courses (add when ready)

## Step 2: Database Setup

### Option A: Using Local PostgreSQL

1. **Install PostgreSQL** (if not already installed):
   - macOS: `brew install postgresql@14` or download from postgresql.org
   - Linux: `sudo apt-get install postgresql` (Ubuntu/Debian)
   - Windows: Download from postgresql.org

2. **Start PostgreSQL:**
   ```bash
   # macOS with Homebrew
   brew services start postgresql@14
   
   # Linux
   sudo systemctl start postgresql
   ```

3. **Create the database:**
   ```bash
   # Connect to PostgreSQL
   psql postgres
   
   # Create database
   CREATE DATABASE ichiban;
   
   # Create user (optional, or use existing user)
   CREATE USER ichiban_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE ichiban TO ichiban_user;
   
   # Exit
   \q
   ```

4. **Update DATABASE_URL in .env** with your credentials

### Option B: Using Supabase (Cloud PostgreSQL - Recommended for Easy Setup)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to Project Settings > Database
4. Copy the "Connection string" (URI format)
5. Update `DATABASE_URL` in `.env` with the connection string

### Option C: Using Railway, Neon, or Other Cloud Providers

1. Sign up for a free PostgreSQL database
2. Get the connection string
3. Update `DATABASE_URL` in `.env`

## Step 3: Run Database Migrations

Once your database is set up and `.env` is configured:

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations to create tables
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view your database
npx prisma studio
```

## Step 4: Verify Setup

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser:**
   - Go to http://localhost:3000
   - You should see the hero carousel (if you added images)
   - Try navigating to different pages

3. **Test authentication:**
   - Go to http://localhost:3000/register
   - Create a test account
   - Try logging in

## Troubleshooting

### Database Connection Issues

**Error: "Can't reach database server"**
- Make sure PostgreSQL is running
- Check your DATABASE_URL in .env
- Verify username, password, and database name are correct

**Error: "database does not exist"**
- Create the database first (see Step 2)
- Or update DATABASE_URL to point to an existing database

**Error: "password authentication failed"**
- Double-check your PostgreSQL password in DATABASE_URL
- Try resetting the password

### Prisma Issues

**Error: "Prisma Client has not been generated yet"**
```bash
npx prisma generate
```

**Error: "Migration failed"**
- Make sure your database is empty or use `--force-reset` (WARNING: deletes all data)
```bash
npx prisma migrate reset
npx prisma migrate dev
```

### NextAuth Issues

**Error: "NEXTAUTH_SECRET is not set"**
- Make sure `.env` file exists and has NEXTAUTH_SECRET
- Restart the dev server after adding environment variables

## Quick Start Checklist

- [ ] Created `.env` file from `env.example`
- [ ] Set `DATABASE_URL` with correct credentials
- [ ] Set `NEXTAUTH_SECRET` (generated secret)
- [ ] Set `NEXTAUTH_URL` to `http://localhost:3000`
- [ ] Set `APP_URL` to `http://localhost:3000`
- [ ] Created PostgreSQL database
- [ ] Ran `npx prisma generate`
- [ ] Ran `npx prisma migrate dev`
- [ ] Started dev server with `npm run dev`
- [ ] Verified homepage loads
- [ ] Tested registration/login

## Next Steps After Setup

1. **Add your first admin user:**
   - Register a user through the UI
   - Manually update the user's role in the database to `SUPER_ADMIN`:
     ```sql
     UPDATE users SET role = 'SUPER_ADMIN' WHERE email = 'your-email@example.com';
     ```

2. **Add products:**
   - Use the admin panel (once built) or
   - Add directly to database via Prisma Studio

3. **Configure email service:**
   - Sign up at resend.com
   - Get API key
   - Add to `.env`

4. **Add payment processing:**
   - Set up BAC Credomatic account
   - Add credentials to `.env`

---

**Need help?** Check the main README.md or PROJECT_STATUS.md for more information.
