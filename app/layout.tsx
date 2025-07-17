// app/layout.tsx
import './globals.css'; // ✅ important
import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'File Manager',
  description: 'A simple file manager app with Firebase',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <Navbar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
