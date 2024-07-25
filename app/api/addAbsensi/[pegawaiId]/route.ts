import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request, { params }: { params: { pegawaiId: string } }) {
  const { pegawaiId } = params;

  if (!pegawaiId) {
    return NextResponse.json({ error: 'pegawaiId must be provided' }, { status: 400 });
  }

  try {
    await db.absensi.create({
      data: {
        pegawaiId: Number(pegawaiId),
        waktuMasuk: new Date(), // Adjust this as needed for your actual time logic
      },
    });

    return NextResponse.json({ message: 'Absensi record added successfully' });
  } catch (error: any) {
    console.error('Error creating absensi record:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}
