import { NextResponse, NextRequest } from 'next/server';
import { verifyToken } from '@/lib/middleware';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    let decoded;
    try {
      decoded = verifyToken(req, ['ORGANIZATION', 'ADMIN']);
    } catch (err) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const events = await prisma.event.findMany({
      where: {
        organizationId: decoded.organizationId
      },
      include: {
        attendees: true
      },
      orderBy: {
        date: 'asc'
      }
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let decoded;
    try {
      decoded = verifyToken(req, ['ORGANIZATION', 'ADMIN']);
    } catch (err) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description, date, location, maxAttendees } = await req.json();

    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        location,
        maxAttendees,
        organizationId: decoded.organizationId
      }
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 