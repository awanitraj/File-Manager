// components/UploadDropzone.tsx
'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

type UploadDropzoneProps = {
  onFilesSelected: (files: File[]) => void;
};

export default function UploadDropzone({ onFilesSelected }: UploadDropzoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFilesSelected(acceptedFiles);
  }, [onFilesSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="cursor-pointer border-2 border-dashed border-blue-500 p-10 text-center rounded-lg bg-white shadow-md transition hover:bg-blue-50"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-blue-700 font-semibold">Drop the files here...</p>
      ) : (
        <p className="text-gray-600">Drag and drop files here, or click to select files</p>
      )}
    </div>
  );
}
