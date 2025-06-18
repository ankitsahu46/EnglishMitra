import { generateFromAI } from "@/utils";

export const generateAIExample = async (prompt: string) => {
  let message = await generateFromAI(prompt);

  if (!message) return null;
  message = message.replace(/^```json|^```|```$/gim, "").trim(); //for cohere

  try {
    // const parsed = JSON.parse(message || "{}");
    const parsed = JSON.parse(message);
    return parsed?.example ?? null;
  } catch (error) {
    console.error("Parse error:", error, "Rew message: ", message);
    return null;
  }
};
