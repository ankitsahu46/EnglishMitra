import { zWordDataSchema } from "@/schema";
import { enrichDefinitions } from "@/services";
import { StandardExpData, ApiResponse } from "@/types";
import { generateAudio, saveExpression } from "@/utils";
import { formatWordData } from "@/utils/server";

export const fetchWordData = async ({
  entry,
}: {
  entry: string;
}): Promise<ApiResponse<StandardExpData>> => {
  const word = entry.trim().toLowerCase();

  // 1️⃣ Validate input
  if (!word) {
    return {
      success: false,
      data: null,
      error: "Missing word parameter",
      status: 400,
    };
  }

  // 2️⃣ Fetch from dictionary API
  let res;
  try {
    res = await fetch(`${process.env.WORD_API_URL}/${word}`);
    if (!res.ok) {
      console.error("Dictionary API Response error:", res.statusText, word);
      return {
        success: false,
        data: null,
        error: `API status: ${res.status}`,
        status: res.status,
      };
    }
  } catch (error) {
    console.error("Dictionary API error:", error);
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : "Unknown error",
      status: 502,
    };
  }

  const data = await res.json();

  // 3️⃣ Validate response shape
  const parsed = zWordDataSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      data: null,
      error: "Validation Failed",
      status: 400,
    };
  }

  // 4️⃣ Convert to internal schema
  const wordData = formatWordData(parsed.data[0]);
  if (!wordData) {
    console.error("Failed to convert word data!");
    return {
      success: false,
      data: null,
      error: "Conversion failed",
      status: 500,
    };
  }

  // 5️⃣ Generate audio if missing
  if (!wordData.commonData.audio) {
    try {
      const audioUrl = await generateAudio(word);
      wordData.commonData.audio = audioUrl || null;
    } catch (error) {
      console.error("Failed to generate audio:", error);
    }
  }

  // 6️⃣ Enrich definitions
  let enriched: StandardExpData | null = null;
  try {
    const { enriched: enrichedData } = await enrichDefinitions(wordData);
    enriched = enrichedData;
  } catch (error) {
    console.error("Failed to enrich word data!", error);
  }

  // 7️⃣ Save to DB
  await saveExpression({
    type: "word",
    expression: enriched?.commonData?.text || wordData.commonData.text,
    formattedData: enriched || wordData,
  });

  // 8️⃣ Return final response
  return {
    success: true,
    data: enriched,
    error: null,
    status: 200,
  };
};
