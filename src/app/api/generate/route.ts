import { fetchFromAI } from "@/utils";
import { cNextResponse } from "@/utils/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body;

    // Validate prompt
    if (!prompt || typeof prompt !== "string") {
      return cNextResponse.json(
        false,
        null,
        "Prompt is required and must be a string",
        400
      );
    }

    // Call AI generator
    const result = await fetchFromAI(prompt);

    if (!result) {
      return cNextResponse.json(false, null, "AI returned no response", 502);
    }

    return cNextResponse.json(true, result);
  } catch (error) {
    console.error("Error in /api/generate:", error, "prompt", prompt);
    return cNextResponse.json(false, null, "Internal server error", 500);
  }
}
