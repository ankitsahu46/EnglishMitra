// import { RawEntryData } from "@/types";
// import { prepositions } from "./prespositions";


// export const detectExpressionTypeFromApi = (apiData: RawEntryData[], entry: string): "word" | "phrasalVerb" | "idiom" => {
//   const normalizedEntry = entry.trim().toLowerCase();
//   const entryWords = normalizedEntry.split(/\s+/);

//   for (const item of apiData) {
//     // 1. meta.id matches entry and entry doesn't contain "-"
//     if (
//       entryWords.length === 1 &&
//       item.meta &&
//       typeof item.meta.id === "string" &&
//       (item.meta.id === normalizedEntry ||
//        item.meta.id.startsWith(normalizedEntry+":")) &&
//       !normalizedEntry.includes("-")
//     ) {
//       return "word";
//     }

//     // 2. meta.stems contains entry and entry is a single word
//     if (
//       entryWords.length === 1 &&
//       item.meta &&
//       Array.isArray(item.meta.stems) &&
//       item.meta.stems.includes(normalizedEntry)
//     ) {
//       return "word";
//     }
//   }

//   // 3. If entry is multi-word and last word is a preposition or adverb, it's a phrasal verb
//   if (
//     entryWords.length > 1 &&
//     (prepositions.includes(entryWords[entryWords.length - 1]))
//   ) {
//     return "phrasalVerb";
//   }

//   if (
//     entryWords.length > 1 &&
//     isPhrasalVerb(apiData, normalizedEntry) &&
//     entryWords.some(word => prepositions.includes(word))
//   ) {
//     return "phrasalVerb";
//   }

//   // 4. Otherwise, treat as idiom
//   return "idiom";
// }





// const isPhrasalVerb = (apiData: RawEntryData[], entry: string): boolean => {
//   const matchingIndexes = apiData
//     .map((item, idx) =>
//       item.meta?.stems?.includes(entry.toLowerCase()) ? idx : -1
//     )
//     .filter((idx) => idx !== -1);

//   if (matchingIndexes.length > 0) {
//     for (const idx of matchingIndexes) {
//         const entryArr = (apiData[idx] as RawEntryData).dros;
//         if (!Array.isArray(entryArr)) continue;
    
//         return (entryArr.find((item) => { return item.drp === entry && item.gram && item.gram === "phrasal verb" }) !== undefined);
//     }
//   }
//   return false;
// }

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
// //.Try this code Rewritten using ai
import { RawEntryData } from "@/types";
import { generateFromAI } from "./generateFromAI";

export const detectExpressionTypeFromApi = async (
  apiData: RawEntryData[] | null | undefined,
  entry: string
): Promise<"word" | "phrasalVerb" | "idiom"> => {
  const normalizedEntry = entry.trim().toLowerCase();
  const entryWords = normalizedEntry.split(/\s+/);

  const isSingleWord = entryWords.length === 1;

  if (Array.isArray(apiData) && apiData.length > 0) {
    for (const item of apiData) {
      const { meta } = item;

      // 1. Exact match by meta.id (if no dash) and single-word
      if (
        isSingleWord &&
        meta &&
        typeof meta.id === "string" &&
        (meta.id === normalizedEntry || meta.id.startsWith(`${normalizedEntry}:`)) &&
        !normalizedEntry.includes("-")
      ) {
        return "word";
      }

      // 2. Match in meta.stems and single-word
      if (
        isSingleWord &&
        meta &&
        Array.isArray(meta.stems) &&
        meta.stems.includes(normalizedEntry)
      ) {
        return "word";
      }
    }

    // 3. Check for phrasal verb pattern in API data
    if (!isSingleWord && isPhrasalVerb(apiData, normalizedEntry)) {
      return "phrasalVerb";
    }
  }

  // 4. Use AI if type still unclear or no API data
  const prompt = `Classify the following English expression as either "phrasalVerb" or "idiom". Only return one word — either "phrasalVerb" or "idiom".

Expression: "${normalizedEntry}"`;

  const aiResponse = await generateFromAI(prompt);
  const normalized = aiResponse?.trim().toLowerCase();

  if (normalized?.includes("phrasal")) return "phrasalVerb";
  if (normalized?.includes("idiom")) return "idiom";

  // Fallback if AI fails or gives unexpected output
  return "idiom";
};

// Helper function to check if API suggests it's a phrasal verb
const isPhrasalVerb = (apiData: RawEntryData[], entry: string): boolean => {
  const matchingIndexes = apiData
    .map((item, idx) =>
      item.meta?.stems?.includes(entry.toLowerCase()) ? idx : -1
    )
    .filter((idx) => idx !== -1);

  for (const idx of matchingIndexes) {
    const entryArr = apiData[idx].dros;
    if (!Array.isArray(entryArr)) continue;

    const match = entryArr.find(
      (item) =>
        item.drp === entry &&
        item.gram &&
        item.gram.toLowerCase() === "phrasal verb"
    );
    if (match) return true;
  }

  return false;
};