import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon, Film } from 'lucide-react';
import { ServiceMedia } from '../../../types/service';

interface MediaUploadProps {
  media: ServiceMedia[];
  onMediaChange: (media: ServiceMedia[]) => void;
}

export function MediaUpload({ media, onMediaChange }: MediaUploadProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const newMedia: ServiceMedia[] = Array.from(files).map(file => ({
      type: file.type.startsWith('image/') ? 'image' : 'video',
      url: URL.createObjectURL(file),
      description: '',
    }));

    onMediaChange([...media, ...newMedia]);
  };

  const removeMedia = (index: number) => {
    const newMedia = media.filter((_, i) => i !== index);
    onMediaChange(newMedia);
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleChange}
          className="hidden"
          id="media-upload"
        />
        <label
          htmlFor="media-upload"
          className="flex flex-col items-center cursor-pointer"
        >
          <Upload className="h-12 w-12 text-gray-400 mb-2" />
          <p className="text-gray-600">
            Drag and drop files here, or click to select files
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Supports images and videos
          </p>
        </label>
      </div>

      {media.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {media.map((item, index) => (
            <div key={index} className="relative group">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100">
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={item.description || ''}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Film className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>
              <button
                onClick={() => removeMedia(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}