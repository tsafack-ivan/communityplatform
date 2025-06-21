import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verify } from 'jsonwebtoken';

const prisma = new PrismaClient();

// Middleware to verify JWT token
const verifyToken = (req: Request) => {
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) {
    throw new Error('No token provided');
  }
  return verify(token, process.env.JWT_SECRET || 'your-secret-key');
};

export async function GET(req: Request) {
  try {
    const payload = verifyToken(req);

    const donations = await prisma.donation.findMany({
      where: {
        userId: payload.userId,
      },
      include: {
        campaign: {
          include: {
            organization: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json(
      { error: 'Error fetching donations' },
      { status: 500 }
    );
  }
} 