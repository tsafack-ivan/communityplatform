import { NextResponse, NextRequest } from 'next/server';
import { jwtConfig } from '@/lib/jwt';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const campaigns = await prisma.campaign.findMany({
      where: { 
        status: 'ACTIVE',
        organization: {
          status: 'APPROVED'
        }
      },
      include: {
        organization: {
          select: {
            id: true,
            name: true,
            description: true,
            logo: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const formattedCampaigns = campaigns.map(campaign => ({
      id: campaign.id,
      title: campaign.title,
      description: campaign.description,
      goal: campaign.targetAmount,
      raised: campaign.currentAmount,
      category: 'Charity', // You can add a category field to the Campaign model if needed
      image: campaign.image || '/images/charity-background.png',
      ngo: campaign.organization.name,
      ngoId: campaign.organization.id,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      progress: Math.round((campaign.currentAmount / campaign.targetAmount) * 100)
    }));

    return NextResponse.json(formattedCampaigns);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return NextResponse.json(
      { error: 'Error fetching campaigns' },
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