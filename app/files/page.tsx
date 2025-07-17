import { db } from '@/lib/firebaseClient';

export const dynamic = 'force-dynamic';

export default async function FilesPage() {
  const snapshot = await db.collection('files').orderBy('createdAt', 'desc').get();
  const files = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Uploaded Files</h2>
      <ul className="space-y-2">
        {files.map((file: any) => (
          <li
            key={file.id}
            className="border rounded p-3 bg-white dark:bg-gray-800 hover:shadow transition"
          >
            <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400">
              {file.name}
            </a>
            <p className="text-sm text-gray-500">{new Date(file.createdAt._seconds * 1000).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
