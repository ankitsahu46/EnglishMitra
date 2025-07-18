import { RawWordData, WordSchemaFormat } from "@/types";

export const convertToWordSchemaFormat = (
  data: RawWordData
): WordSchemaFormat => {
  let audio = "";
  let phonetic = data.phonetic || "";

  const USPhonetics = data.phonetics?.find((p) => p.audio?.endsWith("us.mp3"));

  if (USPhonetics) {
    audio = USPhonetics.audio || "";
    phonetic = USPhonetics.text || phonetic;
  }

  const meanings = data.meanings.map((meaning) => ({
    partOfSpeech: meaning.partOfSpeech,
    definitions: meaning.definitions.map((def) => ({
      definition: def.definition,
      example: def.example || "",
      synonyms: def.synonyms || [],
      antonyms: def.antonyms || [],
    })),
    synonyms: meaning.synonyms || [],
    antonyms: meaning.antonyms || [],
  }));

  return {
    word: data.word,
    phonetic,
    audio,
    meanings,
  };
};
