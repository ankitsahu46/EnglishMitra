import { generateFromAI } from "./generateFromAI";

export const generateTags = async (sentence: string) => {
  const prompt = `Extract 3 to 4 short and descriptive search tags from the following English sentence. :These tags should represent the scene, action, or emotion\n"${sentence}"`;

  const result = await generateFromAI(prompt);

  return result
    ? result
        ?.split(/\n|,/)
        .map((t) => t.trim().replace(/^[-\d.]*\s*/, ""))
        .filter(Boolean)
    : [];
};