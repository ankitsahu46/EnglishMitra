// utils/getUnsplashImageBatch.ts
// "use client";
interface Definition {
  example: string;
  tags?: string[] | null;
}

interface ImageBatchResult {
  sentence: string;
  imageArr: string[];
  tagArr: string[] | null;
}

export async function getUnsplashImageBatch(
  definitions: Definition[]
): Promise<ImageBatchResult[]> {
  try {
    // Run all fetches in parallel
    const results = await Promise.allSettled(
      definitions.map(async (def) => {
        const res = await fetch(`/api/get-image`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sentence: def.example,
            tags:
              Array.isArray(def.tags) && def.tags.length > 0 ? def.tags : [],
          }),
        });

        if (!res.ok) {
          console.error(`Failed to fetch image for: ${def.example}`);
          throw new Error(`Image fetch failed: ${def.example}`);
        }

        const data = await res.json();
        return {
          sentence: def.example,
          imageArr: data.images || [],
          tagArr: data.tags || [],
        };
      })
    );

    // Filter successful ones only
    return results
      .filter((r): r is PromiseFulfilledResult<ImageBatchResult> => r.status === "fulfilled")
      .map((r) => r.value);
  } catch (err) {
    console.error("Error in getUnsplashImageBatch:", err);
    return [];
  }
}
