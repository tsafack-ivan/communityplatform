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

    const volunteers = await prisma.volunteerApplication.findMany({
      where: {
        organizationId: decoded.organizationId
      },
      include: {
        user: true,
        campaign: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(volunteers);
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    let decoded;
    try {
      decoded = verifyToken(req, ['ORGANIZATION', 'ADMIN']);
    } catch (err) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { applicationId, status } = await req.json();

    const updatedApplication = await prisma.volunteerApplication.update({
      where: {
        id: applicationId,
        organizationId: decoded.organizationId
      },
      data: {
        status
      }
    });

    return NextResponse.json(updatedApplication);
  } catch (error) {
    console.error('Error updating volunteer application:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 