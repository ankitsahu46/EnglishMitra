import { DefinitionsType, DefinitionType } from "@/types";

export const searchDtForVis = (
  entry: string,
  dt: DefinitionType[],
  definitionsWithExamples: DefinitionsType[],
  senseLabel: string[] | undefined,
  currentDefinition: string | null = null,
) => {
  let lastDefinition = currentDefinition;
  for (const d of dt) {
    if (d[0] === "text" && typeof d[1] === "string") {
      lastDefinition = d[1];
    }
    if (d[0] === "vis" && Array.isArray(d[1])) {
      for (const vis of d[1]) {
        console.log("vis data from searchForVis", lastDefinition);
        if (vis?.t && vis.t.toLowerCase().includes(entry.toLowerCase())) {
          if (lastDefinition && vis.t) {
            definitionsWithExamples.push({
              definition: lastDefinition,
              example: vis.t,
              senseLabel: senseLabel ?? undefined,
            });
          }
        }
      }
    }
    // Recursively search in "uns" (usage notes) or other nested arrays
    if (d[0] === "uns" && Array.isArray(d[1])) {
      console.log("uns data from searchForVis",d[1]);
      for (const unsBlock of d[1]) {
        searchDtForVis(entry, unsBlock, definitionsWithExamples, senseLabel, lastDefinition);
      }
    }
  }
};
// export const searchDtForVis = (
//   dt: DefinitionType[],
//   currentDefinition: string | null = null
// ) => {
//   let lastDefinition = currentDefinition;
//   for (const d of dt) {
//     if (d[0] === "text" && typeof d[1] === "string") {
//       lastDefinition = d[1];
//     }
//     if (d[0] === "vis" && Array.isArray(d[1])) {
//       for (const vis of d[1]) {
//         if (vis?.t && vis.t.toLowerCase().includes(entry.toLowerCase())) {
//           if (lastDefinition && vis.t) {
//             definitionsWithExamples.push({
//               definition: lastDefinition,
//               example: vis.t,
//               senseLabel: senseData.sls,
//             });
//           }
//         }
//       }
//     }
//     // Recursively search in "uns" (usage notes) or other nested arrays
//     if (d[0] === "uns" && Array.isArray(d[1])) {
//       for (const unsBlock of d[1]) {
//         searchDtForVis(unsBlock, lastDefinition);
//       }
//     }
//   }
// };
