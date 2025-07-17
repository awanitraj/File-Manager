'use client'

import { Home, Upload, Settings } from 'lucide-react'

export function Sidebar() {
  return (
    <aside className="w-60 bg-muted text-muted-foreground p-4 hidden md:block border-r">
      <h2 className="text-xl font-bold mb-6">File Manager</h2>
      <nav className="space-y-4">
        <a href="#" className="flex items-center gap-2 hover:text-primary">
          <Home size={20} /> Dashboard
        </a>
        <a href="#" className="flex items-center gap-2 hover:text-primary">
          <Upload size={20} /> Upload Files
        </a>
        <a href="#" className="flex items-center gap-2 hover:text-primary">
          <Settings size={20} /> Settings
        </a>
      </nav>
    </aside>
  )
}
