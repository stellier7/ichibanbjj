# Ichiban Jiu Jitsu Gym Website

A complete, production-ready website for Ichiban Jiu Jitsu gym in Tegucigalpa, Honduras. Built with Next.js 14+, TypeScript, Tailwind CSS, and integrated with BAC Credomatic payment processing.

## Features

- 🎨 **Beautiful Hero Carousel** - Dynamic image carousel with auto-rotation
- 🔐 **Authentication System** - Email/password authentication with NextAuth.js
- 🛍️ **E-commerce Store** - Full product catalog with shopping cart
- 💳 **Payment Processing** - BAC Credomatic integration for payments
- 📚 **Video Courses** - YouTube-integrated learning platform with progress tracking
- 📅 **Class Booking** - Book classes with free first class tracking
- 💰 **Subscriptions** - Academy and Courses subscription plans
- 👨‍💼 **Admin Panel** - Role-based admin panel for content management

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Payment**: BAC Credomatic
- **Email**: Resend
- **Video**: YouTube API
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database
- Accounts for:
  - BAC Credomatic (payment processing)
  - Resend (email service)
  - YouTube API (for video courses)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ichiban
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in all the required environment variables in `.env`

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. **Add hero carousel images**
   - Create the folder: `public/images/ichiban-daily/`
   - Add your daily Ichiban pictures to this folder
   - Supported formats: JPG, JPEG, PNG, WebP
   - The carousel will automatically detect and display all images

6. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

See `.env.example` for all required environment variables. Key variables:

- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `NEXTAUTH_URL` - Your app URL (http://localhost:3000 for dev)
- `BAC_API_KEY`, `BAC_API_SECRET`, `BAC_MERCHANT_ID` - BAC Credomatic credentials
- `RESEND_API_KEY` - Resend email service API key
- `YOUTUBE_API_KEY` - YouTube Data API v3 key

## BAC Credomatic Setup

1. Register for a BAC Credomatic merchant account
2. Obtain API credentials from your BAC dashboard
3. Configure webhook URL in BAC dashboard: `https://yourdomain.com/api/payments/webhook`
4. Test in sandbox environment first
5. Add credentials to `.env` file

## Resend Email Setup

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain (optional but recommended)
3. Get API key from dashboard
4. Add `RESEND_API_KEY` to `.env`
5. Set `EMAIL_FROM` to your verified email/domain

## YouTube API Setup

1. Create a Google Cloud Project
2. Enable YouTube Data API v3
3. Create API credentials (API Key)
4. Add `YOUTUBE_API_KEY` to `.env`
5. Store video IDs in database (not full URLs)

## Database Schema

The database includes the following main models:

- **Users** - User accounts with authentication
- **Products** - Store products
- **Orders** - Customer orders
- **Subscriptions** - User subscriptions
- **Courses** - Video courses
- **Lessons** - Course lessons (videos)
- **ClassBookings** - Class reservations
- **CarouselImages** - Hero carousel images

See `prisma/schema.prisma` for complete schema.

## Project Structure

```
ichiban/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (main)/            # Main application pages
│   └── api/               # API routes
├── components/            # React components
│   ├── hero/             # Hero carousel
│   ├── store/            # Store components
│   ├── learn/            # Course components
│   └── ui/               # Reusable UI components
├── lib/                  # Utility functions
├── hooks/                # Custom React hooks
├── types/                # TypeScript types
├── prisma/               # Database schema
└── public/               # Static files
    └── images/           # Image assets
```

## Features in Detail

### Hero Carousel
- Images stored in `public/images/ichiban-daily/`
- Auto-rotates every 5 seconds
- Displays 3-5 images simultaneously (responsive)
- Smooth transitions and navigation controls

### Store
- Product catalog with categories
- Shopping cart with persistent storage
- Product detail pages
- Size selection and quantity management

### Authentication
- Email/password registration and login
- Email verification via Resend
- Password reset functionality
- Protected routes

### Class Booking
- Free first class for new users
- Paid classes (200 Lps per class)
- Class schedule display
- Booking confirmation emails

### Video Courses
- Course categories
- YouTube video integration
- Progress tracking per user
- Lesson completion tracking
- Subscription-based access

### Subscriptions
- **Academy Subscription**: 1,200 Lps/month + 500 Lps annual matricula
- **Courses Subscription**: $5 USD/month
- Recurring payment support

### Admin Panel
- Role-based access (Super Admin, Admin)
- Product management (CRUD)
- Course management (CRUD)
- Image carousel management
- Order management
- User management

## Deployment

### Vercel Deployment

1. Push code to GitHub
2. Connect repository to Vercel
3. Add all environment variables in Vercel dashboard
4. Deploy

### Database Migration

For production:
```bash
npx prisma migrate deploy
```

## Development

### Run Prisma Studio
```bash
npx prisma studio
```

### Generate Prisma Client
```bash
npx prisma generate
```

### Create Migration
```bash
npx prisma migrate dev --name migration-name
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is proprietary software for Ichiban Jiu Jitsu gym.

## Support

For issues or questions, please contact the development team.

---

**Built with ❤️ for Ichiban Jiu Jitsu**
