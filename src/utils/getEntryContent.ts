import { EntryOfTheDayData, EntryType } from "@/types";

export const getEntryContent = (data: EntryOfTheDayData, type: EntryType) => {
  const meanings = data?.meanings?.[0];
  const firstDefinition = meanings?.definitions?.[0];

  return {
    text: type === "phrasalVerb" ? data.phrasalVerb : data.idiom,
    audio: data.audio ?? null,
    partOfSpeech: meanings?.partOfSpeech ?? "N/A",
    definition: firstDefinition?.definition ?? "N/A",
    example: firstDefinition?.example ?? "N/A",
    senseLabel: firstDefinition?.senseLabel || null,
  }
}