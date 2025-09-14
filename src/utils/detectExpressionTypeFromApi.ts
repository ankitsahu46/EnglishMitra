import { RawEntryData } from "@/types";
import { fetchFromAI } from "@/utils";

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

  const aiResponse = await fetchFromAI(prompt);
  const normalized = aiResponse?.trim().toLowerCase();

  if (normalized?.includes("phrasal")) return "phrasalVerb";
  if (normalized?.includes("idiom")) return "idiom";

  // Fallback if AI fails or gives unexpected output
  return "idiom";
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