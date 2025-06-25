import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { jwtConfig } from '@/lib/jwt';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function POST(req: Request) {
  try {
    console.log('Received registration request');
    const { email, password, name, role, description, website } = await req.json();
    console.log('Registration data:', { email, name, role });

    // Validate required fields
    if (!email || !password || !name || !role) {
      console.log('Missing required fields');
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format');
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      console.log('Password too short');
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Validate role
    const validRoles = ['DONOR', 'ORGANIZATION', 'VOLUNTEER', 'ADMIN'];
    if (!validRoles.includes(role)) {
      console.log('Invalid role:', role);
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      );
    }

    // Check if user already exists
    console.log('Checking for existing user');
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log('User already exists');
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    console.log('Hashing password');
    const hashedPassword = await hash(password, 12);

    // Create user and organization in a transaction
    console.log('Creating new user and organization');
    const result = await prisma.$transaction(async (prisma) => {
      // Create user
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          role,
        },
      });

      // If role is ORGANIZATION, create organization record
      let organization = null;
      if (role === 'ORGANIZATION') {
        organization = await prisma.organization.create({
          data: {
            name,
            description: description || 'No description provided',
            website: website || null,
            userId: user.id,
            status: 'PENDING',
          },
        });
      }

      return { user, organization };
    });

    // Generate JWT token
    console.log('Generating JWT token');
    let organizationId = null;
    if (result.user.role === 'ORGANIZATION' && result.organization) {
      organizationId = result.organization.id;
    }
    const token = jwtConfig.sign({
      userId: result.user.id,
      email: result.user.email,
      role: result.user.role,
      organizationId,
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = result.user;

    console.log('Registration successful');
    return NextResponse.json({
      user: userWithoutPassword,
      organization: result.organization,
      token
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error during registration' },
      { status: 500 }
    );
  }
} 