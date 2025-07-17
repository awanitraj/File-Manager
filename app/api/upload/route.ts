// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { bucket, db } from '@/lib/firebaseClient';
import { v4 as uuidv4 } from 'uuid';
import { IncomingForm } from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const form = new IncomingForm();
  form.uploadDir = '/tmp';
  form.keepExtensions = true;

  return new Promise((resolve, reject) => {
    form.parse(req as any, async (err, fields, files: any) => {
      if (err) return reject(NextResponse.json({ error: 'Upload error' }));

      const file = files.file[0];
      const filename = `${uuidv4()}_${file.originalFilename}`;
      const storageFile = bucket.file(filename);

      await storageFile.save(fs.readFileSync(file.filepath));
      await storageFile.makePublic();

      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
      const docRef = await db.collection('files').add({
        name: file.originalFilename,
        url: publicUrl,
        createdAt: new Date(),
      });

      resolve(NextResponse.json({ id: docRef.id, name: file.originalFilename, url: publicUrl }));
    });
  });
}
