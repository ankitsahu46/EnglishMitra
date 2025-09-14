interface FetcherResponse {
  tags: string[];
  images: string[];
}

export const fetchImages = async (
  sentence: string,
  tags?: string[]
): Promise<FetcherResponse> => {
  try {
     if (!sentence || sentence.trim().length === 0) {
      console.warn("⚠️ Sentence is empty, skipping fetch.");
      return { tags: [], images: [] };
    }
    
    const baseUrl = process.env.NEXT_LOCAL_URL || "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/get-image`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sentence,
        tags: Array.isArray(tags) && tags.length > 0 ? tags : undefined,
      }),
    });

    if (!response.ok) {
      throw new Error(`Image API failed with ${response.status}`);
    }
    return response.json();
  } catch (err) {
    console.error("Something went wrong while fetching images", err);
    return { tags: [], images: [] }; // fail gracefully
  }
};
