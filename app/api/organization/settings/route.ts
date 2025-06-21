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

    const organization = await prisma.organization.findUnique({
      where: {
        id: decoded.organizationId
      },
      select: {
        name: true,
        email: true,
        phone: true,
        address: true,
        description: true,
        website: true,
        logo: true
      }
    });

    return NextResponse.json(organization);
  } catch (error) {
    console.error('Error fetching organization settings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    let decoded;
    try {
      decoded = verifyToken(req, ['ORGANIZATION', 'ADMIN']);
    } catch (err) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, email, phone, address, description, website, logo } = await req.json();

    const updatedOrganization = await prisma.organization.update({
      where: {
        id: decoded.organizationId
      },
      data: {
        name,
        email,
        phone,
        address,
        description,
        website,
        logo
      }
    });

    return NextResponse.json(updatedOrganization);
  } catch (error) {
    console.error('Error updating organization settings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 