# 🥋 ICHIBAN JIU JITSU GYM - ULTIMATE BUILD PROMPT

## 🎯 MISSION
Build a complete, production-ready website for Ichiban Jiu Jitsu gym in Tegucigalpa, Honduras. This is a full-stack application with authentication, payments, e-commerce, video courses, and class booking.

---

## 📋 PROJECT SETUP

### Step 1: Initialize Next.js Project
```bash
npx create-next-app@latest ichiban --typescript --tailwind --app --no-src-dir
cd ichiban
```

### Step 2: Install Core Dependencies
```bash
# Authentication
npm install next-auth @auth/prisma-adapter

# Database (choose one)
npm install @prisma/client prisma
# OR
npm install @supabase/supabase-js

# Forms & Validation
npm install react-hook-form zod @hookform/resolvers

# State Management
npm install zustand

# UI Components
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select
npm install lucide-react clsx tailwind-merge

# Payment (BAC Credomatic - use their SDK when available)
npm install axios

# Email
npm install resend

# YouTube
npm install react-youtube

# File Upload
npm install formidable @types/formidable

# Utilities
npm install date-fns bcryptjs jsonwebtoken
npm install -D @types/bcryptjs @types/jsonwebtoken
```

### Step 3: Create Folder Structure
```
ichiban/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── (main)/
│   │   ├── page.tsx
│   │   ├── about/
│   │   ├── store/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   ├── learn/
│   │   │   ├── page.tsx
│   │   │   └── [courseId]/
│   │   ├── classes/
│   │   │   ├── page.tsx
│   │   │   └── book/
│   │   └── admin/
│   │       ├── products/
│   │       ├── courses/
│   │       └── images/
│   ├── api/
│   │   ├── auth/
│   │   ├── payments/
│   │   ├── products/
│   │   ├── courses/
│   │   ├── classes/
│   │   ├── subscriptions/
│   │   └── images/
│   └── layout.tsx
├── components/
│   ├── hero/
│   ├── store/
│   ├── learn/
│   ├── classes/
│   ├── payments/
│   └── ui/
├── lib/
├── types/
├── hooks/
├── public/
│   └── images/
│       ├── ichiban-daily/    # ⬅️ ADD DAILY PICTURES HERE
│       ├── products/
│       └── courses/
└── prisma/ (if using Prisma)
```

---

## 🎨 DESIGN SYSTEM

### Color Palette (White & Black)
```typescript
// tailwind.config.ts
colors: {
  primary: {
    black: '#000000',
    white: '#FFFFFF',
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    }
  }
}
```

### Typography
- Headings: Bold, clean sans-serif
- Body: Readable, professional
- Use system fonts for performance

---

## 🏗️ IMPLEMENTATION CHECKLIST

### ✅ PHASE 1: Foundation & Hero

#### 1.1 Setup Database Schema
- [ ] Create Prisma schema or Supabase tables
- [ ] Define all models: User, Product, Order, Subscription, Course, Lesson, ClassBooking, CarouselImage
- [ ] Add admin roles (super_admin, admin)
- [ ] Run migrations

#### 1.2 Hero Carousel Component
**File**: `components/hero/ImageCarousel.tsx`

**Requirements:**
- [ ] Scan `public/images/ichiban-daily/` folder for images
- [ ] Display 3-5 images simultaneously (grid/overlay layout)
- [ ] Auto-rotate every 5 seconds
- [ ] Smooth fade/scale transitions
- [ ] Navigation dots
- [ ] Full viewport height
- [ ] Semi-transparent overlay with "ICHIBAN" text
- [ ] Responsive (mobile: 1-2 images, tablet: 2-3, desktop: 3-5)
- [ ] Lazy loading

**Implementation:**
```typescript
// Pseudo-code structure
- Use Next.js Image component
- Read images from public folder via API route
- State: currentIndex, images array
- useEffect for auto-rotation
- Intersection Observer for lazy loading
```

#### 1.3 Landing Page
**File**: `app/(main)/page.tsx`

**Sections:**
- [ ] Hero carousel (full screen)
- [ ] About Ichiban section
- [ ] Class schedule (see schedule below)
- [ ] Instructor profiles
- [ ] Location & contact
- [ ] Social media links

**Class Schedule Display:**
```
JIU JITSU
Monday, Wednesday, Friday
  7:00 AM - 9:00 AM
  6:00 PM - 8:00 PM

MUAY THAI
Tuesday, Thursday
  6:30 PM - 8:00 PM
```

#### 1.4 Image API Route
**File**: `app/api/images/route.ts`

- [ ] Scan `public/images/ichiban-daily/` folder
- [ ] Return array of image URLs
- [ ] Support filtering and sorting

---

### ✅ PHASE 2: Authentication

#### 2.1 NextAuth Setup
**File**: `app/api/auth/[...nextauth]/route.ts`

- [ ] Configure NextAuth with email/password
- [ ] Database adapter (Prisma or Supabase)
- [ ] JWT strategy
- [ ] Session management

#### 2.2 Auth Pages
- [ ] Login page (`app/(auth)/login/page.tsx`)
- [ ] Register page (`app/(auth)/register/page.tsx`)
- [ ] Forgot password page (`app/(auth)/forgot-password/page.tsx`)
- [ ] Email verification flow
- [ ] Password reset flow

#### 2.3 Auth Components
- [ ] Login form with validation
- [ ] Register form with validation
- [ ] Password reset form
- [ ] Protected route wrapper
- [ ] User profile component

#### 2.4 Email Integration (Resend)
**File**: `lib/email.ts`

- [ ] Setup Resend client
- [ ] Email verification template
- [ ] Password reset template
- [ ] Order confirmation template
- [ ] Booking confirmation template

---

### ✅ PHASE 3: Store (E-commerce)

#### 3.1 Product Database
- [ ] Product model with: name, description, price, category, images, stock, sizes
- [ ] Categories: Academy Gi, Rashguard, Shorts, Other

#### 3.2 Store Pages
- [ ] Store listing page (`app/(main)/store/page.tsx`)
- [ ] Product detail page (`app/(main)/store/[id]/page.tsx`)
- [ ] Category filtering
- [ ] Price filtering
- [ ] Search functionality

#### 3.3 Shopping Cart
**File**: `components/store/Cart.tsx`

- [ ] Add to cart functionality
- [ ] Cart drawer/sidebar
- [ ] Update quantities
- [ ] Remove items
- [ ] Persist in localStorage
- [ ] Calculate totals

#### 3.4 Product Components
- [ ] ProductCard component
- [ ] ProductGrid component
- [ ] ProductDetail component
- [ ] Size selector
- [ ] Image gallery

---

### ✅ PHASE 4: Payment Integration (BAC Credomatic)

#### 4.1 Payment API Routes
**File**: `app/api/payments/create-intent/route.ts`
**File**: `app/api/payments/process/route.ts`
**File**: `app/api/payments/webhook/route.ts`

- [ ] Create payment intent
- [ ] Process card payments
- [ ] Handle 3D Secure
- [ ] Webhook handling
- [ ] Error handling

#### 4.2 Payment Components
**File**: `components/payments/BACPayment.tsx`

- [ ] Card input form
- [ ] Payment processing UI
- [ ] Loading states
- [ ] Success/error handling
- [ ] Receipt display

#### 4.3 Checkout Flow
**File**: `components/store/Checkout.tsx`

- [ ] Multi-step checkout
- [ ] Shipping information
- [ ] Payment form
- [ ] Order review
- [ ] Order confirmation

#### 4.4 Order Management
- [ ] Create order on payment success
- [ ] Update inventory
- [ ] Send confirmation email
- [ ] Order history for users

---

### ✅ PHASE 5: Subscriptions

#### 5.1 Subscription Plans
**Types:**
1. **Academy Subscription**
   - Monthly: 1,200 Lps
   - Annual Matricula: 500 Lps (one-time)
   
2. **Courses Subscription**
   - Monthly: $5 USD

#### 5.2 Subscription API
**File**: `app/api/subscriptions/route.ts`

- [ ] Get subscription plans
- [ ] Create subscription
- [ ] Check subscription status
- [ ] Cancel subscription
- [ ] Handle recurring payments

#### 5.3 Subscription Components
- [ ] SubscriptionPlans component
- [ ] SubscriptionCard component
- [ ] Subscription status display
- [ ] Manage subscription page

---

### ✅ PHASE 6: Class Booking

#### 6.1 Class Booking System
**File**: `app/(main)/classes/page.tsx`

**Features:**
- [ ] Display class schedule
- [ ] Date/time picker
- [ ] Check free class eligibility
- [ ] Book free class (one per user)
- [ ] Book paid class (200 Lps)
- [ ] Availability checking

#### 6.2 Booking API
**File**: `app/api/classes/route.ts`

- [ ] Check free class eligibility
- [ ] Create booking
- [ ] Process payment for paid classes
- [ ] Get user bookings
- [ ] Cancel booking

#### 6.3 Booking Components
- [ ] ClassBooking component
- [ ] ClassCard component
- [ ] Schedule display
- [ ] Booking confirmation

---

### ✅ PHASE 7: Learn Section (Video Courses)

#### 7.1 Course Database
- [ ] Course model: title, description, category, thumbnail, requiresSubscription
- [ ] Lesson model: courseId, title, videoUrl (YouTube ID), order, duration
- [ ] UserProgress model: userId, courseId, lessonId, progress, completed

#### 7.2 Mock Courses (Initial Data)
Create these courses with mock videos:

1. **Jiu Jitsu for Beginners**
   - Lesson 1: Introduction to Jiu Jitsu
   - Lesson 2: Basic Positions
   - Lesson 3: Fundamental Movements
   - Lesson 4: First Techniques

2. **Guard Passing**
   - Lesson 1: Understanding the Guard
   - Lesson 2: Basic Pass Concepts
   - Lesson 3: Knee Cut Pass
   - Lesson 4: Torreando Pass

3. **Close Guard**
   - Lesson 1: Close Guard Fundamentals
   - Lesson 2: Breaking Posture
   - Lesson 3: Sweeps from Close Guard
   - Lesson 4: Submissions from Close Guard

#### 7.3 Learn Pages
- [ ] Course listing page (`app/(main)/learn/page.tsx`)
- [ ] Course detail page (`app/(main)/learn/[courseId]/page.tsx`)
- [ ] Category filtering
- [ ] Search functionality

#### 7.4 Video Player
**File**: `components/learn/VideoPlayer.tsx`

- [ ] YouTube iframe integration
- [ ] Progress tracking
- [ ] Auto-save progress every 5 seconds
- [ ] Mark lesson complete (>90%)
- [ ] Unlock next lesson
- [ ] Video controls

#### 7.5 Course Components
- [ ] CourseCard component
- [ ] CourseGrid component
- [ ] LessonList component
- [ ] Progress indicator
- [ ] Access control (subscription check)

---

### ✅ PHASE 8: Admin Panel

#### 8.1 Admin Routes (Protected)
- [ ] Admin dashboard (`app/(main)/admin/page.tsx`)
- [ ] Product management (`app/(main)/admin/products/page.tsx`)
- [ ] Course management (`app/(main)/admin/courses/page.tsx`)
- [ ] Image management (`app/(main)/admin/images/page.tsx`)
- [ ] Order management
- [ ] User management
- [ ] Subscription management

#### 8.2 Admin Components
- [ ] Product CRUD forms
- [ ] Course CRUD forms
- [ ] Lesson management (add multiple videos)
- [ ] Image upload component
- [ ] Image reorder functionality
- [ ] Order status updates

#### 8.3 Role-Based Access
- [ ] Super Admin: Full access
- [ ] Admin: Limited access (products, courses, orders)
- [ ] Middleware for route protection

---

## 🔧 TECHNICAL REQUIREMENTS

### Performance
- [ ] Lighthouse score > 90
- [ ] Image optimization (WebP, lazy loading)
- [ ] Code splitting
- [ ] API response caching

### Security
- [ ] HTTPS only
- [ ] JWT with httpOnly cookies
- [ ] Input validation (Zod)
- [ ] CSRF protection
- [ ] Rate limiting
- [ ] PCI compliance (no card storage)

### SEO
- [ ] Meta tags
- [ ] Open Graph
- [ ] Sitemap
- [ ] robots.txt

---

## 📁 WHERE TO ADD PICTURES

### Hero Carousel Images
**Location**: `public/images/ichiban-daily/`

**Steps:**
1. Create the folder: `public/images/ichiban-daily/`
2. Add all your daily Ichiban pictures to this folder
3. Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`
4. Any filename works
5. The carousel will automatically display all images

**Example:**
```
ichiban/
└── public/
    └── images/
        └── ichiban-daily/
            ├── photo1.jpg
            ├── photo2.jpg
            ├── daily-2024-01-15.jpg
            └── ... (all your pictures)
```

### Product Images
**Location**: `public/images/products/`
- Upload via admin panel or add manually

### Course Thumbnails
**Location**: `public/images/courses/`
- Upload via admin panel or add manually

---

## 🚀 DEPLOYMENT

### Vercel Setup
1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy

### Environment Variables
```env
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
BAC_API_KEY=
BAC_API_SECRET=
BAC_MERCHANT_ID=
BAC_WEBHOOK_SECRET=
YOUTUBE_API_KEY=
RESEND_API_KEY=
EMAIL_FROM=
APP_URL=
```

---

## ✅ FINAL CHECKLIST

### Functionality
- [ ] Hero carousel with daily pictures
- [ ] User authentication (login/register)
- [ ] Store with products
- [ ] Shopping cart
- [ ] Payment processing (BAC Credomatic)
- [ ] Subscription system
- [ ] Class booking (free + paid)
- [ ] Video courses with progress tracking
- [ ] Admin panel with CRUD operations

### Design
- [ ] White/black color scheme
- [ ] Responsive (mobile/tablet/desktop)
- [ ] Smooth animations
- [ ] Professional typography
- [ ] Fast loading

### Testing
- [ ] Test all user flows
- [ ] Test payment processing
- [ ] Test admin functions
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility

---

## 🎯 SUCCESS CRITERIA

✅ Beautiful, professional design
✅ Smooth user experience
✅ Secure payment processing
✅ Reliable authentication
✅ Easy content management
✅ Fast performance
✅ Mobile-responsive
✅ Production-ready

---

## 📝 NOTES

- Start with images in `public/images/ichiban-daily/` folder
- Use mock YouTube videos initially (placeholder IDs)
- BAC Credomatic integration requires API credentials
- All prices display currency (Lps or USD)
- Free class tracked by email/name
- Admin panel should be intuitive

---

**READY TO BUILD! 🚀**

Follow this prompt step-by-step, checking off each item as you complete it. The project is fully scoped and ready for implementation.
