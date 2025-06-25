import { NextResponse, NextRequest } from 'next/server';
import { jwtConfig } from '@/lib/jwt';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Extract and verify the token
    const token = authHeader.split(' ')[1];
    const decoded = jwtConfig.verify(token) as { userId: string };

    // Find the organization associated with the user
    const organization = await prisma.organization.findFirst({
      where: {
        userId: decoded.userId
      }
    });

    if (!organization) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(organization);
  } catch (error) {
    console.error('Error fetching organization profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch organization profile' },
      { status: 500 }
    );
  }
} 