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

    // Get analytics data
    const [totalDonations, totalCampaigns, totalDonors] = await Promise.all([
      // Total donations
      prisma.donation.aggregate({
        where: {
          campaign: {
            organizationId: organization.id
          }
        },
        _sum: {
          amount: true
        }
      }),
      // Total campaigns
      prisma.campaign.count({
        where: {
          organizationId: organization.id
        }
      }),
      // Total unique donors
      prisma.donation.groupBy({
        by: ['userId'],
        where: {
          campaign: {
            organizationId: organization.id
          }
        },
        _count: true
      })
    ]);

    return NextResponse.json({
      totalDonations: totalDonations._sum.amount || 0,
      totalCampaigns,
      totalDonors: totalDonors.length
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
} 