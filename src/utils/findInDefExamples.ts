import { DefinitionsType, RawEntryData } from "@/types";
import { searchDtForVis } from "./searchDtForVis";

export const findInDefExamples = (
  defArr: RawEntryData["def"],
  entry: string,
  definitionsWithExamples: DefinitionsType[]
) => {
  if (!Array.isArray(defArr)) return definitionsWithExamples;
  const normalizedEntry = entry.toLowerCase();
  for (const defItem of defArr) {
    if (!defItem?.sseq) continue;
    for (const sseqItem of defItem.sseq) {
      for (const sense of sseqItem) {
        const senseObj = sense[1];
        if (!senseObj?.dt) continue;

        const senseLabel = senseObj.sls;

        searchDtForVis(
          normalizedEntry,
          senseObj.dt,
          definitionsWithExamples,
          senseLabel
        );
      }
    }
  }

  return definitionsWithExamples;
};
