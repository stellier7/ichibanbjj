# Ichiban Jiu Jitsu Gym Website - Pseudocode Architecture

## Project Overview
Modern website for Ichiban Jiu Jitsu gym featuring:
- Full-screen hero with dynamic image carousel
- User authentication and payment processing (BAC Credomatic)
- E-commerce store for gym merchandise
- Video course platform with subscription model
- Class booking system (free first class, one-time class purchases)

## Tech Stack
- **Framework**: Next.js 14+ (App Router) with TypeScript
- **Styling**: Tailwind CSS (white/black color scheme)
- **Authentication**: NextAuth.js
- **Payment**: BAC Credomatic integration
- **Database**: Supabase (PostgreSQL) or Prisma + PostgreSQL
- **Image Storage**: Local folder initially (migrate to cloud later)
- **Video Hosting**: YouTube API integration
- **State Management**: Zustand or React Context
- **Forms**: React Hook Form + Zod validation
- **Deployment**: Vercel

## Project Structure
```
ichiban/
├── app/                    # Next.js App Router
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── (main)/
│   │   ├── page.tsx        # Landing page with hero
│   │   ├── about/
│   │   ├── schedule/
│   │   ├── store/
│   │   │   ├── page.tsx    # Store listing
│   │   │   └── [id]/       # Product detail
│   │   ├── learn/
│   │   │   ├── page.tsx    # Course listing
│   │   │   └── [courseId]/ # Course detail
│   │   ├── classes/
│   │   │   ├── page.tsx    # Class booking
│   │   │   └── book/
│   │   └── admin/          # Admin panel (protected)
│   │       ├── products/
│   │       ├── courses/
│   │       └── images/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register/
│   │   │   ├── login/
│   │   │   └── [...nextauth]/
│   │   ├── payments/
│   │   │   ├── create-intent/
│   │   │   ├── webhook/
│   │   │   └── subscriptions/
│   │   ├── products/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   ├── courses/
│   │   │   ├── route.ts
│   │   │   ├── [id]/
│   │   │   └── [id]/progress/
│   │   ├── classes/
│   │   │   ├── route.ts
│   │   │   ├── book/
│   │   │   └── check-free-class/
│   │   └── images/
│   │       └── route.ts
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── hero/
│   │   └── ImageCarousel.tsx
│   ├── store/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── Cart.tsx
│   │   ├── CartDrawer.tsx
│   │   └── Checkout.tsx
│   ├── learn/
│   │   ├── CourseCard.tsx
│   │   ├── CourseGrid.tsx
│   │   ├── VideoPlayer.tsx
│   │   └── LessonList.tsx
│   ├── classes/
│   │   ├── ClassBooking.tsx
│   │   ├── ClassCard.tsx
│   │   └── SubscriptionPlans.tsx
│   ├── payments/
│   │   ├── PaymentForm.tsx
│   │   ├── SubscriptionCard.tsx
│   │   └── BACPayment.tsx
│   └── ui/                 # Reusable UI components
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Modal.tsx
│       └── Loading.tsx
├── lib/
│   ├── auth.ts
│   ├── payment.ts          # BAC Credomatic integration
│   ├── db.ts
│   ├── youtube.ts          # YouTube API integration
│   └── utils.ts
├── types/
│   └── index.ts
├── public/
│   └── images/
│       └── ichiban-daily/  # Daily pictures folder
└── hooks/
    ├── useAuth.ts
    ├── useCart.ts
    └── useSubscription.ts
```

## Core Components Pseudocode

### 1. Hero Image Carousel
```
COMPONENT: ImageCarousel
  PROPS:
    - images: Image[]
  
  STATE:
    - currentIndex: number
    - images: Image[]
    - isAutoPlaying: boolean
    - visibleImages: number (responsive: 3-5 images)
  
  EFFECTS:
    - Fetch images from /api/images on mount
    - Auto-rotate every 5 seconds
    - Cleanup interval on unmount
    - Calculate visible images based on viewport
  
  FUNCTIONS:
    - nextImage()
      - Increment currentIndex
      - Loop to 0 if exceeds length
      - Smooth transition
    
    - previousImage()
      - Decrement currentIndex
      - Loop to end if < 0
    
    - goToImage(index)
      - Set currentIndex to index
      - Smooth transition
    
    - toggleAutoPlay()
      - Toggle isAutoPlaying
      - Start/stop interval
  
  RENDER:
    - Full viewport height container
    - Grid layout showing multiple images simultaneously
      - Main center image (larger)
      - Side images (smaller, blurred edges)
    - Semi-transparent overlay with "ICHIBAN" branding
    - Navigation dots at bottom
    - Arrow controls (optional)
    - Smooth fade/scale transitions
    - Lazy loading for performance
```

### 2. Authentication System
```
MODULE: Authentication
  FUNCTIONS:
    - register(email, password, name)
      - Validate email format (Zod)
      - Validate password strength (min 8 chars)
      - Hash password (bcrypt, 10 rounds)
      - Check if user exists
      - Create user in database
      - Send verification email
      - Return { user, token }
    
    - login(email, password)
      - Find user by email
      - Verify password (bcrypt.compare)
      - Check if email verified
      - Generate JWT token (expires 7 days)
      - Set httpOnly cookie
      - Update lastLogin timestamp
      - Return { user, token }
    
    - logout()
      - Clear session cookie
      - Remove token from client
      - Redirect to home
    
    - resetPassword(email)
      - Find user by email
      - Generate secure reset token
      - Store token with 1-hour expiration
      - Send reset email with link
      - Return success message
    
    - verifyEmail(token)
      - Validate token
      - Check expiration
      - Update user.verified = true
      - Remove token
      - Return success
    
    - refreshToken(refreshToken)
      - Validate refresh token
      - Generate new access token
      - Return new token

COMPONENT: LoginForm
  STATE:
    - email: string
    - password: string
    - error: string
    - loading: boolean
  
  FUNCTIONS:
    - handleSubmit()
      - Validate inputs
      - Call login API
      - Handle errors
      - Redirect on success
```

### 3. Payment Processing (BAC Credomatic)
```
MODULE: Payment (BAC Credomatic)
  FUNCTIONS:
    - createPaymentIntent(amount, currency, type, metadata)
      INPUT:
        - amount: number (in Lempiras or USD)
        - currency: 'HNL' | 'USD'
        - type: 'subscription' | 'one-time' | 'class' | 'product'
        - metadata: { userId, itemId, description }
      
      PROCESS:
        - Validate amount > 0
        - Format amount for BAC API
        - Create payment intent via BAC Credomatic API
        - Store payment intent in database
        - Return { clientSecret, paymentIntentId }
    
    - processPayment(paymentIntentId, paymentMethod, cardDetails)
      INPUT:
        - paymentIntentId: string
        - paymentMethod: BAC payment method object
        - cardDetails: { number, expiry, cvv, name }
      
      PROCESS:
        - Validate card details
        - Process payment via BAC Credomatic API
        - Handle 3D Secure if required
        - Update payment status in database
        - Create order/subscription record
        - Send confirmation email
        - Return { success, transactionId, orderId }
    
    - createSubscription(userId, planType, paymentMethodId)
      INPUT:
        - userId: string
        - planType: 'academy' | 'courses'
        - paymentMethodId: string
      
      PROCESS:
        - Calculate amount based on plan
          - Academy: 1200 Lps/month + annual matricula
          - Courses: $5 USD/month
        - Create subscription in database
        - Set up recurring payment with BAC
        - Return subscription object
    
    - handleWebhook(event)
      INPUT:
        - event: BAC webhook event
      
      PROCESS:
        - Verify webhook signature
        - Parse event type
        - Update order/subscription status
        - Handle refunds/cancellations
        - Send notification emails
        - Return 200 OK

COMPONENT: BACPaymentForm
  STATE:
    - cardNumber: string
    - expiryDate: string
    - cvv: string
    - cardName: string
    - loading: boolean
    - error: string
  
  FUNCTIONS:
    - formatCardNumber()
      - Add spaces every 4 digits
      - Validate card type
    
    - formatExpiry()
      - Add slash after MM
      - Validate month/year
    
    - handleSubmit()
      - Validate all fields
      - Create payment intent
      - Process payment
      - Handle 3D Secure if needed
      - Show success/error
```

### 4. Subscription System
```
MODULE: Subscriptions
  TYPES:
    - Academy Subscription
      - Monthly: 1200 Lps
      - Annual Matricula: [amount] Lps (one-time)
      - Features: Access to all classes, store discounts
    
    - Courses Subscription
      - Monthly: $5 USD
      - Features: Access to all video courses
  
  FUNCTIONS:
    - getSubscriptionPlans()
      - Return available plans with pricing
      - Include features for each plan
    
    - subscribe(userId, planType, paymentMethodId)
      - Validate user authentication
      - Check if already subscribed
      - Create payment intent
      - Process initial payment
      - Create subscription record
      - Set renewal date
      - Grant access permissions
      - Return subscription
    
    - cancelSubscription(subscriptionId)
      - Find subscription
      - Cancel with BAC Credomatic
      - Update status to 'cancelled'
      - Revoke access at period end
      - Send confirmation email
    
    - checkSubscriptionStatus(userId)
      - Get active subscriptions
      - Check expiration dates
      - Return status and access level
    
    - renewSubscription(subscriptionId)
      - Process recurring payment
      - Update renewal date
      - Extend access

COMPONENT: SubscriptionPlans
  STATE:
    - selectedPlan: string
    - loading: boolean
  
  FUNCTIONS:
    - handleSubscribe(planType)
      - Require authentication
      - Redirect to payment
      - Process subscription
```

### 5. Class Booking System
```
MODULE: ClassBooking
  FUNCTIONS:
    - checkFreeClassEligibility(userId)
      - Check if user has used free class
      - Return { eligible: boolean, used: boolean }
    
    - bookFreeClass(userId, classDate, classTime)
      - Validate eligibility
      - Check class availability
      - Create booking with 'free' status
      - Mark free class as used
      - Send confirmation email
      - Return booking
    
    - bookPaidClass(userId, classDate, classTime)
      - Check class availability
      - Create payment intent (200 Lps)
      - Process payment
      - Create booking
      - Send confirmation
      - Return booking
    
    - getClassSchedule()
      - Return available class times
      - Filter by date
      - Show availability
    
    - cancelBooking(bookingId)
      - Find booking
      - Check cancellation policy
      - Process refund if applicable
      - Update booking status
      - Free up slot

COMPONENT: ClassBooking
  STATE:
    - selectedDate: Date
    - selectedTime: string
    - freeClassUsed: boolean
    - loading: boolean
  
  FUNCTIONS:
    - checkFreeClass()
      - Call API to check eligibility
      - Show free class option if eligible
    
    - handleBookClass(isFree)
      - If free: bookFreeClass()
      - If paid: redirect to payment (200 Lps)
      - Show confirmation
```

### 6. Store System
```
COMPONENT: StorePage
  STATE:
    - products: Product[]
    - cart: CartItem[]
    - filters: { category: string, priceRange: [number, number] }
    - loading: boolean
    - viewMode: 'grid' | 'list'
  
  FUNCTIONS:
    - fetchProducts()
      - GET /api/products
      - Apply filters
      - Sort by category/price
      - Update state
    
    - addToCart(product, quantity, size)
      - Validate product availability
      - Check stock
      - Add to cart state
      - Update localStorage
      - Show success notification
      - Update cart count badge
    
    - removeFromCart(itemId)
      - Remove from cart
      - Update state and localStorage
    
    - updateCartQuantity(itemId, quantity)
      - Validate quantity
      - Update item in cart
      - Recalculate totals
    
    - checkout()
      - Validate cart not empty
      - Require authentication
      - Calculate total
      - Redirect to checkout page

COMPONENT: ProductCard
  PROPS:
    - product: Product
  
  RENDER:
    - Product image (hover zoom)
    - Product name
    - Price (in Lempiras)
    - Category badge
    - "Add to Cart" button
    - Quick view option

COMPONENT: CheckoutPage
  STATE:
    - cart: CartItem[]
    - shippingInfo: Address
    - paymentMethod: PaymentMethod
    - step: 'cart' | 'shipping' | 'payment' | 'review'
  
  FUNCTIONS:
    - calculateSubtotal()
      - Sum all item prices * quantities
      - Return subtotal
    
    - calculateShipping()
      - Based on address
      - Return shipping cost
    
    - calculateTotal()
      - subtotal + shipping + taxes
      - Return total
    
    - processOrder()
      - Validate all steps
      - Create order in database
      - Create payment intent
      - Process payment via BAC
      - Update inventory
      - Clear cart
      - Send confirmation email
      - Redirect to success page
```

### 7. Video Course System
```
COMPONENT: LearnPage
  STATE:
    - courses: Course[]
    - selectedCategory: string
    - userProgress: Progress[]
    - subscriptionStatus: SubscriptionStatus
    - loading: boolean
  
  FUNCTIONS:
    - fetchCourses()
      - GET /api/courses
      - Filter by category if selected
      - Include user progress if authenticated
      - Update state
    
    - getCourseProgress(courseId)
      - Calculate completed lessons
      - Return percentage and status
    
    - checkCourseAccess(courseId)
      - Check if course is free
      - Check subscription status
      - Return { hasAccess: boolean, reason: string }
    
    - unlockCourse(courseId)
      - Check subscription
      - If no subscription, redirect to subscribe
      - Grant access
      - Return success

COMPONENT: CourseCard
  PROPS:
    - course: Course
    - progress?: number
  
  RENDER:
    - Thumbnail image
    - Course title
    - Instructor name
    - Lesson count
    - Duration
    - Progress bar (if started)
    - "Start Course" or "Continue" button
    - Lock icon if requires subscription

COMPONENT: VideoPlayer
  PROPS:
    - videoUrl: string (YouTube URL)
    - courseId: string
    - lessonId: string
    - onComplete: function
  
  STATE:
    - currentTime: number
    - duration: number
    - isPlaying: boolean
    - progress: number
    - quality: string
    - playbackRate: number
  
  EFFECTS:
    - Initialize YouTube player
    - Load video on mount
    - Track currentTime every 5 seconds
    - Save progress to database
  
  FUNCTIONS:
    - saveProgress()
      - Calculate progress percentage
      - POST /api/courses/[courseId]/progress
      - Update local state
      - Mark lesson complete if > 90%
    
    - handleVideoEnd()
      - Mark lesson as completed
      - Unlock next lesson
      - Show completion message
      - Call onComplete callback
    
    - handlePlay()
      - Resume playback
      - Update state
    
    - handlePause()
      - Pause playback
      - Save progress
    
    - changeQuality(quality)
      - Update YouTube player quality
      - Save preference

COMPONENT: LessonList
  PROPS:
    - lessons: Lesson[]
    - courseId: string
    - userProgress: Progress[]
  
  FUNCTIONS:
    - getLessonStatus(lessonId)
      - Check if completed
      - Check if locked
      - Return status
    
    - unlockNextLesson()
      - Find next locked lesson
      - Unlock if previous completed
```

### 8. Admin Panel
```
COMPONENT: AdminDashboard
  ROUTES:
    - /admin/products (CRUD products)
    - /admin/courses (CRUD courses)
    - /admin/images (Manage carousel images)
    - /admin/orders (View orders)
    - /admin/subscriptions (Manage subscriptions)
    - /admin/users (View users)

COMPONENT: ProductManagement
  FUNCTIONS:
    - createProduct(data)
      - Validate product data
      - Upload images
      - Create in database
      - Return product
    
    - updateProduct(id, data)
      - Find product
      - Update fields
      - Save to database
    
    - deleteProduct(id)
      - Check if in orders
      - Soft delete or hard delete
      - Update inventory

COMPONENT: CourseManagement
  FUNCTIONS:
    - createCourse(data)
      - Validate course data
      - Add YouTube video URLs
      - Create lessons
      - Set pricing/subscription requirement
      - Return course
    
    - addLesson(courseId, lessonData)
      - Validate lesson data
      - Add to course
      - Reorder lessons
      - Return lesson
    
    - updateCourse(id, data)
      - Update course metadata
      - Update lessons
      - Save changes

COMPONENT: ImageManagement
  FUNCTIONS:
    - uploadImage(file)
      - Validate file type/size
      - Upload to public/images/ichiban-daily/
      - Create database record
      - Return image URL
    
    - deleteImage(id)
      - Remove file
      - Delete database record
    
    - reorderImages(order)
      - Update display order
      - Save to database
```

## Database Schema (Pseudocode)
```
TABLES:

users
  - id: uuid (PK)
  - email: string (unique)
  - password_hash: string
  - name: string
  - verified: boolean
  - free_class_used: boolean
  - created_at: timestamp
  - updated_at: timestamp
  - last_login: timestamp

products
  - id: uuid (PK)
  - name: string
  - description: text
  - price: decimal (in Lempiras)
  - category: string (gi, rashguard, shorts, etc.)
  - images: jsonb (array of URLs)
  - stock: integer
  - sizes: jsonb (available sizes)
  - active: boolean
  - created_at: timestamp

orders
  - id: uuid (PK)
  - user_id: uuid (FK -> users)
  - total: decimal
  - status: string (pending, paid, shipped, delivered, cancelled)
  - payment_intent_id: string
  - transaction_id: string
  - shipping_address: jsonb
  - created_at: timestamp

order_items
  - id: uuid (PK)
  - order_id: uuid (FK -> orders)
  - product_id: uuid (FK -> products)
  - quantity: integer
  - price: decimal
  - size: string

subscriptions
  - id: uuid (PK)
  - user_id: uuid (FK -> users)
  - type: string (academy, courses)
  - status: string (active, cancelled, expired)
  - amount: decimal
  - currency: string
  - payment_method_id: string
  - current_period_start: timestamp
  - current_period_end: timestamp
  - cancelled_at: timestamp
  - created_at: timestamp

courses
  - id: uuid (PK)
  - title: string
  - description: text
  - category: string (beginner, advanced, guard_passing, close_guard, etc.)
  - thumbnail: string (URL)
  - requires_subscription: boolean
  - price: decimal (if one-time purchase)
  - instructor: string
  - created_at: timestamp

lessons
  - id: uuid (PK)
  - course_id: uuid (FK -> courses)
  - title: string
  - description: text
  - video_url: string (YouTube URL)
  - order: integer
  - duration: integer (seconds)
  - created_at: timestamp

user_progress
  - id: uuid (PK)
  - user_id: uuid (FK -> users)
  - course_id: uuid (FK -> courses)
  - lesson_id: uuid (FK -> lessons)
  - progress: integer (0-100)
  - completed: boolean
  - completed_at: timestamp
  - updated_at: timestamp

class_bookings
  - id: uuid (PK)
  - user_id: uuid (FK -> users)
  - class_date: date
  - class_time: time
  - type: string (free, paid)
  - amount: decimal (if paid)
  - status: string (confirmed, cancelled, completed)
  - payment_intent_id: string (if paid)
  - created_at: timestamp

carousel_images
  - id: uuid (PK)
  - filename: string
  - url: string
  - display_order: integer
  - active: boolean
  - uploaded_at: timestamp
```

## API Routes Pseudocode

### Authentication Routes
```
POST /api/auth/register
  BODY: { email, password, name }
  - Validate input
  - Check if user exists
  - Hash password
  - Create user
  - Send verification email
  - Return { user, token }

POST /api/auth/login
  BODY: { email, password }
  - Validate credentials
  - Generate JWT token
  - Set httpOnly cookie
  - Return { user, token }

POST /api/auth/logout
  - Clear session cookie
  - Return success

POST /api/auth/forgot-password
  BODY: { email }
  - Generate reset token
  - Send reset email
  - Return success

POST /api/auth/reset-password
  BODY: { token, newPassword }
  - Validate token
  - Update password
  - Return success
```

### Payment Routes
```
POST /api/payments/create-intent
  AUTH: Required
  BODY: { amount, currency, type, metadata }
  - Validate input
  - Create payment intent with BAC Credomatic
  - Store in database
  - Return { clientSecret, paymentIntentId }

POST /api/payments/process
  AUTH: Required
  BODY: { paymentIntentId, cardDetails }
  - Process payment via BAC
  - Handle 3D Secure
  - Update order/subscription
  - Send confirmation
  - Return { success, transactionId }

POST /api/payments/webhook
  - Verify webhook signature
  - Process event
  - Update database
  - Return 200 OK
```

### Product Routes
```
GET /api/products
  QUERY: ?category=gi&minPrice=100&maxPrice=500
  - Query products from database
  - Apply filters
  - Return products array

GET /api/products/[id]
  - Find product by ID
  - Return product details

POST /api/products (Admin only)
  AUTH: Admin
  BODY: { name, description, price, category, images, stock }
  - Validate input
  - Create product
  - Return product

PUT /api/products/[id] (Admin only)
  AUTH: Admin
  - Update product
  - Return updated product

DELETE /api/products/[id] (Admin only)
  AUTH: Admin
  - Delete product
  - Return success
```

### Course Routes
```
GET /api/courses
  QUERY: ?category=beginner
  AUTH: Optional
  - Query courses
  - Include user progress if authenticated
  - Filter by category
  - Return courses array

GET /api/courses/[id]
  AUTH: Optional
  - Find course by ID
  - Include lessons
  - Check user access
  - Return course with access status

POST /api/courses/[id]/progress
  AUTH: Required
  BODY: { lessonId, progress, completed }
  - Update user progress
  - Mark lesson complete if > 90%
  - Return updated progress

POST /api/courses (Admin only)
  AUTH: Admin
  BODY: { title, description, category, lessons, requiresSubscription }
  - Create course
  - Return course
```

### Class Booking Routes
```
GET /api/classes/schedule
  - Return available class times
  - Filter by date

GET /api/classes/check-free-class
  AUTH: Required
  - Check if user eligible for free class
  - Return { eligible, used }

POST /api/classes/book
  AUTH: Required
  BODY: { classDate, classTime, isFree }
  - Validate availability
  - If free: check eligibility, create booking
  - If paid: create payment intent (200 Lps), process payment
  - Create booking
  - Send confirmation
  - Return booking

GET /api/classes/my-bookings
  AUTH: Required
  - Get user's bookings
  - Return bookings array
```

### Subscription Routes
```
GET /api/subscriptions/plans
  - Return available subscription plans
  - Include pricing and features

POST /api/subscriptions/subscribe
  AUTH: Required
  BODY: { planType, paymentMethodId }
  - Validate plan
  - Create payment intent
  - Process payment
  - Create subscription
  - Return subscription

GET /api/subscriptions/status
  AUTH: Required
  - Get user's active subscriptions
  - Return subscription status

POST /api/subscriptions/cancel
  AUTH: Required
  BODY: { subscriptionId }
  - Cancel subscription
  - Process cancellation
  - Return success
```

### Image Routes
```
GET /api/images
  - Get all carousel images
  - Return images array ordered by display_order

POST /api/images (Admin only)
  AUTH: Admin
  BODY: FormData with image file
  - Upload image to public/images/ichiban-daily/
  - Create database record
  - Return image URL

DELETE /api/images/[id] (Admin only)
  AUTH: Admin
  - Delete image file
  - Delete database record
  - Return success

PUT /api/images/reorder (Admin only)
  AUTH: Admin
  BODY: { order: [id1, id2, ...] }
  - Update display order
  - Return success
```

## State Management Flow

### Authentication Flow
```
1. User submits login form
2. Validate input client-side (Zod)
3. POST /api/auth/login
4. Server validates credentials
5. Generate JWT token
6. Set httpOnly cookie
7. Update global auth state (Zustand/Context)
8. Redirect to protected route or return user
```

### Payment Flow (Product Purchase)
```
1. User adds items to cart
2. Proceeds to checkout
3. Authentication required (redirect if not logged in)
4. Fill shipping information
5. POST /api/payments/create-intent
   - Creates order in database
   - Creates payment intent with BAC
6. Render BAC payment form with client secret
7. User enters card details
8. POST /api/payments/process
   - Processes payment via BAC Credomatic
   - Handles 3D Secure if needed
9. Webhook confirms payment
10. Update order status
11. Send confirmation email
12. Show success page
13. Clear cart
```

### Subscription Flow
```
1. User selects subscription plan
2. Authentication required
3. Check if already subscribed
4. POST /api/subscriptions/subscribe
   - Creates payment intent
   - Processes initial payment
5. Create subscription record
6. Grant access permissions
7. Set up recurring payment with BAC
8. Show success and access granted
```

### Free Class Booking Flow
```
1. User navigates to classes page
2. GET /api/classes/check-free-class
   - Returns eligibility status
3. If eligible: Show "Book Free Class" button
4. User selects date/time
5. POST /api/classes/book { isFree: true }
   - Validates availability
   - Creates booking
   - Marks free class as used
6. Send confirmation email
7. Show booking confirmation
```

### Paid Class Booking Flow
```
1. User selects class date/time
2. POST /api/classes/book { isFree: false }
   - Creates payment intent (200 Lps)
3. Process payment via BAC
4. Create booking on success
5. Send confirmation
6. Show booking details
```

### Video Progress Flow
```
1. User plays video lesson
2. VideoPlayer component tracks currentTime
3. Debounced save (every 5 seconds):
   POST /api/courses/[id]/progress
   - Updates progress in database
4. Update UI progress indicator
5. On video end or >90% completion:
   - Mark lesson as completed
   - Unlock next lesson
   - Show completion message
   - Update course progress
```

## Environment Variables
```
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

# Email Service
EMAIL_SERVICE_API_KEY=
EMAIL_FROM=

# File Upload
MAX_FILE_SIZE=5242880  # 5MB
ALLOWED_IMAGE_TYPES=jpg,jpeg,png,webp

# App
APP_URL=http://localhost:3000
```

## Deployment Checklist
- [ ] Set up Vercel project
- [ ] Configure production database (Supabase)
- [ ] Set environment variables in Vercel
- [ ] Configure BAC Credomatic webhook URL
- [ ] Set up image storage (migrate from folder to cloud)
- [ ] Configure YouTube API
- [ ] Set up email service
- [ ] Configure domain and SSL
- [ ] Test payment flow end-to-end
- [ ] Performance optimization
- [ ] SEO setup
- [ ] Analytics integration
- [ ] Error monitoring (Sentry)
- [ ] Backup strategy

## Performance Optimizations
- Image optimization (Next.js Image component)
- Lazy loading for routes
- Code splitting
- Caching strategies
- CDN for static assets
- Database query optimization
- API response caching

## Security Considerations
- HTTPS only
- JWT token expiration
- httpOnly cookies for tokens
- Input validation (Zod)
- SQL injection prevention (parameterized queries)
- XSS prevention
- CSRF protection
- Rate limiting on API routes
- Payment data never stored (PCI compliance)
- Secure file upload validation
```
