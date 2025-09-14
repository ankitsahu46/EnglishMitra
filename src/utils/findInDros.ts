import { RawEntryData, Definition, SenseBlock } from "@/types";
import { searchDtForVis } from "./searchDtForVis";

export const findInDros = (
  entryArr: RawEntryData["dros"],
  entry: string
): Definition[] => {
  const definitionsWithExamples: Definition[] = [];

  if (!entryArr) return definitionsWithExamples;

  const normalizedEntry = entry.toLowerCase();

  for (const dro of entryArr) {
    const variants = [
      dro.drp?.toLowerCase(),
      ...(dro.vrs?.map((v) => v.va?.toLowerCase()) || []),
    ].filter(Boolean);

    const isMatched = variants.some((variant) => variant === normalizedEntry);

    for (const defBlock of dro.def) {
      for (const sseq of defBlock.sseq) {
        for (const senseItem of sseq) {
          const senseData = (senseItem as SenseBlock)[1];
          if (!senseData?.dt) continue;
          const senseLabel = senseData.sls;
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
  return definitionsWithExamples;
};
