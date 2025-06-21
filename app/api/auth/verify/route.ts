import { NextResponse } from 'next/server';
import { jwtConfig } from '@/lib/jwt';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 400 }
      );
    }

    const decoded = jwtConfig.verify(token) as { role: string };
    
    return NextResponse.json({ 
      valid: true,
      role: decoded.role 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }
} 