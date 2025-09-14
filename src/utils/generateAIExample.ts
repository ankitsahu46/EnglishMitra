import { fetchFromAI } from "@/utils";

export const generateAIExample = async (prompt: string) => {
  let message = await fetchFromAI(prompt);

  if (!message) return null;
  console.log("message from generateAIExample", message);
  message = message.replace(/^```json|^```|```$/gim, "").trim(); //for cohere
  console.log("message from generateAIExample 2", message);

  try {
    const parsed = JSON.parse(message);
    return parsed?.example ?? null;
  } catch (error) {
    console.error("Parse error:", error, "Rew message: ", message);
    return null;
  }
};
