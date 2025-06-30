import { ContentBlockProps } from "@/types";
// import { updateExpressionImagesInDB } from "@/utils";
import { useEffect, useRef } from "react";

export interface useUpdateExpressionImagesProps {
  content: ContentBlockProps;
  shouldFetch: boolean;
  imageArr: string[];
  tagArr: string[];
  type: string;
}

export const useUpdateExpressionImages = ({
  content,
  shouldFetch,
  imageArr,
  tagArr,
  type,
}: useUpdateExpressionImagesProps) => {
  const { text: expression, example: sentence, images } = content;

  const hasUpdated = useRef(false);

  useEffect(() => {
    if (
      !hasUpdated.current &&
      expression &&
      sentence &&
      shouldFetch &&
      imageArr &&
      imageArr.length > 0 &&
      (!images || images.length === 0)
    ) {
      const cacheImagesToDB = async () => {
        try {
          const res = await fetch(`/api/cache-example-image`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ expression, sentence, type, imageArr, tagArr
             }),
          });
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          const data = await res.json();
          hasUpdated.current = true;
          console.log("data from updupdateExpressionImagesInDB", data);
        } catch (error) {
          console.error("Error updating expression images in DB:", error);
        }
        // try {
        //   await updateExpressionImagesInDB({
        //     expression,
        //     sentence,
        //     type,
        //     images: imageArr,
        //   });
        // } catch (err) {
        //   console.error("Failed to cache images in DB:", err);
        // }
      };
      cacheImagesToDB();
    }
  }, [expression, sentence, type, shouldFetch, imageArr, images, tagArr]);
};
