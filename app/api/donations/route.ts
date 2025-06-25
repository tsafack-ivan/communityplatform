import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verify, JwtPayload } from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'charity-platform-secure-jwt-secret-key-2024';

// Middleware to verify JWT and optionally check role
function verifyToken(req: Request, roles: string[] = []) {
  const auth = req.headers.get('authorization');
  if (!auth) throw new Error('No token provided');
  const token = auth.split(' ')[1];
  const payload = verify(token, JWT_SECRET) as JwtPayload & { role?: string; userId?: string };
  if (roles.length && (!payload.role || !roles.includes(payload.role))) {
    throw new Error('Forbidden');
  }
  return payload;
}

// Create a donation
export async function POST(req: Request) {
  try {
    const payload = verifyToken(req, ['DONOR', 'ADMIN', 'ORGANIZATION']) as { userId: string; role: string };
    const { amount, message, campaignId }: { amount: number | string; message?: string; campaignId: string } = await req.json();
    if (!amount || !campaignId) {
      return NextResponse.json({ error: 'Amount and campaignId required' }, { status: 400 });
    }
    const donation = await prisma.donation.create({
      data: {
        amount: typeof amount === 'string' ? parseFloat(amount) : amount,
        message,
        campaignId: campaignId,
        userId: payload.userId,
      },
    });

    return NextResponse.json(donation, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error creating donation' }, { status: 500 });
  }
}

// List all donations (admin/NGO only)
export async function GET(req: Request) {
  try {
    const payload = verifyToken(req, ['ADMIN', 'ORGANIZATION']);
    const donations = await prisma.donation.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        campaign: { select: { id: true, title: true } },
      },
    });
    return NextResponse.json(donations);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error fetching donations' }, { status: 500 });
  }
} 