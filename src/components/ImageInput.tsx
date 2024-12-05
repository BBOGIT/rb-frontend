import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface ImageInputProps {
  url: string;
  setUrl: (url: string) => void;
  file: File | null;
  setFile: (file: File | null) => void;
}

export function ImageInput({ url, setUrl, file, setFile }: ImageInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUrl('');
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4 mb-6">
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
          Website URL
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onChange={handleUrlChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter website URL..."
        />
      </div>

      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Or Upload Screenshot
        </label>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-2 text-gray-500" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 800x400px)</p>
            </div>
            <input
              id="file-upload"
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>
        {file && (
          <p className="mt-2 text-sm text-gray-600">
            Selected file: {file.name}
          </p>
        )}
      </div>
    </div>
  );
}