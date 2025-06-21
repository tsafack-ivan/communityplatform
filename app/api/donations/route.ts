import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verify } from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'charity-platform-secure-jwt-secret-key-2024';

// Middleware to verify JWT and optionally check role
function verifyToken(req, roles = []) {
  const auth = req.headers.get('authorization');
  if (!auth) throw new Error('No token provided');
  const token = auth.split(' ')[1];
  const payload = verify(token, JWT_SECRET);
  if (roles.length && !roles.includes(payload.role)) {
    throw new Error('Forbidden');
  }
  return payload;
}

// Create a donation
export async function POST(req) {
  try {
    const payload = verifyToken(req, ['DONOR', 'ADMIN', 'ORGANIZATION']);
    const { amount, message, campaignId } = await req.json();
    if (!amount || !campaignId) {
      return NextResponse.json({ error: 'Amount and campaignId required' }, { status: 400 });
    }
    const donation = await prisma.donation.create({
      data: {
        amount: parseFloat(amount),
        message,
        campaignId,
        userId: payload.userId,
      },
    });
    return NextResponse.json(donation, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Error creating donation' }, { status: 500 });
  }
}

// List all donations (admin/NGO only)
export async function GET(req) {
  try {
    const payload = verifyToken(req, ['ADMIN', 'ORGANIZATION']);
    const donations = await prisma.donation.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        campaign: { select: { id: true, title: true } },
      },
    });
    return NextResponse.json(donations);
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Error fetching donations' }, { status: 500 });
  }
} 