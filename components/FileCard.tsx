// components/FileCard.tsx
'use client';

type FileCardProps = {
  name: string;
  onDelete?: () => void;
  onDownload?: () => void;
};

export default function FileCard({ name, onDelete, onDownload }: FileCardProps) {
  return (
    <div className="flex items-center justify-between border p-3 rounded-lg bg-gray-50 hover:bg-gray-100">
      <span className="text-gray-800 truncate max-w-[60%]">📄 {name}</span>
      <div className="flex gap-2">
        <button onClick={onDownload} className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
          Download
        </button>
        <button onClick={onDelete} className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
          Delete
        </button>
      </div>
    </div>
  );
}
