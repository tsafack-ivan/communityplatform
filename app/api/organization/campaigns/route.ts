import { NextResponse } from 'next/server';

export async function GET() {
  // Return an empty array for now so the frontend can use array methods
  return NextResponse.json([]);
}

export async function POST() {
  return NextResponse.json({ message: 'Create organization campaign (placeholder)' });
} 