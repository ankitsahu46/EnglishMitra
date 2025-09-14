import { ExpressionData, ExpressionType, StandardExpData } from "@/types";
import { convertDefinitionsToMeanings } from "@/utils";

export const convertToExpData = ({
  data,
  type,
}: {
  data: StandardExpData;
  type: ExpressionType;
}): ExpressionData => {
  const { text, phonetic, audio, synonyms, antonyms } = data.commonData;

  const expressionData = {
    [type]: text,
    phonetic,
    audio,
    meanings: convertDefinitionsToMeanings(
      data.definitions,
      synonyms,
      antonyms
    ),
  };
  return expressionData;
};
