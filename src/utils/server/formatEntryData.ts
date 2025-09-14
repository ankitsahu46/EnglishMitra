import {
  RawEntryData,
  EntryType,
  Definition,
  StandardExpData,
  ExpressionCommonData,
  ExpressionDefinitions,
} from "@/types";
import { findInDefExamples, findInDros } from "@/utils";
import { removeExpression } from "@/utils/server";

export function formatEntryData(
  data: RawEntryData[],
  entry: string,
  type: EntryType
): StandardExpData | null {
  if (!Array.isArray(data) || !entry || !type) return null;

  const matchingIndexes = data
    .map((item, idx) =>
      item.meta?.stems?.includes(entry.toLowerCase()) ? idx : -1
    )
    .filter((idx) => idx !== -1);

  if (matchingIndexes.length === 0) {
    console.log(`${type} "${entry}" not found in data.`);
    removeExpression(type, entry, entry.replaceAll(" ", ""));
    return null;
  }

  const definitions: ExpressionDefinitions[] = [];

  for (const idx of matchingIndexes) {
    const entryData = data[idx];
    const fromDros = findInDros(entryData.dros, entry);
    const fromDefs = findInDefExamples(entryData.def, entry, []);

    const selectedDefs: Definition[] = fromDros.length ? fromDros : fromDefs;
    if (!selectedDefs.length) continue;

    selectedDefs.forEach((def) => {
      definitions.push({
        partOfSpeech: entryData.fl ?? null,
        definition: def.definition,
        example: def.example ?? "",
        tags: def.tags ?? [],
        images: def.images ?? [],
        senseLabel: def.senseLabel ?? null,
        synonyms: def.synonyms ?? [],
        antonyms: def.antonyms ?? [],
      });
    });
  }

  if (!definitions.length) {
    console.log(`No valid definitions found for ${type} - "${entry}".`);
    removeExpression(type, entry, entry.replaceAll(" ", ""));
    return null;
  }

  const commonData: ExpressionCommonData = {
    text: entry,
    phonetic: null,
    audio: null,
  };

  return { commonData, definitions };
}
