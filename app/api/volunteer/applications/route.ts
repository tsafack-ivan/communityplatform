import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { opportunityId, organizationId, name, email } = await request.json();

    // Validate required fields
    if (!opportunityId || !organizationId || !name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Handle sample data (for testing purposes)
    if (opportunityId.startsWith('sample-') || organizationId.startsWith('sample-org-')) {
      return NextResponse.json({
        message: 'Application submitted successfully (Sample)',
        application: {
          id: 'sample-application-' + Date.now(),
          name,
          email,
          status: 'pending',
          opportunityId,
          organizationId,
          appliedAt: new Date().toISOString()
        }
      });
    }

    // Check if the opportunity exists and is open
    const opportunity = await prisma.volunteerOpportunity.findUnique({
      where: { id: opportunityId },
      include: { organization: true }
    });

    if (!opportunity) {
      return NextResponse.json(
        { error: 'Volunteer opportunity not found' },
        { status: 404 }
      );
    }

    if (opportunity.status !== 'OPEN') {
      return NextResponse.json(
        { error: 'This opportunity is no longer accepting applications' },
        { status: 400 }
      );
    }

    // Create the volunteer application
    const application = await prisma.volunteerApplication.create({
      data: {
        name,
        email,
        status: 'pending',
        opportunityId,
        organizationId,
      }
    });

    return NextResponse.json({
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    console.error('Error submitting volunteer application:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
} 