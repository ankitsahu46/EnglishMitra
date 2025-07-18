
import { zWordDataSchema } from "@/schema";
import { generateAudio } from "./generateAudio";
import { WordSchemaFormat } from "@/types";
import { enrichWordDataGpt } from "./enrichWordDataGpt";
import { Word } from "@/models";
import { convertToWordSchemaFormat } from "./convertToWordData";

export const fetchWordData = async (word: string) => {
  // 1. Validate input
  if (!word) {
    return {
      success: false,
      data: null,
      message: "Word is a required parameter.",
      error: "Missing word parameter",
      status: 400,
      suggestions: [],
    };
  }

  // 2. Fetch the word details from the dictionary API
  let res;
  try {
    res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    if (!res.ok) {
      return {
        success: false,
        data: null,
        message: "Dictionary API failed!",
        error: `API status: ${res.status}`,
        status: res.status,
        suggestions: [],
      };
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Failed to fetch from Dictionary API.",
      error,
      status: 502,
      suggestions: [],
    };
  }

  const data = await res.json();

  // 4. Validate the response data using zod schema
  const parsed = zWordDataSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      data: null,
      message: "Validation Failed",
      error: "Validation Failed",
      status: 400,
      suggestions: [],
    };
  }

  // 5. Convert to internal schema format
  const wordData = convertToWordSchemaFormat(parsed.data[0]);
  if (!wordData) {
    console.error("Failed to convert word data!");
    return {
      success: false,
      data: null,
      message: "Conversion failed",
      error: "Conversion failed",
      status: 500,
      suggestions: [],
    };
  }

  // 6. Generate audio if missing
  if (!wordData.audio) {
    try {
      const audioUrl = await generateAudio(word);
      wordData.audio = audioUrl || null;
    } catch (error) {
      console.error("Failed to generate audio:", error);
    }
  }

  // 7. Enrich the word data with GPT and cache it
  let enrichedWordData: WordSchemaFormat | null = wordData;
  try {
    enrichedWordData = await enrichWordDataGpt(wordData);
    await Word.create(enrichedWordData ?? wordData);
  } catch (error) {
    console.error("Failed to cache word data!", error);
  }

  // 8. Return the final word data
  return {
    success: true,
    data: enrichedWordData ?? {},
    message: "Word fetched and processed successfully.",
    status: 200,
    suggestions: [],
  };
};



// import { zWordDataSchema } from "@/schema";
// import { generateAudio } from "./generateAudio";
// import { WordSchemaFormat } from "@/types";
// import { enrichWordDataGpt } from "./enrichWordDataGpt";
// import { Word } from "@/models";
// import { convertToWordSchemaFormat } from "./convertToWordData";

// export const fetchWordData = async (word: string) => {
//     // 1. Fetch the word details from the dictionary API
//     const res = await fetch(
//       `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
//     );

//     if (!res.ok) {
//       return { error: "Dictionary API failed!", status: res.status };
//     }
//     const data = await res.json();

//     // 2. Validate the response data using zod schema
//     const parsed = zWordDataSchema.safeParse(data);
//     if (!parsed.success) {
//       return { error: "Validation Failed", status: 400 };
//     }

//     // 3. Convert to internal schema format
//     const wordData = convertToWordSchemaFormat(parsed.data[0]);
//     if (!wordData) {
//       console.error("Failed to convert word data!");
//       return { error: "Conversion failed", status: 500 };
//     }

//     // 4. Generate audio if missing
//     if (!wordData.audio) {
//       try {
//         const audioUrl = await generateAudio(word);
//         wordData.audio = audioUrl || null;
//       } catch (error) {
//         console.error("Failed to generate audio:", error);
//       }
//     }
//     // 5. Enrich the word data with GPT and cache it
//     let enrichedWordData: WordSchemaFormat | null = wordData;
//     try {
//       enrichedWordData = await enrichWordDataGpt(wordData);
//       await Word.create(enrichedWordData ?? wordData);
//     } catch (error) {
//       console.error("Failed to cache word data!", error);
//     }

//     // 6. Return the final word data
//     return { data: enrichedWordData ?? {} , status: 200 };
// }