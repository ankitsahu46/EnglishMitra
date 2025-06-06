"use client";

import { Image as EmptyImage, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

function WordExampleImg({ imgSrc }: { imgSrc: string }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleClick = () => {
    if (error) {
      window.location.reload();
    }
  };
  return (
    <div
      onClick={handleClick}
      className="border-b lg:border-t max-sm:rounded-lg rounded-l-lg flex justify-center items-center w-full min-h-40 lg:max-h-[70vh] lg:aspect-square bg-white relative overflow-hidden lg:col-span-2 shadow-sm self-start"
    >
      {loading && !error && (
        <Loader2 className="absolute animate-spin duration-[100s] stroke-green-400" />
      )}

      {!error ? (
        <Image
          src={imgSrc}
          alt="Word visual example"
          className={`object-contain w-full aspect-square transition-opacity duration-300 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
          width={500}
          height={300}
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
        />
      ) : (
        <div>
        
        <EmptyImage className="stroke-gray-500/70 w-full" />
        <p className="text-xs font-semibold text-gray-500/70">Got Error! Try again</p>
        </div>
      )}
    </div>
  );
}

export default WordExampleImg;
