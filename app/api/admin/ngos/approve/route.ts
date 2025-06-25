import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'NGO id is required' }, { status: 400 });
    }
    const updated = await prisma.organization.update({
      where: { id },
      data: { status: 'APPROVED' },
    });
    return NextResponse.json({ message: 'NGO approved', organization: updated });
  } catch (error) {
    console.error('Error approving NGO:', error);
    return NextResponse.json({ error: 'Error approving NGO' }, { status: 500 });
  }
} 