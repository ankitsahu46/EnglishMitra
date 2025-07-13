import { useCallback, useEffect, useState } from "react";
import { useGetUnsplashImages, useUpdateExpressionImages } from "@/hooks";
import { ContentBlockProps } from "@/types";

export const useEntryImages = ({
  content,
  type,
}: {
  content: ContentBlockProps;
  type: string;
}) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const { example: sentence, tags, images } = content;

  const tagsString = JSON.stringify(tags ?? []);
  const shouldFetch = !images || images?.length === 0;

  const { imageArr, tagArr, error, isLoading } = useGetUnsplashImages({
    sentence,
    tags,
    shouldFetch,
  });

  const activeImages =
    Array.isArray(images) && images?.length > 0 ? images : imageArr;

  useEffect(() => {
    setImageIndex(0);
    setImageError(false);
  }, [sentence, tagsString, images?.length]);

  useUpdateExpressionImages({ content, shouldFetch, imageArr, tagArr, type });

  const handleImageError = () => setImageError(true);

  const handleClick = useCallback(() => {
    if (imageError && imageIndex < activeImages.length - 1) {
      setImageIndex((prev) => prev + 1);
      setImageError(false);
    } else if (imageError || error) {
      window.location.reload();
    }
  }, [error, imageError, activeImages.length, imageIndex]);

  return {
    imageIndex,
    imageError,
    isLoading,
    error,
    activeImages,
    handleClick,
    handleImageError,
  };
};
