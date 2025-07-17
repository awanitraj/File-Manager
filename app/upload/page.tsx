'use client';

import UploadDropzone from '@/components/UploadDropzone';

export default function UploadPage() {
  const handleFilesSelected = (files: File[]) => {
    console.log('Files to upload:', files);
    // TODO: Add Firebase upload logic here
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Upload Files</h1>
      <UploadDropzone onFilesSelected={handleFilesSelected} />
    </div>
  );
}
