import { fetchFromAI } from "./fetchFromAI";

export async function generateExamplesBulk(
  definitions: string[],
  expression: string,
): Promise<string[]> {
  if (!definitions.length || !expression) return [];

  try {
    const prompt = buildExamplesPrompt(definitions, expression);
    const raw = await fetchFromAI(prompt);

    if (!raw) {
      console.error("AI returned null for examples");
      return definitions.map(() => "");
    }

    const cleaned = raw.replace(/^```json|^```|```$/gim, "").trim();
    const parsed = JSON.parse(cleaned);

    if (Array.isArray(parsed)) {
      return parsed.map((ex) => (typeof ex === "string" ? ex.trim() : ""));
    }
  } catch (err) {
    console.error("AI bulk example generation failed:", err);
  }

  return definitions.map(() => "");
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
//.
//.
//.
function buildExamplesPrompt(definitions: string[], expression: string): string {
  return `
You are a strict JSON generator.
Generate one short, natural-sounding example sentence for each provided definition of the expression "${expression}". Each sentence must clearly demonstrate the meaning of the definition **using** the expression "${expression}" in context.

Rules:
- Output must be a valid JSON array of strings.
- Each string should be a single sentence.
- The expression "${expression}" must appear in each sentence.
- If a definition is idiomatic, figurative, or metaphorical, generate a sentence that reflects that usage naturally.
- You must generate the example, string should not be empty.
- No explanations, no markdown, only JSON.

Example Input:
Expression: "break"
Definitions:
1. to separate into pieces
2. to interrupt or stop something
3. to violate a rule or law
4. to take a short rest
5. to become suddenly successful (idiomatic)

Example Output:
["He always breaks the vase intentionally.","She broke the silence with a loud laugh.","They broke the speed limit on the highway.","Let’s take a break before the next meeting.","The band finally broke into the mainstream after years of struggle."]

Now process these definitions:

${definitions.map((d, i) => `${i + 1}. ${d}`).join("\n")}
  `.trim();
}

