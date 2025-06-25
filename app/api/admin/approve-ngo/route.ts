import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { jwtConfig } from '@/lib/jwt';

// Middleware to verify JWT and check admin role
function verifyAdmin(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (!auth) throw new Error('No token provided');
  const token = auth.split(' ')[1];
  const payload = jwtConfig.verify(token) as { role: string };
  if (payload.role !== 'ADMIN') {
    throw new Error('Forbidden');
  }
  return payload;
}

// Approve an NGO
export async function POST(req: NextRequest) {
  try {
    verifyAdmin(req);
    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }
    const user = await prisma.user.update({
      where: { id: userId },
      data: { role: 'ORGANIZATION' },
    });
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error approving NGO' }, { status: 500 });
  }
} 