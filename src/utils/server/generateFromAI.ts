import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const DEFAULT_MODEL = "gemini-2.5-flash";

// Global counters (in-memory for now; could use Redis/DB in production)
let requestCount = 0;
let tokenCount = 0;

export async function generateFromAI(
  prompt: string,
  model: string = DEFAULT_MODEL
): Promise<string | null> {
  try {
    requestCount++;

    const response = await retryWithBackoff(() =>
      ai.models.generateContent({
        model,
        contents: prompt,
      })
    );
    // Token metadata (not always available, depends on SDK version)
    const usage = response?.usageMetadata;
    if (usage) {
      tokenCount += usage.totalTokenCount ?? 0;
      console.log(
        `📊 Request #${requestCount} | Prompt: ${usage.promptTokenCount} | ` +
          `Response: ${usage.candidatesTokenCount} | Total so far: ${tokenCount}`
      );
    } else {
      console.log(`📊 Request #${requestCount} | No usage metadata returned`);
    }

    return response.text ?? null;
  } catch (err) {
    console.error("❌ Gemini API error:", err, "Prompt:", prompt);
    return null; // fail gracefully
  }
}


// Retry helper with exponential backoff
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.log("error from retryWithBackoff", err);
    if (retries > 0) {
      console.warn(`⚠️ Rate limited. Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return retryWithBackoff(fn, retries - 1, delay * 2);
    }
    throw err;
  }
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
// import { CohereClient } from "cohere-ai";

// const cohere = new CohereClient({
//   token: process.env.COHERE_API_KEY!,
// });

// export const generateFromAI = async (prompt: string) => {
//   console.log("1")
//   if (!prompt) return null;
//   console.log("2")
//   try {
//     const response = await cohere.generate({
//       model: "command-r-plus",
//       prompt,
//       temperature: 0.7,
//       // maxTokens: 150,
//     });
//     console.log("3")

//     const message = response.generations?.[0]?.text.trim();
//     console.log("response from ai", "message", message);
//     if (!message) {
//       console.warn("Cohere returned no generations.");
//       return null;
//     }
//     return message;
//   } catch (error) {
//     console.error("Error generating from AI 1", error, "Prompt: ", prompt);
//     return null;
//   }
// };
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
// import OpenAI from 'openai';

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export const generateFromAI = async (prompt: string) => {
//   if (!prompt) return null;

//   try {
//     const response = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages: [
//         {
//           role: 'user',
//           content: prompt,
//         },
//       ],
//       temperature: 0.5,
//     });

//     const message = response.choices?.[0]?.message?.content;

//     if (!message) {
//       console.warn("OpenAI returned no generations.");
//       return null;
//     }

//     return message;
//   } catch (error) {
//     console.error("Error generating examples", error);
//     return null;
//   }
// };
