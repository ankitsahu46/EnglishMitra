
//   //for phrasal verb and idioms;


import {
  RawEntryData,
  EntrySchemaFormat,
  EntryMeaningsType,
  EntryType,
} from "@/types";
import { extractDefinitions } from "./extractEntryDefinitions";

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
    if (!Array.isArray(entryArr)) continue;

    const entryData = entryArr.find((item) => item.drp === entry);
    if (!entryData || !entryData.def?.[0]?.sseq) continue;

    const definitions = await extractDefinitions(
      entryData.def[0].sseq,
      entry,
      data[idx].fl
    );

    meanings.push({
      partOfSpeech: data[idx].fl,
      definitions,
    });
  }

  if (meanings.length === 0) {
    console.log(
      `No valid meanings found for "${entry}".`
    );
    return null;
  }

  return {
    [type]: entry,
    audio: null,
    meanings,
  } as EntrySchemaFormat;






























































































































  //   const entryIndexes: number[] = [];

  //   data.forEach((item, index) => {
  //     console.log(item.meta?.stems, "stems data", entry, "entry");
  //     if (item.meta?.stems?.includes(entry.toLowerCase())) entryIndexes.push(index);
  //   }
  //   );

  //   if (entryIndexes.length === 0) {
  //     console.log(`${type} "${entry}" not found in the data.33`);
  //     return null;
  //   }

  //   entryIndexes.forEach(index => {

  //   // For both idioms and phrasal verbs, assume similar structure
  //   const entryArr = (data[index] as RawEntryData).dros;

  //   const entryDataIndex = entryArr.findIndex(
  //     (item) => item.drp === entry
  //   );
  //   if (entryDataIndex === -1) {
  //     console.log(`${type} "${entry}" not found in the data.2`);
  //     return;
  //   }

  //   const rawEntryData = entryArr[entryDataIndex];

  //   if (!rawEntryData || !rawEntryData.def?.[0]?.sseq) {
  //     console.log(`Definition data is missing for "${entry}".`);
  //     return;
  //   }

  //   const definitions = rawEntryData.def[0].sseq.flatMap((sseqItem) =>
  //     sseqItem
  //       .map((sense) => {
  //         const senseLabel = sense[1]?.sls;
  //         const obj = extractDefinitionAndExample(sense[1].dt);
  //         (obj as DefinitionsType).senseLabel = senseLabel || null;
  //         return obj;
  //       })
  //       .filter(
  //         (entry): entry is DefinitionsType =>
  //           !!entry
  //       )
  //   );

  //   meanings.push({
  //     partOfSpeech: data[index].fl,
  //     definitions
  //   });
  // });
  // return {
  //   [type]: entry,
  //   audio: null,
  //   meanings
  // } as EntrySchemaFormat;
};

// import {
//   DefinitionType,
//   RawEntryData,
//   EntrySchemaFormat,
// } from "@/types";

// type EntryType = "phrasalVerb" | "idiom";

// export const convertToEntrySchemaFormat = (
//   data: RawEntryData[],
//   entry: string,
//   type: EntryType
// ): EntrySchemaFormat | null => {

//   const entryIndex = data.findIndex((item) => {

//     console.log(data, "data", item.meta?.stems, "stems data", entry, "entry");
//     return item.meta?.stems?.includes(entry.toLowerCase());
//   }
//   );

//   if (entryIndex === -1) {
//     console.log(`${type} "${entry}" not found in the data.33`);
//     return null;
//   }

//   // For both idioms and phrasal verbs, assume similar structure
//   const entryArr = (data[entryIndex] as RawEntryData).dros;

//   const entryDataIndex = entryArr.findIndex(
//     (item) => item.drp === entry
//   );
//   if (entryDataIndex === -1) {
//     console.log(`${type} "${entry}" not found in the data.2`);
//     return null;
//   }

//   const rawEntryData = entryArr[entryDataIndex];

//   if (!rawEntryData || !rawEntryData.def?.[0]?.sseq) {
//     console.log(`Definition data is missing for "${entry}".`);
//     return null;
//   }

//   let senseLabel;
//   const definitions = rawEntryData.def[0].sseq.flatMap((sseqItem) =>
//     sseqItem
//       .map((sense) => {
//         senseLabel = sense[0] === "sense" ? sense[1]?.sls : null;
//         return extractDefinitionAndExample(sense[1].dt);
//       })
//       .filter(
//         (entry): entry is { definition: string; example: string | null } =>
//           !!entry
//       )
//   );

//   return {
//     [type]: rawEntryData.drp,
//     audio: null,
//     partOfSpeech: data[entryIndex].fl,
//     senseLabel,
//     definitions,
//   } as EntrySchemaFormat;
// };

// const extractDefinitionAndExample = (
//   dt: DefinitionType[] | undefined
// ): {
//   definition: string;
//   example: string | null;
// } | null => {
//   const defEntry = dt?.find((entry) => entry[0] === "text");
//   if (!defEntry || typeof defEntry[1] !== "string") return null;

//   const visEntry = dt?.find((entry) => entry[0] === "vis");

//   const definition = defEntry[1];
//   const example =
//     visEntry && Array.isArray(visEntry[1]) && visEntry[1][0]?.t
//       ? visEntry[1][0].t
//       : null;
//   if (definition && !example) {
//     console.log(`Definition has no example for.`);

//   }
//   return { definition, example };
// };

//Phrasal verb and idiom are different in the below code

// import {
//   DefinitionType,
//   PhrasalVerbSchemaFormat,
//   RawPhrasalVerbData,
// } from "@/types";

// export const convertToPhrasalVerbSchemaFormat = (
//   data: RawPhrasalVerbData[],
//   phrasalVerb: string
// ): PhrasalVerbSchemaFormat | null => {
//   const pvIndex = data.findIndex((item) =>
//     item.meta?.stems?.includes(phrasalVerb)
//   );

//   if (pvIndex == -1) {
//     console.log(`Phrasal verb "${phrasalVerb}" not found in the data.`);
//     return null;
//   }

//   const pVDataIndex = data[pvIndex].dros.findIndex(
//     (item) => item.drp === phrasalVerb
//     // && item.gram === "phrasal verb"
//   );
//   if (pVDataIndex == -1) {
//     console.log(`Phrasal verb "${phrasalVerb}" not found in the data.`);
//     return null;
//   }

//   const rawPVData = data[pvIndex].dros[pVDataIndex];

//   if (!rawPVData || !rawPVData.def?.[0]?.sseq) {
//     console.log(`Definition data is missing for "${phrasalVerb}".`);
//     return null;
//   }
//   let senseLabel;
//   const definitions = rawPVData.def[0].sseq.flatMap((sseqItem) =>
//     sseqItem
//       .map((sense) => {
//         senseLabel = sense[0] === "sense" ? sense[1]?.sls : null;
//         return extractDefinitionAndExample(sense[1].dt);
//       })
//       .filter(
//         (entry): entry is { definition: string; example: string | null } =>
//           !!entry
//       )
//   );

//   return {
//     phrasalVerb: rawPVData.drp,
//     audio: null,
//     partOfSpeech: rawPVData.gram,
//     senseLabel,
//     definitions,
//   };
// };

// const extractDefinitionAndExample = (
//   dt: DefinitionType[] | undefined
// ): {
//   definition: string;
//   example: string | null;
// } | null => {
//   const defEntry = dt?.find((entry) => entry[0] === "text");
//   if (!defEntry || typeof defEntry[1] !== "string") return null;

//   const visEntry = dt?.find((entry) => entry[0] === "vis");

//   const definition = defEntry[1];
//   const example =
//     visEntry && Array.isArray(visEntry[1]) && visEntry[1][0]?.t
//       ? visEntry[1][0].t
//       : null;

//   return { definition, example };
// };
