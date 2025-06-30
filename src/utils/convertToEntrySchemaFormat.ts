import {
  RawEntryData,
  EntrySchemaFormat,
  EntryMeaningsType,
  EntryType,
  DefinitionsType,
} from "@/types";
import {
  enrichDefinitionsWithTagsAndImages,
  findInDefExamples,
  findInDros,
} from "@/utils";

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
    const defArr = (data[idx] as RawEntryData).def;
    let definitionsWithExamples: DefinitionsType[] = [];

    // 1. Try dros first
    definitionsWithExamples = findInDros(entryArr, entry);
    // console.log("definitionsWithExamples in convertToEntrySchemaFormat", definitionsWithExamples);
    // 2. If not found in dros, search in def for examples containing the idiom
    if (definitionsWithExamples.length === 0) {
      definitionsWithExamples = findInDefExamples(defArr, entry, definitionsWithExamples);
    }
    // console.log("2 definitionsWithExamples in convertToEntrySchemaFormat 2", definitionsWithExamples);
    
    if (definitionsWithExamples.length === 0) continue;
    
    // console.log("3 definitionsWithExamples in convertToEntrySchemaFormat", definitionsWithExamples);
    console.log("running ai");
    const definitions = await enrichDefinitionsWithTagsAndImages(
      definitionsWithExamples
    );
    console.log("running ai 2");
    
    // console.log("definitions in convertToEntrySchemaFormat", definitions);
    meanings.push({
      partOfSpeech: data[idx].fl,
      definitions,
    });
    // console.log("meanings in convertToEntrySchemaFormat", meanings);
  }

  if (meanings.length === 0) {
    console.log(`No valid meanings found for "${entry}".`);
    return null;
  }

  return {
    [type]: entry,
    audio: null,
    meanings,
  } as EntrySchemaFormat;
};



















// //   //for phrasal verb and idioms;

// import {
//   RawEntryData,
//   EntrySchemaFormat,
//   EntryMeaningsType,
//   EntryType,
//   DefinitionsType,
// } from "@/types";
// import {
//   extractDefinitions,
//   enrichDefinitionsWithTagsAndImages,
// } from "@/utils";

// export const convertToEntrySchemaFormat = async (
//   data: RawEntryData[],
//   entry: string,
//   type: EntryType
// ): Promise<EntrySchemaFormat | null> => {
//   if (!Array.isArray(data) || !entry || !type) return null;

//   const matchingIndexes = data
//     .map((item, idx) =>
//       item.meta?.stems?.includes(entry.toLowerCase()) ? idx : -1
//     )
//     .filter((idx) => idx !== -1);

//   if (matchingIndexes.length === 0) {
//     console.log(`${type} "${entry}" not found in data.`);
//     return null;
//   }

//   const meanings: EntryMeaningsType[] = [];

//   for (const idx of matchingIndexes) {
//     const entryArr = (data[idx] as RawEntryData).dros;
//     let definitionsWithExamples: DefinitionsType[] = [];

//     // 1. Try dros first
//     const entryData = Array.isArray(entryArr)
//       ? entryArr.find((item) => item.drp === entry)
//       : undefined;

//     if (entryData && entryData.def?.[0]?.sseq) {
//       definitionsWithExamples = await extractDefinitions(
//         entryData.def[0].sseq,
//         entry,
//         data[idx].fl
//       );
//     }

//     // 2. If not found in dros, search in def for examples containing the idiom
//     if (definitionsWithExamples.length === 0) {
//       const defArr = (data[idx] as RawEntryData).def;
//       if (Array.isArray(defArr)) {
//         for (const defItem of defArr) {
//           if (!defItem?.sseq) continue;
//           for (const sseqItem of defItem.sseq) {
//             for (const sense of sseqItem) {
//               const senseObj = sense[1];
//               if (!senseObj?.dt) continue;

//               // Find all examples (vis) in dt
//               const visEntry = senseObj.dt.find((d) => d[0] === "vis");
//               if (visEntry && Array.isArray(visEntry[1])) {
//                 for (const vis of visEntry[1]) {
//                   if (
//                     vis?.t &&
//                     vis.t.toLowerCase().includes(entry.toLowerCase())
//                   ) {
//                     // Extract definition (text)
//                     const defEntry = senseObj.dt.find((d) => d[0] === "text");
//                     const definition =
//                       defEntry && typeof defEntry[1] === "string"
//                         ? defEntry[1]
//                         : null;
//                     const example = vis.t;
//                     if (definition && example) {
//                       definitionsWithExamples.push({
//                         definition,
//                         example,
//                       });
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }

//     if (definitionsWithExamples.length === 0) continue;

//     const definitions = await enrichDefinitionsWithTagsAndImages(
//       definitionsWithExamples
//     );

//     meanings.push({
//       partOfSpeech: data[idx].fl,
//       definitions,
//     });
//   }

//   if (meanings.length === 0) {
//     console.log(`No valid meanings found for "${entry}".`);
//     return null;
//   }

//   return {
//     [type]: entry,
//     audio: null,
//     meanings,
//   } as EntrySchemaFormat;
// };
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//   //for phrasal verb and idioms;

// import {
//   RawEntryData,
//   EntrySchemaFormat,
//   EntryMeaningsType,
//   EntryType,
// } from "@/types";
// import {
//   extractDefinitions,
//   enrichDefinitionsWithTagsAndImages,
// } from "@/utils";

// export const convertToEntrySchemaFormat = async (
//   data: RawEntryData[],
//   entry: string,
//   type: EntryType
// ): Promise<EntrySchemaFormat | null> => {
//   if (!Array.isArray(data) || !entry || !type) return null;

//   const matchingIndexes = data
//     .map((item, idx) =>
//       item.meta?.stems?.includes(entry.toLowerCase()) ? idx : -1
//     )
//     .filter((idx) => idx !== -1);

//   if (matchingIndexes.length === 0) {
//     console.log(`${type} "${entry}" not found in data.`);
//     return null;
//   }

//   const meanings: EntryMeaningsType[] = [];

//   for (const idx of matchingIndexes) {
//     const entryArr = (data[idx] as RawEntryData).dros;
//     if (!Array.isArray(entryArr)) continue;

//     const entryData = entryArr.find((item) => item.drp === entry);
//     if (!entryData || !entryData.def?.[0]?.sseq) continue;

//     const definitionsWithExamples = await extractDefinitions(
//       entryData.def[0].sseq,
//       entry,
//       data[idx].fl
//     );

//     const definitions = await enrichDefinitionsWithTagsAndImages(
//       definitionsWithExamples
//     );

//     meanings.push({
//       partOfSpeech: data[idx].fl,
//       definitions,
//     });
//   }

//   if (meanings.length === 0) {
//     console.log(`No valid meanings found for "${entry}".`);
//     return null;
//   }

//   return {
//     [type]: entry,
//     audio: null,
//     meanings,
//   } as EntrySchemaFormat;
// };
//.
