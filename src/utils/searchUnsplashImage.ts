import { UnsplashImage } from "@/types";

export const searchUnsplashImage = async (query: string) => {
  try {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      query
    )}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`;
    const res = await fetch(url);

    const rateLimit = res.headers.get("x-ratelimit-limit");
    const rateRemaining = res.headers.get("x-ratelimit-remaining");
    if (!res.ok) {
      console.log("Unsplash Rate Limit:", rateLimit, "Remaining:", rateRemaining);
      return [];
    }

    const data = await res.json();
    // Get the first image's regular URL

    const images: string[] = Array.isArray(data?.results)
      ? data.results
          .map((res: UnsplashImage) => res.urls?.regular)
          .filter(Boolean)
      : [];

    return images.length > 0 ? images : [];
  } catch (err) {
    console.log("Couldn't search images from unsplash.", err);
    return [];
  }
};
