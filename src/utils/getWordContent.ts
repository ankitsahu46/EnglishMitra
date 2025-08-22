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

// import {
//   // EntryContent,
//   getEntryContentProps,
//   WordOfTheDayData } from "@/types";

// export const getWordContent = (
//   data: WordOfTheDayData
// ): getEntryContentProps => {
//   if (!data || !data.meanings || data.meanings.length === 0) {
//     throw new Error("Invalid data provided to getWordContent.");
//   }

//   const definitions = data.meanings.flatMap((meaning) =>
//     meaning.definitions.map((definitionObj) => ({
//       partOfSpeech: meaning.partOfSpeech ?? null,
//       definition: definitionObj.definition ?? "N/A",
//       example: definitionObj.example ?? "N/A",
//       tags: definitionObj.tags ?? [],
//       images: definitionObj.images ?? [],
//       synonyms: meaning.synonyms ?? [],
//       antonyms: meaning.antonyms ?? [],
//     }))
//   );

//   return {
//     commonData: {
//       text: data.word ?? "N/A",
//       phonetic: data.phonetic ?? null,
//       audio: data.audio ?? null,
//     },
//     definitions,
//   };
// };

// import { getEntryContentProps, WordOfTheDayData } from "@/types";

// export const getWordContent = (
//   data: WordOfTheDayData | null | undefined
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
//     data.meanings?.flatMap(
//       (meaning) =>
//         meaning?.definitions?.map((definitionObj) => ({
//           partOfSpeech: meaning.partOfSpeech ?? "unknown",
//           definition: definitionObj?.definition?.trim() || "N/A",
//           example: definitionObj?.example?.trim() || "N/A",
//           tags: definitionObj?.tags ?? [],
//           images: definitionObj?.images ?? [],
//           synonyms: meaning.synonyms ?? [],
//           antonyms: meaning.antonyms ?? [],
//         })) ?? []
//     ) ?? [];

//   return {
//     commonData: {
//       text: data.word?.trim() || "N/A",
//       phonetic: data.phonetic?.trim() || null,
//       audio: data.audio ?? null,
//     },
//     definitions,
//   };
// };
