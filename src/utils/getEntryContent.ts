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


// import { 
//   // EntryContent,
//   getEntryContentProps,
//    EntryOfTheDayData, EntryType } from "@/types";

// export const getEntryContent = (
//   data: EntryOfTheDayData,
//   type: EntryType
// ): getEntryContentProps => {
//   if (!data || !data.meanings || data.meanings.length === 0) {
//     throw new Error("Invalid data provided to getEntryContent.");
//   }

//   const definitions = data.meanings.flatMap((meaning) =>
//     meaning.definitions.map((definitionObj) => ({
//       partOfSpeech: meaning.partOfSpeech ?? null,
//       definition: definitionObj.definition ?? "N/A",
//       example: definitionObj.example ?? "N/A",
//       tags: definitionObj.tags ?? [],
//       images: definitionObj.images ?? [],
//       senseLabel: definitionObj.senseLabel ?? null,
//     }))
//   );

//   const commonDataText =
//     type === "idiom" ? data.idiom : data.phrasalVerb;

//   return {
//     commonData: {
//       text: commonDataText ?? "N/A",
//       phonetic: null,
//       audio: data.audio ?? null,
//     },
//     definitions,
//   };
// };


// import { EntryOfTheDayData, EntryType, getEntryContentProps } from "@/types";

// export const getEntryContent = (
//   data: EntryOfTheDayData | null | undefined,
//   type: EntryType
// ): getEntryContentProps => {
//   if (!data) {
//     return {
//       commonData: {
//         text: "N/A",
//         phonetic: null,
//         audio: null,
//       },
//       definitions: [],
//     };
//   }

//   const definitions =
//     data.meanings?.flatMap((meaning) =>
//       meaning?.definitions?.map((definitionObj) => ({
//         partOfSpeech: meaning.partOfSpeech ?? "unknown",
//         definition: definitionObj?.definition?.trim() || "N/A",
//         example: definitionObj?.example?.trim() || "N/A",
//         tags: definitionObj?.tags ?? [],
//         images: definitionObj?.images ?? [],
//         senseLabel: definitionObj?.senseLabel ?? null,
//       })) ?? []
//     ) ?? [];

//   return {
//     commonData: {
//       text:
//         (type === "idiom" ? data.idiom : data.phrasalVerb) ??
//         "N/A",
//       phonetic: null,
//       audio: data.audio ?? null,
//     },
//     definitions,
//   };
// };
