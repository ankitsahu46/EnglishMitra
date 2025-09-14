import {
  RawWordData,
  StandardExpData,
  ExpressionCommonData,
  ExpressionDefinitions,
} from "@/types";

export function formatWordData(
  data: RawWordData
): StandardExpData {
  // Extract US phonetic/audio if available
  const usPhonetic = data.phonetics?.find((p) => p.audio?.endsWith("us.mp3"));
  const phonetic = usPhonetic?.text ?? data.phonetic ?? null;
  const audio = usPhonetic?.audio ?? null;

  const synonymsMap: Record<string, string[]> = {};
  const antonymsMap: Record<string, string[]> = {};
  // Flatten definitions
  const definitions: ExpressionDefinitions[] = data.meanings.flatMap((meaning) =>
    meaning.definitions.map((def) => ({
      partOfSpeech: meaning.partOfSpeech ?? null,
      definition: def.definition,
      example: def.example ?? "",
      tags: [],
      images: [],
      senseLabel: null,
      synonyms: def.synonyms ?? [],
      antonyms: def.antonyms ?? [],
    }))
  );

  // Group synonyms/antonyms by part of speech
  data.meanings.forEach((m) => {
    if (m.synonyms?.length) {
      synonymsMap[m.partOfSpeech] = m.synonyms;
    }
    if (m.antonyms?.length) {
      antonymsMap[m.partOfSpeech] = m.antonyms;
    }
  });

  const commonData: ExpressionCommonData = {
    text: data.word,
    phonetic,
    audio,
    synonyms: Object.keys(synonymsMap).length ? synonymsMap : null,
    antonyms: Object.keys(antonymsMap).length ? antonymsMap : null,
  };

  return { commonData, definitions };
}