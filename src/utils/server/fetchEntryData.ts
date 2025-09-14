import {
  generateAudio,
  detectExpressionTypeFromApi,
  saveExpression,
} from "@/utils";
import {
  EntryType,
  FetchEntryDataOptions,
  StandardExpData,
  ApiResponse,
  RawEntryData,
} from "@/types";
import { removeExpression, formatEntryData } from "@/utils/server";
import { enrichDefinitions } from "@/services";

export const fetchEntryData = async ({
  entry,
  type,
}: FetchEntryDataOptions): Promise<ApiResponse<StandardExpData>> => {
  const entryKey = normalizeEntry(entry);

  // 1️⃣ Validate input
  if (!entryKey) {
    return {
      success: false,
      data: null,
      error: "Missing entry",
      message: "Entry is required.",
      status: 400,
      suggestions: [],
    };
  }

  // 2️⃣ Check API key
  if (!process.env.DICTIONARY_API_KEY_PV) {
    console.error("Missing dictionary API key.");
    return {
      success: false,
      data: null,
      error: "Missing API key",
      message: "Server misconfiguration.",
      status: 500,
      suggestions: [],
    };
  }

  // 3️⃣ Fetch from API
  let apiData = await fetchFromApi(entryKey);
  if (isSuggestionResponse(apiData)) {
    const baseWord = entryKey.replaceAll(" ", "");
    apiData = await fetchFromApi(baseWord);

    if (isSuggestionResponse(apiData)) {
      if (type) removeExpression(type, entry, entryKey);
      return {
        success: false,
        data: null,
        error: null,
        message: "No data found. Did you mean:",
        status: 404,
        suggestions: apiData as string[],
      };
    }
  }

  // 4️⃣ Detect type
  const detectedType =
    type || (await detectExpressionTypeFromApi(apiData as RawEntryData[], entryKey)) || "idiom";
  const validType: EntryType =
    detectedType === "phrasalVerb" ? "phrasalVerb" : "idiom";

  // 5️⃣ Format data
  const formatted = formatEntryData(apiData as RawEntryData[], entryKey, validType);
  if (!formatted) {
    const suggestions =
      Array.isArray(apiData) && typeof apiData[0] === "string" ? apiData : [];
    return {
      success: false,
      data: null,
      error: "Formatting error",
      message: "Failed to format entry data.",
      status: 500,
      suggestions,
    };
  }

  // 6️⃣ Generate audio if missing
  if (!formatted.commonData.audio) {
    try {
      formatted.commonData.audio =
        (await generateAudio(entryKey, validType)) || null;
    } catch (err) {
      console.error(`Audio generation failed for "${entryKey}":`, err);
    }
  }

  // 7️⃣ Enrich definitions
  let enriched: StandardExpData | null = null;
  try {
    const { enriched: enrichedData } = await enrichDefinitions(formatted);
    enriched = enrichedData;
  } catch (error) {
    console.error("Failed to enrich Entry data!", error);
  }

  // 8️⃣ Save to DB
  await saveExpression({
    type: validType,
    expression: entryKey,
    formattedData: enriched || formatted,
  });

  // 9️⃣ Return response
  return {
    success: true,
    data: enriched,
    error: null,
    message: "Entry fetched and processed successfully.",
    status: 200,
    suggestions: [],
  };
};
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
//.
//.
//.
//.
//.
//.
//.
//.
const normalizeEntry = (entry: string): string =>
  entry.trim().toLowerCase().replace(/\?$/, "");

const isSuggestionResponse = (data: RawEntryData[] | string[] | null | undefined): boolean =>
  Array.isArray(data) && (typeof data[0] === "string" || data.length === 0);

const buildApiUrl = (expression: string) =>
  `https://dictionaryapi.com/api/v3/references/learners/json/${encodeURIComponent(
    expression
  )}?key=${process.env.DICTIONARY_API_KEY_PV}`;

const fetchFromApi = async (expression: string): Promise<RawEntryData[] | string[] | null | undefined> => {
  try {
    const res = await fetch(buildApiUrl(expression));
    if (!res.ok) {
      console.error("Dictionary API call failed:", res.status);
      return [];
    }
    return await res.json();
  } catch (err) {
    console.error("Error fetching data from dictionary API:", err);
    return [];
  }
};
