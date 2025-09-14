import { fetchFromAI } from "./fetchFromAI";

export async function generateTagsBulk(
  sentences: string[]
): Promise<string[][]> {
  if (!sentences.length) return [];

  try {
    const prompt = buildTagsPrompt(sentences);
    const raw = await fetchFromAI(prompt);

    if (!raw) {
      console.error("AI returned null for tags");
      return sentences.map(() => []);
    }

    const cleaned = raw.replace(/^```json|^```|```$/gim, "").trim();
    const parsed = JSON.parse(cleaned);

    if (Array.isArray(parsed)) {
      return parsed.map((arr, idx) => {
        if (!sentences[idx]?.trim()) return []; // No example → no tags
        return Array.isArray(arr)
          ? arr.filter((t) => typeof t === "string" && t.trim().length > 0)
          : [];
      });
    }
  } catch (err) {
    console.error("AI bulk tag generation failed:", err);
  }

  return sentences.map(() => []);
}
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
function buildTagsPrompt(sentences: string[]): string {
  return `
You are a strict JSON generator.
Generate descriptive tags for each provided sentence.

Rules:
- Output must be a valid JSON array of arrays.
- Each inner array should contain 3–4 short, lowercase, descriptive tags.
- If the sentence is empty or invalid, return an empty array [] for that position.
- No explanations, no markdown, only JSON.

Example Input:
1. He runs faster than anyone else.
2. The cat is sleeping on the sofa.
3. 

Example Output:
[["running","speed","competition"],["cat","sleeping","sofa"],[]]

Now process these sentences:

${sentences.map((s, i) => `${i + 1}. ${s}`).join("\n")}
  `.trim();
}
