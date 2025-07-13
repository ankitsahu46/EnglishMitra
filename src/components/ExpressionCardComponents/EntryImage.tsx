"use client";

import { Image as EmptyImage, Loader2 } from "lucide-react";
import { ContentBlockProps } from "@/types";
import { useEntryImages } from "@/hooks";
import Image from "next/image";
import React from "react";

const EntryImageComponent = ({
  content,
  type,
}: {
  content: ContentBlockProps;
  type: string;
}) => {
  const {
    imageIndex,
    imageError,
    isLoading,
    error,
    activeImages,
    handleClick,
    handleImageError,
  } = useEntryImages({ content, type });

  return (
    <div
      onClick={handleClick}
      className="border-b lg:border-t max-sm:rounded-lg rounded-l-lg flex justify-center items-center w-full min-h-[300] lg:max-h-[60vh] lg:aspect-square bg-white relative overflow-hidden lg:col-span-2 shadow-sm self-start"
    >
      {isLoading && !error && (
        <Loader2 className="absolute animate-spin duration-[100s] stroke-green-400" />
      )}

      {activeImages.length > 0 && !imageError && activeImages[imageIndex] ? (
        <Image
          src={activeImages[imageIndex]}
          alt="Word visual example"
          className={`object-contain h-full aspect-square animate-zoomIn `}
          width={500}
          height={300}
          onError={handleImageError}
        />
      ) : (
        !isLoading && (
          <div>
            <EmptyImage className="stroke-gray-500/70 w-full" />
            <p className="text-xs font-semibold text-gray-500/70">
              {activeImages.length > 1 && imageIndex < activeImages.length - 1
                ? "Image failed! Click to try next."
                : "Got Error! Try again"}
            </p>
          </div>
        )
      )}
    </div>
  );
};

// Memoizing the component
export const EntryImage = React.memo(
  EntryImageComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.content.example === nextProps.content.example &&
      JSON.stringify(prevProps.type) === JSON.stringify(nextProps.type)
    );
  }
);
