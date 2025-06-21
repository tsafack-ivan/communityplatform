import { NextResponse } from 'next/server';
import { jwtConfig } from '@/lib/jwt';
import prisma from '@/lib/prisma';

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

    // Get campaigns for the organization
    const campaigns = await prisma.campaign.findMany({
      where: {
        organizationId: organization.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(campaigns);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return NextResponse.json(
      { error: 'Failed to fetch campaigns' },
      { status: 500 }
    );
  }
}

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
    const { title, description, targetAmount, endDate, image } = await request.json();

    // Validate required fields
    if (!title || !description || !targetAmount || !endDate) {
      return NextResponse.json(
        { error: 'Title, description, target amount, and end date are required' },
        { status: 400 }
      );
    }

    // Create the campaign
    const campaign = await prisma.campaign.create({
      data: {
        title,
        description,
        targetAmount,
        endDate: new Date(endDate),
        image,
        organizationId: organization.id,
        userId: decoded.userId
      }
    });

    return NextResponse.json(campaign);
  } catch (error) {
    console.error('Error creating campaign:', error);
    return NextResponse.json(
      { error: 'Failed to create campaign' },
      { status: 500 }
    );
  }
}

// Update a campaign
export async function PUT(req) {
  try {
    const payload = verifyToken(req);
    const { id, title, description, targetAmount, endDate, image, organizationId } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'Campaign ID required' }, { status: 400 });
    }
    const campaign = await prisma.campaign.findUnique({ where: { id } });
    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }
    if (campaign.userId !== payload.userId && payload.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    const updatedCampaign = await prisma.campaign.update({
      where: { id },
      data: {
        title,
        description,
        targetAmount,
        endDate: endDate ? new Date(endDate) : undefined,
        image,
        organizationId,
      },
      include: {
        organization: true,
        user: { select: { id: true, name: true, email: true } },
      },
    });
    return NextResponse.json(updatedCampaign);
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Error updating campaign' }, { status: 500 });
  }
}

// Delete a campaign
export async function DELETE(req) {
  try {
    const payload = verifyToken(req);
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'Campaign ID required' }, { status: 400 });
    }
    const campaign = await prisma.campaign.findUnique({ where: { id } });
    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }
    if (campaign.userId !== payload.userId && payload.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    await prisma.campaign.delete({ where: { id } });
    return NextResponse.json({ message: 'Campaign deleted' });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Error deleting campaign' }, { status: 500 });
  }
} 