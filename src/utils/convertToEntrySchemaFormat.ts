import {
  RawEntryData,
  EntrySchemaFormat,
  EntryMeaningsType,
  EntryType,
  DefinitionsType,
} from "@/types";
import {
  enrichDefinitionsWithTagsAndImages,
  findInDefExamples,
  findInDros,
} from "@/utils";

export const convertToEntrySchemaFormat = async (
  data: RawEntryData[],
  entry: string,
  type: EntryType
): Promise<EntrySchemaFormat | null> => {
  if (!Array.isArray(data) || !entry || !type) return null;

  const matchingIndexes = data
    .map((item, idx) =>
      item.meta?.stems?.includes(entry.toLowerCase()) ? idx : -1
    )
    .filter((idx) => idx !== -1);

  if (matchingIndexes.length === 0) {
    console.log(`${type} "${entry}" not found in data.`);
    return null;
  }

  const meanings: EntryMeaningsType[] = [];

  for (const idx of matchingIndexes) {
    const entryArr = (data[idx] as RawEntryData).dros;
    const defArr = (data[idx] as RawEntryData).def;
    let definitionsWithExamples: DefinitionsType[] = [];

    // 1. Try dros first
    definitionsWithExamples = findInDros(entryArr, entry);
    // 2. If not found in dros, search in def for examples containing the idiom
    if (definitionsWithExamples.length === 0) {
      definitionsWithExamples = findInDefExamples(
        defArr,
        entry,
        definitionsWithExamples
      );
    }

    if (definitionsWithExamples.length === 0) continue;

    console.log("running ai");
    const definitions = await enrichDefinitionsWithTagsAndImages(
      definitionsWithExamples
    );
    console.log("running ai 2");

    meanings.push({
      partOfSpeech: data[idx].fl,
      definitions,
    });
  }

  if (meanings.length === 0) {
    console.log(`No valid meanings found for "${entry}".`);
    return null;
  }

  return {
    [type]: entry,
    audio: null,
    meanings,
  } as EntrySchemaFormat;
};
