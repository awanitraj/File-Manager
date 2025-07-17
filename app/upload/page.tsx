import UploadDropzone from '@/components/UploadDropzone';

export default function UploadPage() {
  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Upload Your File</h2>
      <UploadDropzone />
    </div>
  );
}
