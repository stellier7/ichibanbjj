import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `${process.env.APP_URL || process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}`;
  
  await resend.emails.send({
    from: process.env.EMAIL_FROM || 'noreply@ichiban.com',
    to: email,
    subject: 'Verify your Ichiban account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #000;">Welcome to Ichiban!</h1>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="${verifyUrl}" style="display: inline-block; padding: 12px 24px; background-color: #000; color: #fff; text-decoration: none; border-radius: 4px; margin: 20px 0;">
          Verify Email
        </a>
        <p>Or copy and paste this URL into your browser:</p>
        <p style="color: #666; word-break: break-all;">${verifyUrl}</p>
        <p>This link will expire in 24 hours.</p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.APP_URL || process.env.NEXTAUTH_URL}/reset-password?token=${token}`;
  
  await resend.emails.send({
    from: process.env.EMAIL_FROM || 'noreply@ichiban.com',
    to: email,
    subject: 'Reset your Ichiban password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #000;">Password Reset Request</h1>
        <p>You requested to reset your password. Click the link below to reset it:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #000; color: #fff; text-decoration: none; border-radius: 4px; margin: 20px 0;">
          Reset Password
        </a>
        <p>Or copy and paste this URL into your browser:</p>
        <p style="color: #666; word-break: break-all;">${resetUrl}</p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `,
  });
}

export async function sendOrderConfirmationEmail(email: string, order: any) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM || 'noreply@ichiban.com',
    to: email,
    subject: `Order Confirmation #${order.id.slice(0, 8)}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #000;">Order Confirmed!</h1>
        <p>Thank you for your purchase. Your order has been confirmed.</p>
        <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 4px;">
          <p><strong>Order ID:</strong> ${order.id.slice(0, 8)}</p>
          <p><strong>Total:</strong> ${order.total} Lps</p>
          <p><strong>Status:</strong> ${order.status}</p>
        </div>
        <p>We'll send you another email when your order ships.</p>
      </div>
    `,
  });
}

export async function sendBookingConfirmationEmail(email: string, booking: any) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM || 'noreply@ichiban.com',
    to: email,
    subject: 'Class Booking Confirmed',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #000;">Class Booking Confirmed!</h1>
        <p>Your class booking has been confirmed.</p>
        <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 4px;">
          <p><strong>Date:</strong> ${new Date(booking.classDate).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${booking.classTime}</p>
          <p><strong>Type:</strong> ${booking.type === 'FREE' ? 'Free Class' : 'Paid Class'}</p>
        </div>
        <p>We look forward to seeing you at Ichiban!</p>
      </div>
    `,
  });
}
