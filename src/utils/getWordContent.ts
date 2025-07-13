import { WordOfTheDayData } from "@/types";

export const getWordContent = (data : WordOfTheDayData) => {
  const meanings = data.meanings?.[0];
  const firstDef = meanings?.definitions?.[0];

  const definition = firstDef?.definition ?? "N/A";
  const example = firstDef?.example ?? "N/A";
  const tags = firstDef?.tags ?? [];
  const images = firstDef?.images ?? [];

  return {
    text: data.word,
    phonetic: data.word ?? null,
    audio: data.audio ?? null,
    partOfSpeech: meanings?.partOfSpeech ?? null,
    definition,
    example,
    tags,
    images,
    synonyms: meanings?.synonyms ?? [],
    antonyms: meanings?.antonyms ?? [],
  }
}