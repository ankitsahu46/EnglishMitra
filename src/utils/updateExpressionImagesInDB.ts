import { updateExpressionImagesInDBProps } from "@/types";

export const updateExpressionImagesInDB = async ({
  expression,
  sentence,
  type,
  images = [],
}: updateExpressionImagesInDBProps) => {
  if (
    !expression ||
    !sentence ||
    !type ||
    !Array.isArray(images) ||
    !(images.length > 0)
  )
    return;

  try {
    const res = await fetch(`/cache-example-image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ expression, sentence, type, images }),
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
  } catch (error) {
    console.error("Error updating expression images in DB:", error);
  }
};