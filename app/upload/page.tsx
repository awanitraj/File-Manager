// app/upload/page.tsx
'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function UploadPage() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    // TODO: upload to Firebase
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="border-2 border-dashed border-blue-400 p-10 text-center cursor-pointer bg-white shadow rounded-lg">
      <input {...getInputProps()} />
      {
        isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p>Drag & drop some files here, or click to select files</p>
        )
      }
    </div>
  );
}
