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

    // Get donation statistics
    const donationStats = await prisma.donation.aggregate({
      where: {
        campaign: {
          organizationId: decoded.organizationId
        }
      },
      _sum: {
        amount: true
      },
      _count: true
    });

    // Get campaign statistics
    const campaignStats = await prisma.campaign.aggregate({
      where: {
        organizationId: decoded.organizationId
      },
      _count: true
    });

    // Get volunteer statistics
    const volunteerStats = await prisma.volunteerApplication.aggregate({
      where: {
        organizationId: decoded.organizationId
      },
      _count: true
    });

    // Get event statistics
    const eventStats = await prisma.event.aggregate({
      where: {
        organizationId: decoded.organizationId
      },
      _count: true
    });

    const report = {
      donations: {
        totalAmount: donationStats._sum.amount || 0,
        totalDonations: donationStats._count
      },
      campaigns: {
        totalCampaigns: campaignStats._count
      },
      volunteers: {
        totalApplications: volunteerStats._count
      },
      events: {
        totalEvents: eventStats._count
      }
    };

    return NextResponse.json(report);
  } catch (error) {
    console.error('Error generating report:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 