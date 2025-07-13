import { EntryOfTheDayData, EntryType } from "@/types";

export const getEntryContent = (data: EntryOfTheDayData, type: EntryType) => {
  const meanings = data?.meanings?.[0];
  const firstDefinition = meanings?.definitions?.[0];

  return {
    text: type === "idiom" ? data.idiom : data.phrasalVerb,
    phonetic: null,
    audio: data.audio ?? null,
    partOfSpeech: meanings?.partOfSpeech ?? null,
    definition: firstDefinition?.definition ?? "N/A",
    example: firstDefinition?.example ?? "N/A",
    tags: firstDefinition?.tags ?? [],
    images: firstDefinition?.images ?? [],
    senseLabel: firstDefinition?.senseLabel || null,
  }
}