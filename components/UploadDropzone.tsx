'use client';

import React, { useState } from 'react';

export default function UploadDropzone() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setIsUploading(false);

    if (response.ok) {
      setUploadedUrl(data.url);
      alert('File uploaded successfully!');
    } else {
      alert('Upload failed: ' + data.error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4"
      />
      {isUploading && <p>Uploading...</p>}
      {uploadedUrl && (
        <p className="text-green-600 mt-2">
          Uploaded! <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">View File</a>
        </p>
      )}
    </div>
  );
}
