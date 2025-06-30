import { searchUnsplashImage } from "@/utils";

export const generateImageArrayFromTagsArray = async ( tagsArray: string[][] ) => {
  const imageArray: string[][] = await Promise.all(
    tagsArray.map(async (tags: string[]) => {
      const query = tags.join(" ");
      const images =
        query && tags.length > 0
          ? (await searchUnsplashImage(query))?.slice(0, 3) || []
          : [];

      return images;
    })
  );
  return imageArray;
}