import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const organizations = await prisma.organization.findMany({
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
    console.error('Error fetching NGOs:', error);
    return NextResponse.json(
      { error: 'Error fetching NGOs' },
      { status: 500 }
    );
  }
} 