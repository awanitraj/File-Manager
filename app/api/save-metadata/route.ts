import { NextRequest, NextResponse } from 'next/server';
import { adminFirestore } from '@/lib/firebaseAdmin';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fileUrl, filename } = body;

    await adminFirestore.collection('uploads').add({
      filename,
      fileUrl,
      timestamp: new Date(),
    });

    return NextResponse.json({ message: 'Saved' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
