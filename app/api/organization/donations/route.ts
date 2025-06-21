import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/middleware';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    let decoded;
    try {
      decoded = verifyToken(req, ['ORGANIZATION', 'ADMIN']);
    } catch (err) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const donations = await prisma.donation.findMany({
      where: {
        campaign: {
          organizationId: decoded.organizationId
        }
      },
      include: {
        campaign: true,
        donor: true
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