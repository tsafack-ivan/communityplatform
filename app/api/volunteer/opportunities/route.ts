import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import prisma from '@/lib/prisma';

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
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    // Verify token
    const payload = verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    // Fetch opportunities
    const opportunities = await prisma.volunteerOpportunity.findMany({
      include: {
        organization: {
          select: {
            name: true,
            logo: true
          }
        }
      },
      orderBy: {
        date: 'asc'
      }
    });

    return NextResponse.json(opportunities);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
} 