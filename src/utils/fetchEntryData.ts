import { Idiom, OfTheDayList, PhrasalVerb } from "@/models";
import { capitalizeFirstLetter } from "./capitalizeFirstLetter";
import {
  // detectExpressionType,
  generateAudio,
  convertToEntrySchemaFormat,
  detectExpressionTypeFromApi,
} from "@/utils";
import { EntryType } from "@/types";

interface FetchEntryDataOptions {
  entry: string;
  type?: "phrasalVerb" | "idiom";
  model?: typeof PhrasalVerb | typeof Idiom;
}

export const fetchEntryData = async ({
  entry,
  type,
  model,
}: FetchEntryDataOptions) => {
  const entryKey = entry.trim().toLowerCase().replace(/\?$/, "");

  if (!entryKey) {
    return {
      success: false,
      data: null,
      message: "Entry is a required parameter.",
      error: "Missing entry parameter",
      status: 400,
      suggestions: [],
    };
  }

  if (!process.env.DICTIONARY_API_KEY_PV) {
    console.warn("Missing dictionary API key.");
  }

  const buildApiUrl = (word: string) =>
    `https://dictionaryapi.com/api/v3/references/learners/json/${encodeURIComponent(
      word
    )}?key=${process.env.DICTIONARY_API_KEY_PV}`;

  const fetchFromApi = async (word: string) => {
    try {
      const apiRes = await fetch(buildApiUrl(word));
      if (!apiRes.ok) {
        return {
          success: false,
          data: null,
          message: "Dictionary API call failed.",
          error: `Status: ${apiRes.status}`,
          status: apiRes.status,
          suggestions: [],
        };
      }
      return await apiRes.json();
    } catch (error) {
      return {
        success: false,
        data: null,
        message: "Error fetching data from dictionary API.",
        error,
        status: 502,
        suggestions: [],
      };
    }
  };

  let apiData = await fetchFromApi(entryKey);
  if (
    Array.isArray(apiData) &&
    (typeof apiData[0] === "string" || apiData.length === 0)
  ) {
    if (entryKey.includes(" ")) {
      const baseWord = entryKey.replaceAll(" ", "");
      // const baseWord = entryKey.split(" ")[0];
      apiData = await fetchFromApi(baseWord);

      if (Array.isArray(apiData) && typeof apiData[0] === "string") {
        if (type === "phrasalVerb" || type === "idiom") {
          const field = type === "phrasalVerb" ? "phrasalverbs" : "idioms";

          const removeExpression = await OfTheDayList.findOneAndUpdate(
            {},
            {
              $pull: {
                [field]: {
                  $in: [
                    entry,
                    entryKey,
                    capitalizeFirstLetter(entryKey),
                    capitalizeFirstLetter(entry),
                  ],
                },
              },
            },
            { new: true }
          );
          console.log(
            `Removed ${field}, ${entryKey}, type ${type} from OfTheDayList in fetchEntryData:`,
            removeExpression
          );
        }

        return {
          success: false,
          data: null,
          message: "No data found. Did you mean:",
          error: "",
          suggestions: apiData,
          status: 404,
        };
      }
    }
  }
  // Detect type if not provided
  const detectedType =
    type || (await detectExpressionTypeFromApi(apiData, entryKey)) || "idiom";

  // Use appropriate model
  const selectedModel =
    model || (detectedType === "phrasalVerb" ? PhrasalVerb : Idiom);

  const validDetectedType: EntryType =
    detectedType === "phrasalVerb" ? "phrasalVerb" : "idiom";
  // Format the API data
  const formatted = await convertToEntrySchemaFormat(
    apiData,
    entryKey,
    validDetectedType
  );

  if (!formatted) {
    return {
      success: false,
      data: null,
      message: "Failed to format entry data.",
      error: "Formatting error",
      status: 500,
      suggestions:
        Array.isArray(apiData) && typeof apiData[0] === "string" ? apiData : [],
    };
  }

  // Generate audio if missing
  if (!formatted.audio) {
    try {
      if (detectedType === "phrasalVerb" || detectedType === "idiom") {
        formatted.audio = (await generateAudio(entryKey, detectedType)) || null;
      }
    } catch (err) {
      console.error("Audio generation failed:", err);
    }
  }

  // Save entry if not already in DB
  try {
    const field = detectedType === "phrasalVerb" ? "phrasalVerb" : "idiom";
    const exists = await selectedModel.findOne({ [field]: entryKey });
    if (!exists) {
      await selectedModel.create(formatted);
    }
  } catch (err) {
    console.error("Database save failed:", err);
  }

  return {
    success: true,
    data: formatted,
    message: "Entry fetched and processed successfully.",
    error: "",
    status: 200,
    suggestions: [],
  };
};
