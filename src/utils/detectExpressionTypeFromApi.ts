import { RawEntryData } from "@/types";
import { prepositions } from "./prespositions";


export const detectExpressionTypeFromApi = (apiData: RawEntryData[], entry: string): "word" | "phrasalVerb" | "idiom" => {
  const normalizedEntry = entry.trim().toLowerCase();
  const entryWords = normalizedEntry.split(/\s+/);

  for (const item of apiData) {
    // 1. meta.id matches entry and entry doesn't contain "-"
    if (
      entryWords.length === 1 &&
      item.meta &&
      typeof item.meta.id === "string" &&
      (item.meta.id === normalizedEntry ||
       item.meta.id.startsWith(normalizedEntry+":")) &&
      !normalizedEntry.includes("-")
    ) {
      return "word";
    }

    // 2. meta.stems contains entry and entry is a single word
    if (
      entryWords.length === 1 &&
      item.meta &&
      Array.isArray(item.meta.stems) &&
      item.meta.stems.includes(normalizedEntry)
    ) {
      return "word";
    }
  }

  // 3. If entry is multi-word and last word is a preposition or adverb, it's a phrasal verb
  if (
    entryWords.length > 1 &&
    (prepositions.includes(entryWords[entryWords.length - 1]))
  ) {
    return "phrasalVerb";
  }

  if (
    entryWords.length > 1 &&
    isPhrasalVerb(apiData, normalizedEntry) &&
    entryWords.some(word => prepositions.includes(word))
  ) {
    return "phrasalVerb";
  }

  // 4. Otherwise, treat as idiom
  return "idiom";
}





const isPhrasalVerb = (apiData: RawEntryData[], entry: string): boolean => {
  const matchingIndexes = apiData
    .map((item, idx) =>
      item.meta?.stems?.includes(entry.toLowerCase()) ? idx : -1
    )
    .filter((idx) => idx !== -1);

  if (matchingIndexes.length > 0) {
    for (const idx of matchingIndexes) {
        const entryArr = (apiData[idx] as RawEntryData).dros;
        if (!Array.isArray(entryArr)) continue;
    
        return (entryArr.find((item) => { return item.drp === entry && item.gram && item.gram === "phrasal verb" }) !== undefined);
    }
  }
  return false;
}