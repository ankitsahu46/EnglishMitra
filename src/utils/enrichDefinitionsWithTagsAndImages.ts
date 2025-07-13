import { DefinitionsType } from "@/types";
import { generateFromAI, generateImageArrayFromTagsArray } from "@/utils";

export const enrichDefinitionsWithTagsAndImages = async (
  definitions: DefinitionsType[]
) => {
  const examples = definitions.map((def) => def.example || "");
  const prompt = `
Given the following example sentences, generate 3-5 relevant, short, comma-separated tags for each example for image search.These tags should represent the scene, action, or emotion.
Return a JSON array of arrays, where each inner array contains the tags for the corresponding example.

Examples:
${examples.map((ex, i) => `${i + 1}. ${ex}`).join("\n")}
`;

  // Generate tags for all the examples
  const res = await generateFromAI(prompt);

  let tagsArray: string[][] = [];
  try {
    tagsArray = JSON.parse(res || "");
  } catch {
    tagsArray = examples.map(() => []);
  }

  // For each tag array, fetch images (preserving order)
  const imageArray: string[][] = await generateImageArrayFromTagsArray(tagsArray);

  const updatedDefinitions = definitions.map((def, idx) => ({
    ...def,
    tags: Array.isArray(tagsArray[idx])
      ? tagsArray[idx].map((tag) => String(tag).trim()).filter(Boolean)
      : [],
    images: Array.isArray(imageArray[idx]) ? imageArray[idx] : [],
  }));

  return updatedDefinitions;
};
