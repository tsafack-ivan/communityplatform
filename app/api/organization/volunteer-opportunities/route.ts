import { NextResponse, NextRequest } from 'next/server';
import { jwtConfig } from '@/lib/jwt';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = req.headers.get('authorization');
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

    // Get volunteer opportunities for this organization
    const opportunities = await prisma.volunteerOpportunity.findMany({
      where: {
        organizationId: organization.id
      },
      include: {
        applications: {
          select: {
            id: true,
            name: true,
            email: true,
            status: true,
            appliedAt: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(opportunities);
  } catch (error) {
    console.error('Error fetching volunteer opportunities:', error);
    return NextResponse.json(
      { error: 'Error fetching volunteer opportunities' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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

    // Get the request body
    const { title, description, date, location, requiredSkills } = await request.json();

    // Validate required fields
    if (!title || !description || !date || !location || !requiredSkills) {
      return NextResponse.json(
        { error: 'Title, description, date, location, and required skills are required' },
        { status: 400 }
      );
    }

    // Create the volunteer opportunity
    const opportunity = await prisma.volunteerOpportunity.create({
      data: {
        title,
        description,
        date: new Date(date),
        location,
        requiredSkills: Array.isArray(requiredSkills) ? requiredSkills : [requiredSkills],
        organizationId: organization.id
      }
    });

    return NextResponse.json(opportunity);
  } catch (error) {
    console.error('Error creating volunteer opportunity:', error);
    return NextResponse.json(
      { error: 'Failed to create volunteer opportunity' },
      { status: 500 }
    );
  }
} 