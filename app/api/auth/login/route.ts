import { NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { jwtConfig } from '@/lib/jwt';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isValid = await compare(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Fetch organizationId if user is ORGANIZATION
    let organizationId = null;
    if (user.role === 'ORGANIZATION') {
      const org = await prisma.organization.findFirst({ where: { userId: user.id } });
      organizationId = org?.id || null;
    }

    // Create JWT token
    const token = jwtConfig.sign({
      userId: user.id,
      email: user.email,
      role: user.role,
      organizationId,
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error logging in' },
      { status: 500 }
    );
  }
} 