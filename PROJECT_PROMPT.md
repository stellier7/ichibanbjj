# Ichiban Jiu Jitsu Gym Website - Complete Development Prompt

## Project Context
You are a 10+ year experienced full-stack developer with expertise in modern web development, CSS, React, Next.js, and payment integrations. Build a professional, beautiful website for Ichiban Jiu Jitsu gym in Tegucigalpa, Honduras.

## Tech Stack Requirements
- **Framework**: Next.js 14+ with App Router and TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Color Scheme**: White and black primary colors (clean, minimalist design)
- **Authentication**: NextAuth.js with email/password
- **Payment**: BAC Credomatic integration (primary payment processor in Honduras)
- **Database**: Supabase (PostgreSQL) or Prisma + PostgreSQL
- **Image Storage**: Start with local folder (`public/images/ichiban-daily/`), prepare for cloud migration
- **Video Hosting**: YouTube API integration
- **State Management**: Zustand or React Context
- **Forms**: React Hook Form + Zod validation
- **Email Service**: Resend (recommended - modern, easy integration, great deliverability)
- **Deployment**: Vercel

## Core Features

### 1. Hero Section (Full Screen)
- Full viewport height hero section
- Dynamic image carousel displaying multiple Ichiban daily pictures simultaneously
- **Image Location**: Images stored in `public/images/ichiban-daily/` folder
  - **How to add pictures**: 
    1. Create folder: `public/images/ichiban-daily/`
    2. Add all daily Ichiban pictures to this folder
    3. Supported formats: JPG, JPEG, PNG, WebP
    4. Recommended: Optimize images before adding (compress for web)
    5. Naming: Any filename is fine (e.g., `ichiban-2024-01-15.jpg`)
    6. The carousel will automatically detect and display all images in this folder
- Auto-rotating carousel (5-second intervals)
- Smooth fade/scale transitions
- Multiple images visible at once (grid/overlay layout)
- Navigation controls (dots, optional arrows)
- Semi-transparent overlay with "ICHIBAN" branding
- Responsive: 3-5 images visible depending on screen size
- Lazy loading for performance

### 2. Main Landing Page
- About Ichiban section
- Class schedules (see schedule details below)
- Instructor profiles
- Location and contact information
- Social media links
- Clean, well-spaced sections with excellent typography

### 3. Class Schedule
**Jiu Jitsu Classes:**
- Monday, Wednesday, Friday
  - Morning: 7:00 AM - 9:00 AM
  - Evening: 6:00 PM - 8:00 PM

**Muay Thai Classes:**
- Tuesday, Thursday
  - Evening: 6:30 PM - 8:00 PM

Display schedule in a clear, easy-to-read format on the landing page.

### 4. Authentication System
- Email and password registration/login
- Email verification via Resend
- Password reset functionality
- Protected routes for authenticated content
- User profile management
- Session management with JWT tokens
- Free class tracking by email/name (one per user)

### 5. Payment & Subscription System (BAC Credomatic)

#### Subscription Types:
1. **Academy Subscription**
   - Monthly: 1,200 Lempiras (Lps)
   - Annual Matricula: 500 Lempiras (Lps) - one-time fee
   - Includes: Access to all classes, store discounts

2. **Courses Subscription**
   - Monthly: $5 USD
   - Includes: Access to all video courses

#### One-Time Purchases:
- **Single Class**: 200 Lempiras (after free first class)
- **Products**: Variable pricing (store items)

#### Payment Flow:
- Secure card payment processing via BAC Credomatic
- Payment intent creation
- 3D Secure support
- Webhook handling for payment confirmations
- Order/subscription confirmation emails
- Payment history for users

#### BAC Credomatic Setup Steps:
1. Register for BAC Credomatic merchant account
2. Obtain API credentials:
   - API Key
   - API Secret
   - Merchant ID
   - Webhook Secret
3. Configure webhook URL in BAC dashboard: `https://yourdomain.com/api/payments/webhook`
4. Test in sandbox environment first
5. Configure production credentials in Vercel environment variables

**Note**: Include detailed setup instructions in documentation for obtaining BAC Credomatic credentials.

### 6. Class Booking System
- **Free First Class**: Every new user gets one free class (tracked by email/name)
- **Paid Classes**: 200 Lps per class after free class
- Class schedule display with available time slots
- Date/time selection calendar
- Availability checking (prevent overbooking)
- Booking confirmation via email
- User booking history in profile
- Cancellation policy (if applicable)
- Support for both Jiu Jitsu and Muay Thai classes

### 7. Store Page (E-commerce)
- Shopify-like product presentation
- Product categories:
  - Academy Gi
  - Rashguard
  - Shorts
  - Other merchandise
- Product features:
  - High-quality product images
  - Product detail pages
  - Size selection
  - Add to cart functionality
  - Shopping cart drawer/sidebar
  - Checkout flow with BAC Credomatic payment
  - Order confirmation
  - Inventory management
- Grid/list view toggle
- Category filtering
- Price filtering
- **Shipping**: Tegucigalpa delivery (local delivery service to be integrated later)

### 8. Learn Section (Video Courses)
- Course categories:
  - Jiu Jitsu for Beginners
  - Guard Passing
  - Close Guard
  - Advanced Techniques
  - [More categories as needed]
- Course features:
  - Course listing page
  - Course detail pages with lesson list
  - YouTube video integration
  - Video player with controls
  - Progress tracking per user
  - Lesson completion tracking
  - Next lesson unlock on completion
  - Search and filter functionality
  - **Initial Content**: Mock courses with multiple videos per course
- Access control:
  - Some courses may be free
  - Most courses require Courses Subscription ($5/month)
  - Progress saved per user account

#### YouTube API Setup Steps:
1. Create Google Cloud Project
2. Enable YouTube Data API v3
3. Create API credentials (API Key)
4. Configure API key in environment variables
5. For video embedding, use YouTube iframe API
6. Store video IDs in database (not full URLs)
7. Format: `https://www.youtube.com/embed/{videoId}`

**Note**: Include detailed YouTube API setup instructions in documentation.

### 9. Admin Panel
- Protected admin routes with role-based access
- **Admin Roles**:
  - **Super Admin**: Full access to everything
  - **Admin**: Limited access (manage products, courses, view orders)
- Content management:
  - Product management (CRUD)
  - Course management (CRUD)
  - Lesson management (add multiple videos to courses)
  - Image carousel management (upload, reorder, delete)
- Order management:
  - View all orders
  - Update order status
  - Process refunds
- Subscription management:
  - View active subscriptions
  - Manage cancellations
- User management:
  - View users
  - Manage user access
  - Assign admin roles

## Design Requirements
- **Color Scheme**: White and black primary colors
- Modern, clean, professional aesthetic
- Mobile-first responsive design
- Smooth animations and transitions
- Fast loading times (< 3s initial load)
- Excellent typography and spacing
- Accessible (WCAG 2.1 AA compliance)
- Dark mode support (optional, but consider)

## Technical Requirements

### Performance
- Lighthouse score > 90
- Core Web Vitals: All green
- Image optimization (WebP, lazy loading, Next.js Image component)
- Code splitting and lazy loading routes
- API response caching where appropriate

### Security
- HTTPS only
- Secure authentication (JWT with httpOnly cookies)
- Payment data never stored (PCI compliance)
- Input validation and sanitization (Zod)
- CSRF protection
- Rate limiting on API routes
- Secure file upload validation
- Role-based access control for admin panel

### SEO
- Proper meta tags
- Open Graph tags
- Structured data
- Sitemap generation
- robots.txt

## Database Schema
See `pseudocode.md` for complete schema including:
- Users (with admin roles)
- Products
- Orders
- Order Items
- Subscriptions
- Courses
- Lessons (multiple videos per course)
- User Progress
- Class Bookings
- Carousel Images

## API Routes
See `pseudocode.md` for complete API specification including:
- Authentication routes
- Payment routes (BAC Credomatic)
- Product routes
- Course routes
- Class booking routes
- Subscription routes
- Image management routes
- Admin routes

## Environment Variables Needed
```env
# Database
DATABASE_URL=

# NextAuth
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# BAC Credomatic
BAC_API_KEY=
BAC_API_SECRET=
BAC_MERCHANT_ID=
BAC_WEBHOOK_SECRET=

# YouTube API
YOUTUBE_API_KEY=

# Resend Email Service
RESEND_API_KEY=
EMAIL_FROM=noreply@ichiban.com

# App
APP_URL=http://localhost:3000

# File Upload
MAX_FILE_SIZE=5242880  # 5MB
ALLOWED_IMAGE_TYPES=jpg,jpeg,png,webp
```

## Email Service: Resend
**Why Resend?**
- Modern, developer-friendly API
- Excellent deliverability
- Easy integration with Next.js
- Free tier: 3,000 emails/month
- Great documentation
- Built for transactional emails

**Setup Steps:**
1. Sign up at resend.com
2. Verify domain (optional but recommended)
3. Get API key from dashboard
4. Add to environment variables
5. Use Resend SDK in API routes

## Deliverables
1. Fully functional website with all features
2. Responsive design (mobile, tablet, desktop)
3. Admin panel with role-based access (Super Admin, Admin)
4. Complete documentation including:
   - Setup instructions
   - BAC Credomatic integration guide
   - YouTube API setup guide
   - Resend email setup guide
   - Environment variable configuration
   - Deployment guide for Vercel
5. Mock data for courses and videos
6. Testing instructions

## Development Phases (Suggested)
1. **Phase 1**: Project setup, authentication, hero carousel, landing page with schedule
2. **Phase 2**: Store functionality, product management, shopping cart
3. **Phase 3**: Payment integration (BAC Credomatic), checkout flow
4. **Phase 4**: Subscription system, class booking system
5. **Phase 5**: Video courses (Learn section) with mock content
6. **Phase 6**: Admin panel with role-based access
7. **Phase 7**: Polish, optimization, testing, documentation

## Initial Mock Data

### Courses (Mock)
1. **Jiu Jitsu for Beginners**
   - Lesson 1: Introduction to Jiu Jitsu (mock video)
   - Lesson 2: Basic Positions (mock video)
   - Lesson 3: Fundamental Movements (mock video)
   - Lesson 4: First Techniques (mock video)

2. **Guard Passing**
   - Lesson 1: Understanding the Guard (mock video)
   - Lesson 2: Basic Pass Concepts (mock video)
   - Lesson 3: Knee Cut Pass (mock video)
   - Lesson 4: Torreando Pass (mock video)

3. **Close Guard**
   - Lesson 1: Close Guard Fundamentals (mock video)
   - Lesson 2: Breaking Posture (mock video)
   - Lesson 3: Sweeps from Close Guard (mock video)
   - Lesson 4: Submissions from Close Guard (mock video)

**Note**: Use placeholder YouTube video IDs or create mock video components for development.

## Image Management

### Hero Carousel Images
**Location**: `public/images/ichiban-daily/`

**Instructions to Add Pictures:**
1. Navigate to the project root directory
2. Create the folder structure: `public/images/ichiban-daily/`
3. Add all your daily Ichiban pictures to this folder
4. Supported image formats: `.jpg`, `.jpeg`, `.png`, `.webp`
5. Image naming: Any filename works (e.g., `ichiban-2024-01-15.jpg`, `daily-photo-1.jpg`)
6. The carousel component will automatically scan this folder and display all images
7. For best performance: Optimize images before adding (recommended max 2MB per image)
8. Admin panel will allow uploading new images directly to this folder

**Example folder structure:**
```
ichiban/
└── public/
    └── images/
        └── ichiban-daily/
            ├── ichiban-2024-01-15.jpg
            ├── ichiban-2024-01-16.jpg
            ├── daily-photo-1.jpg
            └── ... (all your daily pictures)
```

### Product Images
**Location**: `public/images/products/`

**Instructions:**
- Store product images here
- Organize by product: `public/images/products/gi-1.jpg`, `public/images/products/rashguard-1.jpg`, etc.
- Admin panel will handle product image uploads

### Course Thumbnails
**Location**: `public/images/courses/`

**Instructions:**
- Store course thumbnail images here
- Admin panel will handle course thumbnail uploads

## Notes
- Start with images in local folder, but structure code to easily migrate to cloud storage later
- YouTube integration for videos initially, but structure to support other platforms
- BAC Credomatic is the primary payment processor - ensure robust integration with proper error handling
- Consider Honduran market specifics (Lempiras currency, local payment methods, Tegucigalpa delivery)
- All prices should clearly display currency (Lps or USD)
- Free class is tracked by email/name combination (one per user)
- Admin panel should be intuitive and easy to use for non-technical users
- Include comprehensive error handling and user feedback throughout

## Success Criteria
- Beautiful, professional design that represents Ichiban brand
- Smooth user experience across all features
- Secure payment processing
- Reliable authentication and authorization
- Easy content management for admins
- Fast page loads and excellent performance
- Mobile-responsive on all devices
- Clear documentation for setup and maintenance
