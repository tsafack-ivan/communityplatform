import { NextResponse } from 'next/server';
import { jwtConfig } from '@/lib/jwt';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwtConfig.verify(token) as { userId: string };
    const campaign = await prisma.campaign.findUnique({
      where: { id: params.id },
    });
    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }
    // Optionally, check if the user is allowed to view/edit this campaign
    return NextResponse.json(campaign);
  } catch (error) {
    console.error('Error fetching campaign:', error);
    return NextResponse.json({ error: 'Failed to fetch campaign' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwtConfig.verify(token) as { userId: string };
    const { title, description, targetAmount, endDate, image } = await request.json();
    const campaign = await prisma.campaign.findUnique({ where: { id: params.id } });
    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }
    // Optionally, check if the user is allowed to edit this campaign
    const updated = await prisma.campaign.update({
      where: { id: params.id },
      data: {
        title,
        description,
        targetAmount,
        endDate: new Date(endDate),
        image,
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating campaign:', error);
    return NextResponse.json({ error: 'Failed to update campaign' }, { status: 500 });
  }
} 