import { WordOfTheDayData } from "@/types";

export const getWordContent = (data : WordOfTheDayData) => {
  const meanings = data.meanings?.[0];
  const definition = meanings?.definitions?.[0]?.definition ?? "N/A";
  const example = meanings?.definitions?.[0]?.example ?? "N/A";

  return {
    text: data.word,
    partOfSpeech: meanings?.partOfSpeech ?? null,
    definition,
    example,
    audio: data.audio ?? null,
  }
}