// components/forms/photos-step.tsx
'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils/cn';

interface PhotosStepProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export function PhotosStep({ images, onChange }: PhotosStepProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');

  async function uploadFile(file: File): Promise<string | null> {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.url as string;
  }

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError('');

    const remaining = 10 - images.length;
    if (remaining <= 0) {
      setError('Maximum 10 photos allowed.');
      return;
    }

    const selected = Array.from(files).slice(0, remaining);
    const invalid = selected.filter((f) => !f.type.startsWith('image/'));
    if (invalid.length > 0) {
      setError('Only image files are allowed.');
      return;
    }

    setUploading(true);
    try {
      const urls = await Promise.all(selected.map(uploadFile));
      const valid = urls.filter(Boolean) as string[];
      onChange([...images, ...valid]);
    } catch {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  }

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      handleFiles(e.dataTransfer.files);
    },
    [images]
  );

  function removeImage(index: number) {
    onChange(images.filter((_, i) => i !== index));
  }

  function moveImage(from: number, to: number) {
    const updated = [...images];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    onChange(updated);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Add photos of your property</h2>
        <p className="text-gray-500 mt-1 text-sm">
          Listings with great photos get 3× more enquiries. Add up to 10 photos.
        </p>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          'relative border-2 border-dashed rounded-2xl p-10 text-center transition-all',
          dragOver
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-gray-200 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-50/30'
        )}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          onChange={(e) => handleFiles(e.target.files)}
          disabled={uploading}
        />
        <div className="pointer-events-none">
          <p className="text-4xl mb-3">📸</p>
          <p className="text-sm font-semibold text-gray-700">
            {uploading ? 'Uploading...' : 'Drag & drop photos here'}
          </p>
          <p className="text-xs text-gray-400 mt-1">or click to browse — JPG, PNG, WEBP up to 10MB</p>
        </div>

        {uploading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-2xl">
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm">
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Uploading photos...
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {/* Photo count indicator */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>{images.length} / 10 photos added</span>
        {images.length > 0 && (
          <span>Drag to reorder • First photo will be the cover</span>
        )}
      </div>

      {/* Image grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((url, index) => (
            <div
              key={url}
              className="relative group aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-100"
            >
              {/* Cover badge */}
              {index === 0 && (
                <span className="absolute top-2 left-2 z-10 px-2 py-0.5 bg-indigo-600 text-white text-xs font-semibold rounded-full">
                  Cover
                </span>
              )}

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`Property photo ${index + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Overlay actions */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {index > 0 && (
                  <button
                    onClick={() => moveImage(index, index - 1)}
                    className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 text-xs font-bold"
                    title="Move left"
                  >
                    ←
                  </button>
                )}
                <button
                  onClick={() => removeImage(index)}
                  className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600"
                  title="Remove"
                >
                  ✕
                </button>
                {index < images.length - 1 && (
                  <button
                    onClick={() => moveImage(index, index + 1)}
                    className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 text-xs font-bold"
                    title="Move right"
                  >
                    →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}