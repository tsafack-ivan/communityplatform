import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verify } from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'charity-platform-secure-jwt-secret-key-2024';

// Middleware to verify JWT and check admin role
function verifyAdmin(req) {
  const auth = req.headers.get('authorization');
  if (!auth) throw new Error('No token provided');
  const token = auth.split(' ')[1];
  const payload = verify(token, JWT_SECRET);
  if (payload.role !== 'ADMIN') {
    throw new Error('Forbidden');
  }
  return payload;
}

// Approve an NGO
export async function POST(req) {
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
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Error approving NGO' }, { status: 500 });
  }
} 