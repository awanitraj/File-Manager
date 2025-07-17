// app/layout.tsx

import '@/app/globals.css'; // Import global styles
import Navbar from '@/components/Navbar'; // Import Navbar component
import styles from './page.module.css';

export const metadata = {
  title: 'File Manager',
  description: 'Upload, manage, and download your files with ease.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 font-sans">
        <Navbar /> {/* ✅ Shared Navbar */}
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
