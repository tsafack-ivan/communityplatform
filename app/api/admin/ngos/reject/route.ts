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
      data: { status: 'REJECTED' },
    });
    return NextResponse.json({ message: 'NGO rejected', organization: updated });
  } catch (error) {
    console.error('Error rejecting NGO:', error);
    return NextResponse.json({ error: 'Error rejecting NGO' }, { status: 500 });
  }
} 