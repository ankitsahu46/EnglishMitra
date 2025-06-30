import { convertToEntrySchemaFormat } from "./convertToEntrySchemaFormat";
import { generateAudio } from "./generateAudio";
import { detectExpressionTypeFromApi } from "./detectExpressionTypeFromApi";
import { Idiom, OfTheDayList, PhrasalVerb } from "@/models";
import { capitalizeFirstLetter } from "./capitalizeFirstLetter";

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
  const entryExp = entry.trim().toLowerCase().replace(/\?$/, "");
  if (!process.env.DICTIONARY_API_KEY_PV) {
    return {
      success: false,
      data: null,
      message: "Dictionary API key is not set in environment variables.",
      error: "Missing API key",
      status: 500,
      suggestions: [],
    };
  }
  if (!entryExp) {
    return {
      success: false,
      data: null,
      message: "Entry is a required parameter.",
      error: "Missing entry parameter",
      status: 400,
      suggestions: [],
    };
  }

  const apiUrl = `https://dictionaryapi.com/api/v3/references/learners/json/${encodeURIComponent(
    entryExp
  )}?key=${process.env.DICTIONARY_API_KEY_PV}`;

  let apiRes;
  let apiData;
  try {
    apiRes = await fetch(apiUrl);
    if (!apiRes.ok) {
      return {
        success: false,
        data: null,
        message: "Dictionary API failed!",
        error: `API status: ${apiRes.status}`,
        status: apiRes.status,
        suggestions: [],
      };
    }
    apiData = await apiRes.json();
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
  // console.log("apiData", apiData);
  // Handle suggestions (array of strings)
  if (Array.isArray(apiData) && typeof apiData[0] === "string") {
    // console.log("apiData2", apiData);
    if ((type && type === "phrasalVerb") || type === "idiom") {
      const field = type === "phrasalVerb" ? "phrasalverbs" : "idioms";

      const res = await OfTheDayList.findOneAndUpdate(
        {},
        {
          $pull: {
            [field]: { $in: [entryExp, capitalizeFirstLetter(entryExp)] },
          },
        },
        { new: true }
      );
      console.log("res fetchEntryData", res);
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

  // Detect type if not provided
  let detectedType: "phrasalVerb" | "idiom" = "idiom";
  if (type) {
    detectedType = type;
  } else {
    const tempType = detectExpressionTypeFromApi(apiData, entryExp);
    if (tempType === "phrasalVerb") detectedType = "phrasalVerb";
    else if (tempType === "idiom") detectedType = "idiom";
  }

  // Pick model if not provided
  let selectedModel = model;
  if (!selectedModel) {
    if (detectedType === "phrasalVerb") selectedModel = PhrasalVerb;
    else if (detectedType === "idiom") selectedModel = Idiom;
  }

  // Format the data
  const formatted = await convertToEntrySchemaFormat(
    apiData,
    entryExp,
    detectedType
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
      formatted.audio = (await generateAudio(entryExp, detectedType)) || null;
    } catch (err) {
      // Log but don't fail the whole process
      console.error("Failed to generate audio:", err);
    }
  }

  // Save to DB if model is available
  if (selectedModel) {
    try {
      const existing = await selectedModel.findOne({ $or: [
        { phrasalVerb: entryExp },
        { idiom: entryExp },
      ] });
      if (!existing) {
        await selectedModel.create(formatted);
      }
    } catch (err) {
      console.error("Failed to save entry to the database:", err);
    }
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
// //.
// //.
// ///./.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
//

// //for phrasal verb and idioms modified version type and model;

// import { convertToEntrySchemaFormat } from "./convertToEntrySchemaFormat";
// import { generateAudio } from "./generateAudio";
// import { detectExpressionTypeFromApi } from "./detectExpressionTypeFromApi";
// import { Idiom, PhrasalVerb } from "@/models";

// interface FetchEntryDataOptions {
//   entry: string;
//   type?: "phrasalVerb" | "idiom";
//   model?: typeof PhrasalVerb | typeof Idiom;
// }

// export const fetchEntryData = async ({
//   entry,
//   type,
//   model,
// }: FetchEntryDataOptions) => {
//   if (!process.env.DICTIONARY_API_KEY_PV) {
//     console.warn("DICTIONARY_API_KEY_PV is not set in environment variables");
//   }
//   if (!entry) {
//     console.error("Entry is required parameter.");
//   }
// // console.log("entry", entry, "type22", type, "fetchEntryData");

//   const apiUrl = `https://dictionaryapi.com/api/v3/references/learners/json/${encodeURIComponent(
//     entry
//   )}?key=${process.env.DICTIONARY_API_KEY_PV}`;

//     const apiRes = await fetch(apiUrl);

//     if (!apiRes?.ok) {
//       console.log("apiData1");
//       return { status: apiRes.status, error: "Dictionary API failed!" };
//     }

//     const apiData = await apiRes.json();
//     if (Array.isArray(apiData) && typeof apiData[0] === 'string') {
//       return { success: false, data: apiData, message: "No data found.", status: 404 };
//     }

//   // const apiData = await apiRes.json();

//   let detectedType: "phrasalVerb" | "idiom" = "idiom";
//   if (type) {
//     detectedType = type;
//   }
//   else {
//     // console.log("type", type, "from fetchentrydata");
//     const tempType = detectExpressionTypeFromApi(apiData, entry);
//     if (tempType === "phrasalVerb") {
//       detectedType = "phrasalVerb";
//     } else if (tempType === "idiom" ) {
//       detectedType = "idiom";
//     }
//   }
//   // Pick model if not provided
//   let selectedModel = model;
//   if (!selectedModel) {
//     if (detectedType === "phrasalVerb") selectedModel = PhrasalVerb;
//     else if (detectedType === "idiom" ) selectedModel = Idiom;
//   }

//   // console.log("entry", entry, 'detetpe', detectedType, "FetchEntryData");
//   const formatted = await convertToEntrySchemaFormat(apiData, entry, detectedType);

//   if (!formatted) {
//     return { status: 500, error: "Failed to format entry data" };
//   }

//   // 1. Generate audio
//   if (!formatted.audio) {
//     try {
//       formatted.audio = (await generateAudio(entry, type)) || null;
//     } catch (err) {
//       console.error("Failed to generate audio:", err);
//     }
//   }

//   // 2. Save to DB
//   if (selectedModel) {
//     try {
//       await selectedModel.create(formatted);
//     } catch (err) {
//       console.error("Failed to save entry to the database:", err);
//     }
//   }

//   return { status: 200, data: formatted };
// };

// //.
// //.
// //.
// //.
// ///./.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.

// //for phrasal verb and idioms modified version type and model;

// import { convertToEntrySchemaFormat } from "./convertToEntrySchemaFormat";
// import { generateAudio } from "./generateAudio";
// import { detectExpressionTypeFromApi } from "./detectExpressionTypeFromApi";
// import { Idiom, PhrasalVerb } from "@/models";

// interface FetchEntryDataOptions {
//   entry: string;
//   type?: "phrasalVerb" | "idiom";
//   model?: typeof PhrasalVerb | typeof Idiom;
// }

// export const fetchEntryData = async ({
//   entry,
//   type,
//   model,
// }: FetchEntryDataOptions) => {
//   if (!process.env.DICTIONARY_API_KEY_PV) {
//     console.log("DICTIONARY_API_KEY_PV is not set in environment variables");
//   }
//   if (!entry) {
//     console.log("Entry is required parameter.");
//   }
// console.log("entry", entry, "type22", type, "fetchEntryData");

//   const apiUrl = `https://dictionaryapi.com/api/v3/references/learners/json/${encodeURIComponent(
//     entry
//   )}?key=${process.env.DICTIONARY_API_KEY_PV}`;
//   const apiRes = await fetch(apiUrl);

//   if (!apiRes.ok) {
//     return { status: apiRes.status, error: "Dictionary API failed!" };
//   }

//   const apiData = await apiRes.json();

//   let detectedType: "phrasalVerb" | "idiom" = "idiom";
//   if (type) {
//     detectedType = type;
//   }
//   else {
//     console.log("type", type, "from fetchentrydata");
//     const tempType = detectExpressionTypeFromApi(apiData, entry);
//     if (tempType === "phrasalVerb") {
//       detectedType = "phrasalVerb";
//     } else if (tempType === "idiom") {
//       detectedType = "idiom";
//     }
//   }
//   // Pick model if not provided
//   let selectedModel = model;
//   if (!selectedModel) {
//     if (detectedType === "phrasalVerb") selectedModel = PhrasalVerb;
//     else if (detectedType === "idiom" ) selectedModel = Idiom;
//   }

//   console.log("entry", entry, 'detetpe', detectedType, "FetchEntryData");
//   const formatted = await convertToEntrySchemaFormat(apiData, entry, detectedType);

//   if (!formatted) {
//     return { status: 500, error: "Failed to format entry data" };
//   }

//   // 1. Generate audio
//   if (!formatted.audio) {
//     try {
//       formatted.audio = (await generateAudio(entry, type)) || null;
//     } catch (err) {
//       console.error("Failed to generate audio:", err);
//     }
//   }

//   // 2. Save to DB
//   if (selectedModel) {
//     try {
//       await selectedModel.create(formatted);
//     } catch (err) {
//       console.error("Failed to save entry to the database:", err);
//     }
//   }

//   return { status: 200, data: formatted };
// };
