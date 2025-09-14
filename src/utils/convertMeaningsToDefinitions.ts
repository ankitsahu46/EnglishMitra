import { Definition, ExpressionDefinitions as ExDefs, Meaning } from "@/types";

export const convertMeaningsToDefinitions = (meanings: Meaning[]) => {
  const definitions: ExDefs[] = [];
  const synonyms: Record<string, string[]> = {};
  const antonyms: Record<string, string[]> = {};

  meanings?.forEach((meaning: Meaning) => {
    meaning.definitions?.forEach((def: Definition) => {
      definitions.push({
        partOfSpeech: meaning.partOfSpeech ?? null,
        definition: def.definition,
        example: def.example ?? "",
        tags: def.tags ?? [],
        images: def.images ?? [],
        senseLabel: def.senseLabel ?? null,
        synonyms: def.synonyms ?? [],
        antonyms: def.antonyms ?? [],
      });
    });
    if (meaning.partOfSpeech) {
      synonyms[meaning.partOfSpeech] = meaning.synonyms ?? [];
      antonyms[meaning.partOfSpeech] = meaning.antonyms ?? [];
    }
  });
  return { definitions, synonyms, antonyms };
};
