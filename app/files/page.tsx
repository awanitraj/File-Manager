// app/files/page.tsx
export default function FilesPage() {
    const dummyFiles = ['file1.pdf', 'image.png', 'report.docx'];
  
    return (
      <div className="bg-white shadow p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Your Files</h2>
        <ul className="space-y-2">
          {dummyFiles.map((file, index) => (
            <li key={index} className="p-2 border rounded bg-gray-50 hover:bg-gray-100">
              📄 {file}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  