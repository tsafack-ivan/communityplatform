import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const {
      name,
      email,
      password,
      phone,
      address,
      description,
      website,
      registrationNumber,
      mission,
      vision,
      focusAreas,
      teamSize,
      establishedYear
    } = await req.json();

    // Validate required fields
    if (!name || !email || !password || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create user and organization in a transaction
    const result = await prisma.$transaction(async (prisma) => {
      // Create user
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          role: 'ORGANIZATION'
        }
      });

      // Create organization
      const organization = await prisma.organization.create({
        data: {
          name,
          description,
          website,
          userId: user.id
        }
      });

      return { user, organization };
    });

    return NextResponse.json({
      message: 'NGO registered successfully',
      organization: result.organization
    });
  } catch (error) {
    console.error('NGO registration error:', error);
    return NextResponse.json(
      { error: 'Error registering NGO' },
      { status: 500 }
    );
  }
} 