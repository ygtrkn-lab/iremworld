"use client";

import { useState } from "react";
import Image from "next/image";
import ImageViewer from "../ImageViewer";

interface PropertyGalleryProps {
  images: string[];
}

export default function PropertyGallery({ images }: PropertyGalleryProps) {
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setShowImageViewer(true);
  };

  // Return early if no images
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden mb-4 border border-gray-100 shadow-sm">
      <div className="grid grid-cols-4 gap-1 p-1">
        {/* Main large image */}
        <div className="col-span-4 md:col-span-2 lg:col-span-2 relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
          onClick={() => handleImageClick(0)}>
          <Image
            src={images[0]}
            alt="Main property image"
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>

        {/* Grid of smaller images */}
          <div className="col-span-4 md:col-span-2 lg:col-span-2 grid grid-cols-3 gap-2">
            {images.slice(1, 7).map((image, index) => (
              <div
                key={index}
                className="relative aspect-[3/2] rounded-lg overflow-hidden cursor-pointer"
                onClick={() => handleImageClick(index + 1)}
              >
                <Image
                  src={image}
                  alt={`Property image ${index + 2}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
                />
                {index === 5 && images.length > 7 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">
                      +{images.length - 7}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
      </div>

      {/* Image Viewer Modal */}
      {showImageViewer && (
        <ImageViewer
          images={images}
          initialIndex={selectedImageIndex}
          onClose={() => setShowImageViewer(false)}
        />
      )}
    </div>
  );
}
