"use client";

import { useCallback, useRef, useState } from "react";

interface PhotoUploaderProps {
  photos: File[];
  onPhotosChange: (photos: File[]) => void;
}

export default function PhotoUploader({
  photos,
  onPhotosChange,
}: PhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      const newFiles = Array.from(files).filter(
        (f) => f.type.startsWith("image/") && f.size <= 10 * 1024 * 1024
      );
      const combined = [...photos, ...newFiles].slice(0, 10);
      onPhotosChange(combined);
    },
    [photos, onPhotosChange]
  );

  const removePhoto = (index: number) => {
    onPhotosChange(photos.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
          isDragging
            ? "border-blue-400 bg-blue-50/80 scale-[1.01]"
            : "border-gray-200 hover:border-blue-300 hover:bg-gray-50/50"
        }`}
      >
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors ${
          isDragging ? "bg-blue-100" : "bg-gray-100"
        }`}>
          <svg
            className={`w-6 h-6 transition-colors ${isDragging ? "text-blue-600" : "text-gray-400"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>
        <p className="text-gray-700 font-medium text-sm">
          <span className="text-blue-600 font-semibold">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-400 mt-1.5">
          JPG, PNG up to 10MB each
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {photos.length > 0 && (
        <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {photos.map((photo, index) => (
            <div key={index} className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
              <img
                src={URL.createObjectURL(photo)}
                alt={`Car photo ${index + 1}`}
                className="w-full h-24 object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all" />
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute top-1.5 right-1.5 w-6 h-6 bg-white/90 backdrop-blur-sm text-gray-600 rounded-lg text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white shadow-sm"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent py-1 px-2">
                <p className="text-white text-[10px] font-medium">{index + 1}/{photos.length}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Progress bar */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full w-32 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                photos.length >= 3 ? "bg-green-500" : "bg-amber-500"
              }`}
              style={{ width: `${Math.min((photos.length / 3) * 100, 100)}%` }}
            />
          </div>
          <span className="text-xs text-gray-500 font-medium">{photos.length}/10</span>
        </div>
        {photos.length < 3 && (
          <span className="text-xs text-amber-600 font-medium flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Min 3 required
          </span>
        )}
        {photos.length >= 3 && (
          <span className="text-xs text-green-600 font-medium flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Ready
          </span>
        )}
      </div>
    </div>
  );
}
