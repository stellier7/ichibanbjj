import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';
import { sendPasswordResetEmail } from '@/lib/email';
import crypto from 'crypto';

const forgotPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = forgotPasswordSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    // Don't reveal if user exists or not (security best practice)
    if (user) {
      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      
      // Store reset token (you might want to create a separate table for this)
      // For now, we'll just send the email
      // In production, store the token with expiration in database

      try {
        await sendPasswordResetEmail(validatedData.email, resetToken);
      } catch (emailError) {
        console.error('Error sending password reset email:', emailError);
        return NextResponse.json(
          { error: 'Error al enviar email' },
          { status: 500 }
        );
      }
    }

    // Always return success to prevent email enumeration
    return NextResponse.json({
      message: 'Si existe una cuenta con ese email, recibirás un enlace para restablecer tu contraseña.',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Error al procesar solicitud' },
      { status: 500 }
    );
  }
}
