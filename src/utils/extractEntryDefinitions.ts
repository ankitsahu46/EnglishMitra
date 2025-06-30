import { DefinitionsType, SenseBlock } from "@/types";
import { extractDefinitionAndExample } from "@/utils";

export const extractDefinitions = async (
  sseq: SenseBlock[][],
  entry: string,
  partOfSpeech: string | null
): Promise<DefinitionsType[]> => {
  const definitions: DefinitionsType[] = [];

  for (const item of sseq) {
    for (const sense of item) {
      const senseData = sense[1];
      const senseLabel = senseData?.sls ?? undefined;
      const defObj = await extractDefinitionAndExample(
        senseData?.dt,
        entry,
        partOfSpeech
      );
      if (defObj) {
        definitions.push({ ...defObj, senseLabel });
      }
    }
  }

  return definitions;
};
