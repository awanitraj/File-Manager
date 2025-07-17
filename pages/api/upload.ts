import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';
import fs from 'fs';

// Disable body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized. Please login." });
  }

  const userId = session.user?.email || session.user?.id;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new formidable.IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err || !files.file) {
      return res.status(400).json({ error: 'File upload failed' });
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    try {
      const result = await cloudinary.uploader.upload(file.filepath, {
        folder: `file-manager/${userId}`,
        resource_type: 'auto',
      });

      fs.unlinkSync(file.filepath);

      res.status(200).json({
        url: result.secure_url,
        public_id: result.public_id,
        original_filename: result.original_filename,
        userId,
      });
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      res.status(500).json({ error: 'Cloudinary upload failed' });
    }
  });
}
