// import { RawEntryData } from "@/types";
// import { extractDefinitions } from "./extractEntryDefinitions";

// export const findInDros = (entryArr: RawEntryData["dros"], entry: string, fl: string) => {
//   console.log("entryarr", entryArr,  "entry", entry, "fl", fl,"findInDros" );

//   if (!Array.isArray(entryArr)) return [];
//   const entryData = entryArr.find((item) => item.drp === entry.toLowerCase());
//   console.log("entryData  findInDros", entryData);
//   if (entryData && entryData.def?.[0]?.sseq) {
//     console.log("entryData && entryData.def?.[0]?.sseq, findInDros");
//     return extractDefinitions(entryData.def[0].sseq, entry, fl);
//   }
//   return [];
// }

import { RawEntryData, DefinitionsType, SenseBlock } from "@/types";
import { searchDtForVis } from "./searchDtForVis";

export const findInDros = (
  entryArr: RawEntryData["dros"],
  entry: string
): DefinitionsType[] => {
  const definitionsWithExamples: DefinitionsType[] = [];

  if (!entryArr) return definitionsWithExamples;

  const normalizedEntry = entry.toLowerCase();

  for (const dro of entryArr) {
    const variants = [
      dro.drp?.toLowerCase(),
      ...(dro.vrs?.map((v) => v.va?.toLowerCase()) || []),
    ].filter(Boolean);
    // console.log("variants in findInDros", variants);
    const isMatched = variants.some((variant) => variant === normalizedEntry);
    // if (dro.drp.toLowerCase() !== entry.toLowerCase()) continue;

    for (const defBlock of dro.def) {
      for (const sseq of defBlock.sseq) {
        for (const senseItem of sseq) {
          // const senseType = (senseItem as SenseBlock)[0];
          const senseData = (senseItem as SenseBlock)[1];
          if (!senseData?.dt) continue;
          const senseLabel = senseData.sls;
          // console.log("senseData, dt" ,senseData.dt)
          searchDtForVis(
            isMatched ? "" : normalizedEntry,
            senseData.dt,
            definitionsWithExamples,
            senseLabel
          );
        }
      }
    }
  }
  console.log("definitonwith example", definitionsWithExamples);
  return definitionsWithExamples;
};

// import { RawEntryData, DefinitionsType, SenseBlock } from "@/types";
// import { searchDtForVis } from "./searchDtForVis";

// export const findInDros = (
//   entryArr: RawEntryData["dros"],
//   entry: string
// ): DefinitionsType[] => {
//   const definitionsWithExamples: DefinitionsType[] = [];

//   if (!entryArr) return definitionsWithExamples;

//   const normalizedEntry = entry.toLowerCase();

//   for (const dro of entryArr) {
//     const variants = [
//       dro.drp?.toLowerCase(),
//       ...(dro.vrs?.map((v) => v.va?.toLowerCase()) || []),
//     ].filter(Boolean);
//     // console.log("variants in findInDros", variants);
//     if (!variants.some((variant) => variant === normalizedEntry)) {
//       // console.log("variant not found in findInDros", variants, normalizedEntry, variants.find((variant) => variant === normalizedEntry), "an");
//       continue;
//     }
//     // if (dro.drp.toLowerCase() !== entry.toLowerCase()) continue;

//     for (const defBlock of dro.def) {
//       for (const sseq of defBlock.sseq) {
//         for (const senseItem of sseq) {
//           // const senseType = (senseItem as SenseBlock)[0];
//           const senseData = (senseItem as SenseBlock)[1];
//           if (!senseData?.dt) continue;
//           const senseLabel = senseData.sls;
//           // console.log("senseData, dt" ,senseData.dt)
//           searchDtForVis(
//             normalizedEntry,
//             senseData.dt,
//             definitionsWithExamples,
//             senseLabel
//           );
//         }
//       }
//     }
//   }
//   console.log("definitonwith example", definitionsWithExamples)
//   return definitionsWithExamples;
// };
