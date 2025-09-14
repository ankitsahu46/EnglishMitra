import { ExpressionDefinitions as ExDefs } from "@/types";

export const convertDefinitionsToMeanings = (
  definitions: ExDefs[],
  synonyms?: Record<string, string[]> | null,
  antonyms?: Record<string, string[]> | null
) => {
  const meaningsMap: Record<string, ExDefs[]> = {};

  definitions.forEach((def: ExDefs) => {
    const pos = def.partOfSpeech ?? "";
    if (!meaningsMap[pos]) meaningsMap[pos] = [];
    meaningsMap[pos].push(def);
  });

  const meanings = Object.entries(meaningsMap).map(([partOfSpeech, defs]) => {
    // For word: include synonyms/antonyms at meaning level
    return {
      partOfSpeech: partOfSpeech || null,
      definitions: defs.map((d: ExDefs) => ({
        definition: d.definition,
        example: d.example,
        tags: d.tags ?? [],
        images: d.images ?? [],
        senseLabel: d.senseLabel ?? null,
        synonyms: d.synonyms ?? null,
        antonyms: d.antonyms ?? null,
      })),
      synonyms: synonyms?.[partOfSpeech] ?? [],
      antonyms: antonyms?.[partOfSpeech] ?? [],
    };
  });
  return meanings;
};
