import { NextResponse } from 'next/server';
import { jwtConfig } from '@/lib/jwt';
import prisma from '@/lib/prisma';

// Middleware to verify JWT token
const verifyToken = (req: Request) => {
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) {
    throw new Error('No token provided');
  }
  return jwtConfig.verify(token) as { userId: string };
};

// Create organization
export async function POST(request: Request) {
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

    // Get the request body
    const { name, description, website } = await request.json();

    // Validate required fields
    if (!name || !description) {
      return NextResponse.json(
        { error: 'Name and description are required' },
        { status: 400 }
      );
    }

    // Check if user already has an organization
    const existingOrganization = await prisma.organization.findFirst({
      where: {
        userId: decoded.userId
      }
    });

    if (existingOrganization) {
      return NextResponse.json(
        { error: 'User already has an organization' },
        { status: 400 }
      );
    }

    // Create the organization
    const organization = await prisma.organization.create({
      data: {
        name,
        description,
        website,
        userId: decoded.userId
      }
    });

    return NextResponse.json(organization);
  } catch (error) {
    console.error('Error creating organization:', error);
    return NextResponse.json(
      { error: 'Failed to create organization' },
      { status: 500 }
    );
  }
}

// Get organization
export async function GET(request: Request) {
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
    console.error('Error fetching organization:', error);
    return NextResponse.json(
      { error: 'Failed to fetch organization' },
      { status: 500 }
    );
  }
}

// Update organization
export async function PUT(req: Request) {
  try {
    const payload = verifyToken(req);
    const { name, description, website } = await req.json();

    // Validate required fields
    if (!name || !description) {
      return NextResponse.json(
        { error: 'Name and description are required' },
        { status: 400 }
      );
    }

    const organization = await prisma.organization.findFirst({
      where: { userId: payload.userId },
    });

    if (!organization) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 404 }
      );
    }

    const updatedOrg = await prisma.organization.update({
      where: { id: organization.id },
      data: {
        name,
        description,
        website,
      },
    });

    return NextResponse.json(updatedOrg);
  } catch (error) {
    console.error('Error updating organization:', error);
    return NextResponse.json(
      { error: 'Error updating organization' },
      { status: 500 }
    );
  }
} 