'use client';

import React, { useEffect, useState } from 'react';
import UploadDropzone from '@/components/UploadDropzone';
import FileCard from '@/components/FileCard';
import AuthButtons from "@/components/AuthButtons";
import { useSession } from "next-auth/react";
import axios from 'axios';

export default function HomePage() {
  const { data: session, status } = useSession();
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      if (!session?.user?.email) return;

      try {
        const res = await axios.get(`/api/files?email=${session.user.email}`);
        setFiles(res.data.files);
      } catch (err) {
        console.error("Failed to fetch files:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [session]);

  if (status === 'loading') return <div className="text-center py-10">Loading...</div>;

  if (!session) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-semibold">Please sign in to manage files</h2>
        <AuthButtons />
      </div>
    );
  }

  return (
    <main className="px-4 md:px-8 py-10 max-w-6xl mx-auto">
      {/* Welcome Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Welcome, {session.user?.name || session.user?.email}
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
          Securely upload, view, and manage all your files.
        </p>
      </div>

      {/* Upload Section */}
      <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 md:p-8 transition-colors duration-300">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Upload Files
        </h2>
        <UploadDropzone onUploadSuccess={() => {
          setLoading(true);
          axios.get(`/api/files?email=${session.user?.email}`)
            .then(res => setFiles(res.data.files))
            .finally(() => setLoading(false));
        }} />
      </section>

      {/* File List Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          Your Files
        </h2>
        {loading ? (
          <p className="text-gray-500 dark:text-gray-400">Loading files...</p>
        ) : files.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {files.map((file, idx) => (
              <FileCard key={idx} file={file} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No files uploaded yet.
          </p>
        )}
      </section>
    </main>
  );
}
