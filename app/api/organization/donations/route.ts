import { NextResponse, NextRequest } from 'next/server';
import { verifyToken } from '@/lib/middleware';
import prisma from '@/lib/prisma';
import { JwtPayload } from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  try {
    let decoded: JwtPayload & { organizationId?: string };
    try {
      decoded = verifyToken(req, ['ORGANIZATION', 'ADMIN']) as JwtPayload & { organizationId?: string };
    } catch (err) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!decoded.organizationId) {
      return NextResponse.json({ error: 'No organizationId in token. Please log in again.' }, { status: 400 });
    }

    const donations = await prisma.donation.findMany({
      where: {
        campaign: {
          organizationId: decoded.organizationId
        }
      },
      include: {
        campaign: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 