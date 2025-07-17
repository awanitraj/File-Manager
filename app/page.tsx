// app/page.tsx
'use client';

import React from 'react';
import UploadDropzone from '@/components/UploadDropzone';
import FileCard from '@/components/FileCard';

export default function HomePage() {
  // Dummy data for demonstration
  const files = [
    {
      name: 'Resume.pdf',
      size: '120KB',
      type: 'PDF Document',
      url: '#'
    },
    {
      name: 'ProfilePic.jpg',
      size: '400KB',
      type: 'Image',
      url: '#'
    }
  ];

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Upload Files</h1>
      <UploadDropzone />

      <h2 className="text-2xl font-semibold mt-10 mb-4">Your Files</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {files.map((file, idx) => (
          <FileCard key={idx} file={file} />
        ))}
      </div>
    </main>
  );
}
