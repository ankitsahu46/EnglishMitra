import { Idiom, PhrasalVerb } from "@/models";

export interface GoBackBtnProps {
  route?: string;
  className?: string;
  children: React.ReactNode;
}

export interface OfTheDayComponentProps {
  data: WordOfTheDayData | EntryOfTheDayData;
  type: string;
}

export interface WordOfTheDayData {
  _id: string;
  word: string;
  phonetic: string | null;
  audio: string | null;
  meanings: Meaning[];
}

interface Meaning {
  _id: string;
  partOfSpeech: string;
  definitions: Definition[];
}

interface Definition {
  _id: string;
  definition: string;
  example: string | null;
  synonyms: string[];
  antonyms: string[];
}

export interface EntryOfTheDayData {
  _id: string;
  phrasalVerb?: string;
  idiom?: string;
  audio: string | null;
  meanings: EntryMeaningsType[],
}

export interface SimpleDefinition {
  definition: string;
  example: string | null;
}

export interface RawPhonetic {
  text?: string;
  audio?: string;
}

export interface RawDefinition {
  definition: string;
  example?: string;
  synonyms?: string[];
  antonyms?: string[];
}

export interface RawMeaning {
  partOfSpeech: string;
  definitions: RawDefinition[];
}

export interface RawWordData {
  word: string;
  phonetic?: string;
  phonetics?: RawPhonetic[];
  meanings: RawMeaning[];
}

export interface WordSchemaFormat {
  word: string;
  phonetic: string | null;
  audio: string | null;
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      example: string | null;
      synonyms: string[];
      antonyms: string[];
    }[];
  }[];
}

export interface EntrySchemaFormat {
  phrasalVerb?: string;
  idiom?: string;
  audio: string | null;
  meanings: EntryMeaningsType[]
}

export interface EntryMeaningsType {
  partOfSpeech: string | null;
  definitions: DefinitionsType[];
}
// export interface EntrySchemaFormat {
//   phrasalVerb?: string;
//   idiom?: string;
//   audio: string | null;
//   partOfSpeech?: string | null;
//   senseLabel?: string[] | null;
//   definitions: {
//     definition: string;
//     example: string | null;
//   }[];
// }

export interface RawEntryData {
  meta: {
    id: string;
    uuid: string;
    sort: string;
    src: string;
    section: string;
    stems: string[];
    offensive: boolean;
  };
  hwi: {
    hw: string;
    prs?: {
      mw: string;
      sound?: {
        audio: string;
        ref?: string;
        stat?: string;
      };
    }[];
  };
  fl: string;
  ins: {
    if: string;
    seq: string;
    t: string;
  }[];
  def: {
    sseq: unknown; // can be more detailed based on usage
  }[];
  dros: {
    drp: string;
    def: {
      sseq: SenseBlock[][];
    }[];
    gram?: string;
  }[];
  shortdef: string[];
}

export type SenseBlock = ["sense", Sense] | ["sen", Sense]; 

interface Sense {
  sn?: string; 
  sls?: string[]; 
  vrs?: Variant[]; 
  phrasev?: PhraseVariant[]; 
  sphrasev?: { phrs: PhraseVariant[] }; 
  dt?: DefinitionType[]; 
}

interface PhraseVariant {
  pva: string;
  pvl?: string;
}

interface Variant {
  vl: string;
  va: string;
}

export type DefinitionType =
  | ["text", string]
  | ["vis", VisualExample[]]
  | ["uns", UsageNote[][]];


export type DefinitionsType = {
  definition: string,
  example: string | null,
  senseLabel?: string[] | null
}

interface VisualExample {
  t: string;
}

type UsageNote = DefinitionType[]; 

export type EntryType = "phrasalVerb" | "idiom";
export type ModelType = typeof Idiom | typeof PhrasalVerb;

export interface EntryContent {
  text: string;
  audio: string | null;
  partOfSpeech: string;
  definition: string;
  example: string;
  senseLabel: string[] | string | null;
}

export interface FetchEntryDataOptions {
  entry: string;
  type: EntryType;
  model: ModelType;
};