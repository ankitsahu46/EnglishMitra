import { fetchFromAI } from "@/utils";

export const generateTags = async (sentence: string) => {
  if (!sentence) {
    console.warn("Sentence is empty, skipping generating tags.");
    return [];
  }

  const prompt = `Extract 3 to 4 short and descriptive search tags from the following English sentence. :These tags should represent the scene, action, or emotion\n"${sentence}"`;

  const result = await fetchFromAI(prompt);

  return result
    ? result
        ?.split(/\n|,/)
        .map((t: string) => t.trim().replace(/^[-\d.]*\s*/, ""))
        .filter(Boolean)
    : [];
};
