

// //for phrasal verb and idioms;


// import { FetchEntryDataOptions } from "@/types";
// import { convertToEntrySchemaFormat } from "./convertToEntrySchemaFormat";
// import { generateAudio } from "./generateAudio";

// export const fetchEntryData = async ({
//   entry,
//   type,
//   model,
// }: FetchEntryDataOptions) => {
//   //get the entry data from the dictionary API

//   if (!process.env.DICTIONARY_API_KEY_PV) {
//     console.log("DICTIONARY_API_KEY_PV is not set in environment variables");
//   }
//   if (!entry) {
//     console.log("Entry is required parameter.");
//   }
//   // if (!entry || !type || !model) {
//   //   console.log("Entry, type, and model are required parameters");
//   // }

//   const apiUrl = `https://dictionaryapi.com/api/v3/references/learners/json/${encodeURIComponent(
//     entry
//   )}?key=${process.env.DICTIONARY_API_KEY_PV}`;
//   const apiRes = await fetch(apiUrl);

//   if (!apiRes.ok) {
//     return { status: apiRes.status, error: "Dictionary API failed!" };
//   }

//   const apiData = await apiRes.json();
//   const formatted = await convertToEntrySchemaFormat(apiData, entry, type);

//   if (!formatted) {
//     return { status: 500, error: "Failed to format entry data" };
//   }
//   console.log("Entry dictionary data formatted", formatted);

//   // 1. Generate audio
//   if (!formatted.audio) {
//     try {
//       formatted.audio = (await generateAudio(entry, type)) || null;
//     } catch (err) {
//       console.error("Failed to generate audio:", err);
//     }
//   }

//   // 2. Save to DB
//   try {
//     await model.create(formatted);
//     console.log("Entry dictionary data formatted after caching", formatted);
//   } catch (err) {
//     console.error("Failed to save entry to the database:", err);
//   }

//   return { status: 200, data: formatted };
// };

































//for phrasal verb and idioms modified version type and model;


import { convertToEntrySchemaFormat } from "./convertToEntrySchemaFormat";
import { generateAudio } from "./generateAudio";
import { detectExpressionTypeFromApi } from "./detectExpressionTypeFromApi";
import { Idiom, PhrasalVerb } from "@/models";
// import { FetchEntryDataOptions } from "@/types";

interface FetchEntryDataOptions {
  entry: string;
  type?: "phrasalVerb" | "idiom";
  model?: typeof Idiom | typeof PhrasalVerb;
}

export const fetchEntryData = async ({
  entry,
  type,
  model,
}: FetchEntryDataOptions) => {
  //get the entry data from the dictionary API

  if (!process.env.DICTIONARY_API_KEY_PV) {
    console.log("DICTIONARY_API_KEY_PV is not set in environment variables");
  }
  if (!entry) {
    console.log("Entry is required parameter.");
  }

  const apiUrl = `https://dictionaryapi.com/api/v3/references/learners/json/${encodeURIComponent(
    entry
  )}?key=${process.env.DICTIONARY_API_KEY_PV}`;
  const apiRes = await fetch(apiUrl);

  if (!apiRes.ok) {
    return { status: apiRes.status, error: "Dictionary API failed!" };
  }

  const apiData = await apiRes.json();

  // if (!type) type = detectExpressionTypeFromApi(apiData, entry) ;
  // if (!model) model = type === "phrasalVerb" ? PhrasalVerb : (type === "idiom" && Idiom);

  // let typeName = "phrasalVerb";
  // if (type === "idiom") {
  //   typeName = "idiom";
  // }

  // let detectedType = type;
  // if (!detectedType) detectedType = detectExpressionTypeFromApi(apiData, entry);

  let detectedType: "phrasalVerb" | "idiom" = "idiom";
  if (!type) {
    const tempType = detectExpressionTypeFromApi(apiData, entry);
    if (tempType === "phrasalVerb") {
      detectedType = "phrasalVerb";
    } else if (tempType === "idiom") {
      detectedType = "idiom";
    }
  }
  // Pick model if not provided
  let selectedModel = model;
  if (!selectedModel) {
    if (detectedType === "phrasalVerb") selectedModel = PhrasalVerb;
    else if (detectedType === "idiom" ) selectedModel = Idiom;
  }

  const formatted = await convertToEntrySchemaFormat(apiData, entry, detectedType);

  if (!formatted) {
    return { status: 500, error: "Failed to format entry data" };
  }
  console.log("Entry dictionary data formatted", formatted);

  // 1. Generate audio
  if (!formatted.audio) {
    try {
      formatted.audio = (await generateAudio(entry, type)) || null;
    } catch (err) {
      console.error("Failed to generate audio:", err);
    }
  }

  // 2. Save to DB
  if (selectedModel) {
    try {
      console.log(model, formatted, "selectedModel", selectedModel);
      await selectedModel.create(formatted);
      console.log("Entry dictionary data formatted after caching", formatted);
    } catch (err) {
      console.error("Failed to save entry to the database:", err);
    }
  }

  return { status: 200, data: formatted };
};























// import { convertToEntrySchemaFormat } from "./convertToEntrySchemaFormat";
// import { generateAudio } from "./generateAudio";
// import { detectExpressionTypeFromApi } from "./detectExpresssionTypeFromApi";
// import { Idiom, PhrasalVerb, Word } from "@/models";
// import convertToWordSchemaFormat from "./convertToWordData";


// type EntryType = "word" | "phrasalVerb" | "idiom";
// type ModelType = typeof Word | typeof Idiom | typeof PhrasalVerb;

// export const fetchEntryData = async ({
//   entry,
//   model,
//   type,
// }: { entry: string, model: ModelType, type: EntryType }) => {
//   //get the entry data from the dictionary API

//   if (!process.env.DICTIONARY_API_KEY_PV) {
//     console.log("DICTIONARY_API_KEY_PV is not set in environment variables");
//   }
//   if (!entry) {
//     console.log("Entry is required parameter");
//   }

//   const apiUrl = `https://dictionaryapi.com/api/v3/references/learners/json/${encodeURIComponent(
//     entry
//   )}?key=${process.env.DICTIONARY_API_KEY_PV}`;
//   const apiRes = await fetch(apiUrl);

//   if (!apiRes.ok) {
//     return { status: apiRes.status, error: "Dictionary API failed!" };
//   }

//   const apiData = await apiRes.json();

//   if (!type) type = detectExpressionTypeFromApi(apiData, entry) ;
//   if (!model) model = (type === "word") ? Word : (type === "phrasalVerb" ? PhrasalVerb : Idiom);

//   const formatted = type === "word" ? (await convertToWordSchemaFormat(data)) : (await convertToEntrySchemaFormat(apiData, entry, type));
//   // const formatted = await convertToEntrySchemaFormat(apiData, entry, type);

//   if (!formatted) {
//     return { status: 500, error: "Failed to format entry data" };
//   }
//   console.log("Entry dictionary data formatted", formatted);

//   // 1. Generate audio
//   if (!formatted.audio) {
//     try {
//       formatted.audio = (await generateAudio(entry, type)) || null;
//     } catch (err) {
//       console.error("Failed to generate audio:", err);
//     }
//   }

//   // 2. Save to DB
//   try {
//     await model.create(formatted);
//     console.log("Entry dictionary data formatted after caching", formatted);
//   } catch (err) {
//     console.error("Failed to save entry to the database:", err);
//   }

//   return { status: 200, data: formatted };
// };






























































//for phrasal verb and idioms;


// import { convertToEntrySchemaFormat } from "./convertToEntrySchemaFormat";
// import { generateAudio } from "./generateAudio";
// import { detectExpressionTypeFromApi } from "./detectExpresssionTypeFromApi";
// import { Idiom, PhrasalVerb, Word } from "@/models";


// //needs to change, include word type
// type EntryType = "phrasalVerb" | "idiom";
// type ModelType = typeof Idiom | typeof PhrasalVerb;

// export const fetchEntryData = async ({
//   entry,
//   model,
//   type,
// }: { entry: string, model: ModelType, type: EntryType }) => {
//   //get the entry data from the dictionary API

//   if (!process.env.DICTIONARY_API_KEY_PV) {
//     console.log("DICTIONARY_API_KEY_PV is not set in environment variables");
//   }
//   if (!entry) {
//     console.log("Entry is required parameter");
//   }

//   const apiUrl = `https://dictionaryapi.com/api/v3/references/learners/json/${encodeURIComponent(
//     entry
//   )}?key=${process.env.DICTIONARY_API_KEY_PV}`;
//   const apiRes = await fetch(apiUrl);

//   if (!apiRes.ok) {
//     return { status: apiRes.status, error: "Dictionary API failed!" };
//   }

//   const apiData = await apiRes.json();

//   if (!type) type = detectExpressionTypeFromApi(apiData, entry) ;
//   if (!model) model = (type === "word") ? Word : (type === "phrasalVerb" ? PhrasalVerb : Idiom);

//   const formatted = await convertToEntrySchemaFormat(apiData, entry, type);

//   if (!formatted) {
//     return { status: 500, error: "Failed to format entry data" };
//   }
//   console.log("Entry dictionary data formatted", formatted);

//   // 1. Generate audio
//   if (!formatted.audio) {
//     try {
//       formatted.audio = (await generateAudio(entry, type)) || null;
//     } catch (err) {
//       console.error("Failed to generate audio:", err);
//     }
//   }

//   // 2. Save to DB
//   try {
//     await model.create(formatted);
//     console.log("Entry dictionary data formatted after caching", formatted);
//   } catch (err) {
//     console.error("Failed to save entry to the database:", err);
//   }

//   return { status: 200, data: formatted };
// };
