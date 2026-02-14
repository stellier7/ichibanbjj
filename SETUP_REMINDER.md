# 🚀 Setup Reminder - Ichiban Website

## Quick Checklist

### ✅ Step 1: Environment Variables (.env file)

1. **Create `.env` file** (if you haven't already):
   ```bash
   cp env.example .env
   ```

2. **Update these REQUIRED values in `.env`:**

   ```env
   # Database Connection String
   DATABASE_URL="postgresql://username:password@host:5432/ichiban?schema=public"
   
   # NextAuth Secret (already generated)
   NEXTAUTH_SECRET="T8gB6jKGm9up7KKbCecR9whdpkPjRnE+4COpSWJRzbk="
   
   # URLs (already set correctly)
   NEXTAUTH_URL="http://localhost:3000"
   APP_URL="http://localhost:3000"
   ```

   **For DATABASE_URL, you have 3 options:**

   **Option A: Supabase (Easiest - Recommended) ⭐**
   - Go to https://supabase.com
   - Sign up and create a new project
   - Go to Settings → Database
   - Copy the "Connection string" (URI format)
   - Paste it as `DATABASE_URL` in `.env`

   **Option B: Local PostgreSQL**
   - Install PostgreSQL
   - Create database: `createdb ichiban`
   - Update: `DATABASE_URL="postgresql://postgres:your_password@localhost:5432/ichiban?schema=public"`

   **Option C: Cloud Provider**
   - Railway, Neon, or Render
   - Create PostgreSQL database
   - Copy connection string to `.env`

### ✅ Step 2: Database Setup

Once your `.env` has the correct `DATABASE_URL`:

```bash
# Generate Prisma Client
npx prisma generate

# Create all database tables
npx prisma migrate dev --name init
```

**If you see errors:**
- "Can't reach database server" → Check your DATABASE_URL
- "database does not exist" → Create the database first
- "password authentication failed" → Check your password

### ✅ Step 3: Start the Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser!

---

## Optional Setup (Can Add Later)

### Email Service (Resend)
- Sign up at https://resend.com
- Get API key
- Add to `.env`: `RESEND_API_KEY="your-key"`

### Payment Processing (BAC Credomatic)
- Set up BAC Credomatic merchant account
- Get API credentials
- Add to `.env`:
  ```
  BAC_API_KEY="..."
  BAC_API_SECRET="..."
  BAC_MERCHANT_ID="..."
  BAC_WEBHOOK_SECRET="..."
  ```

### YouTube API
- Create Google Cloud Project
- Enable YouTube Data API v3
- Get API key
- Add to `.env`: `YOUTUBE_API_KEY="your-key"`

---

## Troubleshooting

### Database Issues
```bash
# Check if database exists
psql -l

# Connect to database
psql -d ichiban

# If migration fails, reset (WARNING: deletes data)
npx prisma migrate reset
npx prisma migrate dev
```

### Environment Variables Not Loading
- Make sure `.env` is in the root directory
- Restart the dev server after changing `.env`
- Check for typos in variable names

### Images Not Showing
- Make sure images are in `public/images/ichiban-daily/`
- Check file extensions: `.jpg`, `.jpeg`, `.png`, `.webp`
- Restart dev server after adding images

---

## Current Status

✅ **Completed:**
- Project setup and dependencies
- Hero carousel (fixed black screen issue)
- Navigation (hides on homepage, shows on scroll)
- Authentication pages
- Store pages
- Shopping cart

🚧 **Still To Do:**
- Payment integration (needs BAC credentials)
- Subscription system
- Class booking
- Video courses
- Admin panel

---

## Need Help?

Check these files:
- `QUICK_SETUP.md` - Detailed setup instructions
- `SETUP_GUIDE.md` - Comprehensive guide
- `README.md` - Full project documentation
- `PROJECT_STATUS.md` - What's done and what's next

---

**Once you complete Steps 1-3, your website will be fully functional! 🎉**
