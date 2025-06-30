import { useGetUnsplashImagesProps } from "@/types";
import { useMemo } from "react";
import useSWR from "swr";

const fetcher = async (sentence: string, tags?: string[]) => {
  const res = await fetch(`/api/get-image`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sentence, tags: (Array.isArray(tags) && tags.length > 0) ? tags : [] }),
  });

  if (!res.ok) {
    console.log("Failed to fetch images.");
    throw new Error("Failed to fetch image");
  }
  return res.json();
};

export const useGetUnsplashImages = ({
  sentence,
  tags,
  shouldFetch,
}: useGetUnsplashImagesProps) => {
  const tagsString = JSON.stringify(tags ?? "");
  const swrKey = (shouldFetch && sentence) ? ["get-image", sentence, tagsString] : null;

  const { data, error, isLoading } = useSWR(
    swrKey,
    () => fetcher(sentence, tags),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const imageArr: string[] = useMemo(() => data?.images || [], [data]);
  const tagArr: string[] = useMemo(() => data?.tags || [], [data]);

  return { imageArr, tagArr, error, isLoading };
};
