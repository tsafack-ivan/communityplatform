import { NextResponse } from 'next/server';
import { jwtConfig } from '@/lib/jwt';

export async function GET() {
  try {
    // Test payload
    const testPayload = {
      userId: 'test-user',
      email: 'test@example.com',
      role: 'TEST'
    };

    // Test signing
    const token = jwtConfig.sign(testPayload);
    
    // Test verification
    const verified = jwtConfig.verify(token);

    return NextResponse.json({
      success: true,
      message: 'JWT configuration is working correctly',
      environment: process.env.NODE_ENV,
      jwtSecretExists: !!process.env.JWT_SECRET,
      testToken: token,
      verifiedPayload: verified
    });
  } catch (error) {
    console.error('JWT test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      environment: process.env.NODE_ENV,
      jwtSecretExists: !!process.env.JWT_SECRET
    }, { status: 500 });
  }
} 