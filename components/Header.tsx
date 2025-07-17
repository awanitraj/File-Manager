'use client';

import { motion } from 'framer-motion';

export const Header = () => {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full px-6 py-4 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-md z-10"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          File Manager
        </h1>

        <p className="text-sm text-gray-700 dark:text-gray-300">
          Secure & Smart Cloud Storage
        </p>
      </div>
    </motion.header>
  );
};
