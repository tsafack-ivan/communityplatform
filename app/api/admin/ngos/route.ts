import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const organizations = await prisma.organization.findMany({
      where: { status: 'PENDING' },
      include: {
        user: {
          select: {
            email: true,
            name: true
          }
        },
        campaigns: {
          select: {
            id: true,
            title: true,
            currentAmount: true,
            targetAmount: true
          }
        }
      }
    });

    const ngos = organizations.map(org => ({
      id: org.id,
      name: org.name,
      description: org.description,
      email: org.user.email,
      website: org.website,
      logo: org.logo,
      createdAt: org.createdAt,
      status: org.status,
      impact: {
        beneficiaries: org.campaigns.reduce((acc, campaign) => acc + (campaign.currentAmount / campaign.targetAmount) * 100, 0),
        projects: org.campaigns.length,
        successRate: org.campaigns.length > 0 
          ? Math.round((org.campaigns.reduce((acc, campaign) => acc + (campaign.currentAmount / campaign.targetAmount), 0) / org.campaigns.length) * 100)
          : 0
      }
    }));

    return NextResponse.json(ngos);
  } catch (error) {
    console.error('Error fetching pending NGOs:', error);
    return NextResponse.json(
      { error: 'Error fetching pending NGOs' },
      { status: 500 }
    );
  }
} 