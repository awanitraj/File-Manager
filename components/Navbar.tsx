'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Avoid hydration mismatch
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
            <Image src="/logo.svg" alt="File Manager" width={30} height={30} />
            FileManager
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition">Home</Link>
            <Link href="/upload" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition">Upload</Link>
            <Link href="/files" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition">My Files</Link>
          </div>

          {/* User + Theme Toggle */}
          <div className="flex items-center gap-4">
            {/* Avatar placeholder */}
            <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600" />

            {/* Dark Mode Toggle */}
            {mounted && (
              <button
                className="text-gray-700 dark:text-gray-200"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-gray-700 dark:text-gray-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 space-y-2 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <Link href="/" className="block text-gray-700 dark:text-gray-200 hover:text-blue-600">Home</Link>
          <Link href="/upload" className="block text-gray-700 dark:text-gray-200 hover:text-blue-600">Upload</Link>
          <Link href="/files" className="block text-gray-700 dark:text-gray-200 hover:text-blue-600">My Files</Link>
        </div>
      )}
    </nav>
  );
}
