import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const organization = await prisma.organization.findUnique({
      where: { id: params.id },
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
            description: true,
            currentAmount: true,
            targetAmount: true,
            status: true,
            startDate: true,
            endDate: true
          }
        }
      }
    });

    if (!organization) {
      return NextResponse.json(
        { error: 'NGO not found' },
        { status: 404 }
      );
    }

    const ngo = {
      id: organization.id,
      name: organization.name,
      description: organization.description,
      email: organization.user.email,
      website: organization.website,
      logo: organization.logo,
      impact: {
        beneficiaries: organization.campaigns.reduce((acc, campaign) => acc + (campaign.currentAmount / campaign.targetAmount) * 100, 0),
        projects: organization.campaigns.length,
        successRate: organization.campaigns.length > 0 
          ? Math.round((organization.campaigns.reduce((acc, campaign) => acc + (campaign.currentAmount / campaign.targetAmount), 0) / organization.campaigns.length) * 100)
          : 0
      },
      currentProjects: organization.campaigns.map(campaign => ({
        name: campaign.title,
        description: campaign.description,
        status: campaign.status.toLowerCase(),
        progress: Math.round((campaign.currentAmount / campaign.targetAmount) * 100)
      }))
    };

    return NextResponse.json(ngo);
  } catch (error) {
    console.error('Error fetching NGO:', error);
    return NextResponse.json(
      { error: 'Error fetching NGO details' },
      { status: 500 }
    );
  }
} 