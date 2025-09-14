"use client";

import Image from "next/image";
import { Image as EmptyImage, Loader2 } from "lucide-react";
import { useEntryImage } from "@/hooks";

export const EntryImage = ({
  images,
  idx,
}: {
  images: string[];
  idx: number;
}) => {
  const {
    currentIndex,
    status,
    refreshKey,
    handleImageLoad,
    handleImageError,
    handleRefresh,
  } = useEntryImage(images);

  return (
    <div
      key={refreshKey}
      onClick={handleRefresh}
      className="border-b lg:border-t max-sm:rounded-lg rounded-l-lg flex justify-center items-center w-full min-h-[400] md:max-h-[30vh] lg:max-h-[60vh] md:aspect-square bg-white relative overflow-hidden lg:col-span-2 shadow-sm self-start"
      role="img"
      aria-label="Image container"
    >
      {status === "loading" && (
        <Loader2 className="absolute animate-spin stroke-green-400" />
      )}
      {images[currentIndex] && (
        <Image
          src={images[currentIndex]}
          alt="Loaded content"
          width={500}
          height={300}
          style={{ width: "auto" }}
          // className={`object-contain h-full aspect-square animate-zoomIn`}
          // className={`rounded-2xl object-cover transition-all duration-700 ease-in-out ${
          className={`object-contain transition-all duration-700 ${
            status === "success"
              ? "opacity-100 scale-100"
              : "opacity-0 scale-75"
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          priority={idx === 0}
        />
      )}

      {status === "error" && (
        <div className="p-5">
          <EmptyImage className="stroke-gray-500/70 w-full h-8 mb-2 cursor pointer" />
          <p className="text-xs font-semibold text-gray-500/70">
            {images.length > 1 && currentIndex < images.length - 1
              ? "Image failed! Click to try next."
              : "Got Error! Try again"}
          </p>
        </div>
      )}
    </div>
  );
};
