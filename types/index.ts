export type User = {
  id: string;
  email: string;
  name: string;
  verified: boolean;
  freeClassUsed: boolean;
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
  createdAt: Date;
  updatedAt: Date;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  sizes: string[];
  active: boolean;
  isDropship: boolean;
  supplierName?: string;
  supplierProductId?: string;
  fulfillmentNotes?: string;
  estimatedShippingDays?: number;
  createdAt: Date;
};

export type Order = {
  id: string;
  userId: string;
  total: number;
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  paymentIntentId?: string;
  transactionId?: string;
  shippingAddress?: any;
  createdAt: Date;
  items: OrderItem[];
};

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  size?: string;
  product?: Product;
};

export type Subscription = {
  id: string;
  userId: string;
  type: 'ACADEMY' | 'COURSES';
  status: 'ACTIVE' | 'CANCELLED' | 'EXPIRED';
  amount: number;
  currency: string;
  paymentMethodId?: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelledAt?: Date;
  createdAt: Date;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail?: string;
  requiresSubscription: boolean;
  price?: number;
  instructor?: string;
  createdAt: Date;
  lessons: Lesson[];
};

export type Lesson = {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  videoUrl: string;
  order: number;
  duration?: number;
  createdAt: Date;
};

export type UserProgress = {
  id: string;
  userId: string;
  courseId: string;
  lessonId: string;
  progress: number;
  completed: boolean;
  completedAt?: Date;
  updatedAt: Date;
};

export type ClassBooking = {
  id: string;
  userId: string;
  classDate: Date;
  classTime: string;
  type: 'FREE' | 'PAID';
  amount?: number;
  status: 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  paymentIntentId?: string;
  createdAt: Date;
};

export type CarouselImage = {
  id: string;
  filename: string;
  url: string;
  displayOrder: number;
  active: boolean;
  uploadedAt?: Date;
  width?: number;
  height?: number;
  orientation?: 'portrait' | 'landscape';
};

export type CartItem = {
  productId: string;
  product: Product;
  quantity: number;
  size?: string;
};

export type SubscriptionPlan = {
  type: 'ACADEMY' | 'COURSES';
  name: string;
  description: string;
  monthlyPrice: number;
  currency: string;
  features: string[];
  annualMatricula?: number;
};
