import {
  EntryData,
  ExpressionCommonData,
  ExpressionData,
  ExpressionType,
  StandardExpData,
  WordData,
} from "@/types";
import { convertMeaningsToDefinitions } from "@/utils";

export const convertToStandardExpData = (
  data: ExpressionData,
  type: ExpressionType
): StandardExpData => {
  const isWord = type === "word";
  const { meanings, audio } = data;
  const { definitions, synonyms, antonyms } =
    convertMeaningsToDefinitions(meanings);

  const commonData: ExpressionCommonData = {
    text: isWord
      ? (data as WordData).word
      : (data as EntryData).idiom ?? (data as EntryData).phrasalVerb ?? "",
    phonetic: isWord ? (data as WordData).phonetic ?? null : null,
    audio: audio ?? null,
    synonyms,
    antonyms,
  };

  return { commonData, definitions };
};
