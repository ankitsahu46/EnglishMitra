import { Idiom, PhrasalVerb } from "@/models";

// ===================
// UI Props Interfaces
// ===================
export interface GoBackBtnProps {
  route?: string;
  className?: string;
  children: React.ReactNode;
}

export interface OfTheDayComponentProps {
  data: WordOfTheDayData | EntryOfTheDayData;
  type: string;
  isOfTheDay?: boolean;
}

export interface ContentBlockProps {
  text: string | undefined;
  phonetic: string | null;
  partOfSpeech: string | null;
  audio: string | null;
  definition: string;
  example: string;
  senseLabel?: string[] | null;
  tags?: string[];
  images?: string[];
  synonyms?: string[];
  antonyms?: string[];
}

// ===================
// Word Data Interfaces
// ===================
export interface WordOfTheDayData {
  _id: string;
  word: string;
  phonetic: string | null;
  audio: string | null;
  meanings: Meaning[];
}

export interface Meaning {
  partOfSpeech?: string;
  definitions: Definition[];
  synonyms?: string[];
  antonyms?: string[];
}

export interface Definition {
  definition: string;
  example: string | null;
  tags?: string[];
  images?: string[];
  synonyms?: string[];
  antonyms?: string[];
}

// ===================
// Entry Data Interfaces
// ===================
export interface EntryOfTheDayData {
  _id: string;
  phrasalVerb?: string;
  idiom?: string;
  audio: string | null;
  meanings: EntryMeaningsType[];
}

export interface EntryMeaningsType {
  partOfSpeech: string | null;
  definitions: DefinitionsType[];
}

export type DefinitionsType = {
  definition: string;
  example: string | null;
  tags?: string[];
  images?: string[];
  senseLabel?: string[];
};

// ===================
// Raw Data Interfaces
// ===================
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
  synonyms?: string[];
  antonyms?: string[];
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
  meanings: Meaning[];
}

export interface EntrySchemaFormat {
  phrasalVerb?: string;
  idiom?: string;
  audio: string | null;
  meanings: EntryMeaningsType[];
}

export interface RawEntryData {
  meta: {
    id: string;
    uuid: string;
    sort?: string;
    src?: string;
    section?: string;
    stems: string[];
    offensive: boolean;
    "app-shortdef"?: {
      hw: string;
      fl: string;
      def: string[];
    };
    target?: {
      tuuid: string;
      tsrc: string;
    };
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
  ins?: {
    il?: string;
    ifc?: string;
    if?: string;
    seq?: string;
    t?: string;
  }[];
  def: {
    sseq: SenseBlock[][];
  }[];
  dros?: {
    drp: string;
    vrs?: { vl?: string; va?: string }[];
    def: {
      sseq: SenseBlock[][];
    }[];
    gram?: string;
  }[];
  shortdef: string[];
}

// ===================
// Dictionary Types
// ===================
export type SenseBlock = ["sense", Sense] | ["sen", Sense];

interface Sense {
  sn?: string; // sense number
  sgram?: string; // sense grammar (e.g., "count", "noncount")
  sls?: string[]; // sense labels
  vrs?: Variant[]; // variants
  phrasev?: PhraseVariant[]; // phrase variants
  sphrasev?: { phrs: PhraseVariant[] }; // subphrase variants
  dt?: DefinitionType[]; // definition text, examples, etc.
  sdsense?: {
    sd: string; // sense division label (e.g., "also")
    dt: DefinitionType[]; // definition text for the sub-sense
  };
  gram?: string;
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
  | ["uns", DefinitionType[][]];

interface VisualExample {
  t: string;
}

export type UsageNote = DefinitionType[];

// ===================
// Entry/Model Types
// ===================
export type EntryType = "phrasalVerb" | "idiom";
export type ModelType = typeof Idiom | typeof PhrasalVerb;

export interface EntryContent {
  text: string;
  audio: string | null;
  partOfSpeech: string;
  definition: string;
  example: string;
  tags?: string[];
  images?: string[];
  senseLabel?: string[];
  // synonyms?: string[];
  // antonyms?: string[];
}

export interface FetchEntryDataOptions {
  entry: string;
  type: EntryType;
  model: ModelType;
}

// ===================
// External API Types
// ===================
export interface UnsplashImage {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3?: string;
  };
}

export interface useGetUnsplashImagesProps {
  sentence: string;
  tags?: string[];
  shouldFetch: boolean;
}

export interface EntryImageComponentProps {
  sentence: string;
  tags?: string[];
  images?: string[];
}

export interface updateExpressionImagesInDBProps {
  expression: string;
  sentence: string;
  type: string;
  images: string[];
}

export interface defExampleArr {
  def: DefinitionsType;
  idx: number;
  mIdx: number;
}

//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
// import { Idiom, PhrasalVerb } from "@/models";

// export interface GoBackBtnProps {
//   route?: string;
//   className?: string;
//   children: React.ReactNode;
// }

// export interface OfTheDayComponentProps {
//   data: WordOfTheDayData | EntryOfTheDayData;
//   type: string;
// }

// export interface WordOfTheDayData {
//   _id: string;
//   word: string;
//   phonetic: string | null;
//   audio: string | null;
//   meanings: Meaning[];
// }

// export interface Meaning {
//   partOfSpeech?: string;
//   definitions: Definition[];
// }

// export interface Definition {
//   definition: string;
//   example: string | null;
//   tags?: string[];
//   synonyms?: string[];
//   antonyms?: string[];
// }

// export interface EntryOfTheDayData {
//   _id: string;
//   phrasalVerb?: string;
//   idiom?: string;
//   audio: string | null;
//   meanings: EntryMeaningsType[],
// }

// export interface RawPhonetic {
//   text?: string;
//   audio?: string;
// }

// export interface RawDefinition {
//   definition: string;
//   example?: string;
//   synonyms?: string[];
//   antonyms?: string[];
// }

// export interface RawMeaning {
//   partOfSpeech: string;
//   definitions: RawDefinition[];
// }

// export interface RawWordData {
//   word: string;
//   phonetic?: string;
//   phonetics?: RawPhonetic[];
//   meanings: RawMeaning[];
// }

// export interface WordSchemaFormat {
//   word: string;
//   phonetic: string | null;
//   audio: string | null;
//   meanings: Meaning[];
// }

// export interface EntrySchemaFormat {
//   phrasalVerb?: string;
//   idiom?: string;
//   audio: string | null;
//   meanings: EntryMeaningsType[]
// }

// export interface EntryMeaningsType {
//   partOfSpeech: string | null;
//   definitions: DefinitionsType[];
// }

// export interface RawEntryData {
//   meta: {
//     id: string;
//     uuid: string;
//     sort: string;
//     src: string;
//     section: string;
//     stems: string[];
//     offensive: boolean;
//   };
//   hwi: {
//     hw: string;
//     prs?: {
//       mw: string;
//       sound?: {
//         audio: string;
//         ref?: string;
//         stat?: string;
//       };
//     }[];
//   };
//   fl: string;
//   ins: {
//     if: string;
//     seq: string;
//     t: string;
//   }[];
//   def: {
//     sseq: unknown; // can be more detailed based on usage
//   }[];
//   dros: {
//     drp: string;
//     def: {
//       sseq: SenseBlock[][];
//     }[];
//     gram?: string;
//   }[];
//   shortdef: string[];
// }

// export type SenseBlock = ["sense", Sense] | ["sen", Sense];

// interface Sense {
//   sn?: string;
//   sls?: string[];
//   vrs?: Variant[];
//   phrasev?: PhraseVariant[];
//   sphrasev?: { phrs: PhraseVariant[] };
//   dt?: DefinitionType[];
// }

// interface PhraseVariant {
//   pva: string;
//   pvl?: string;
// }

// interface Variant {
//   vl: string;
//   va: string;
// }

// export type DefinitionType =
//   | ["text", string]
//   | ["vis", VisualExample[]]
//   | ["uns", UsageNote[][]];

// export type DefinitionsType = {
//   definition: string,
//   example: string | null,
//   tags?: string[],
//   images?: string[],
//   senseLabel?: string[],
// }

// interface VisualExample {
//   t: string;
// }

// type UsageNote = DefinitionType[];

// export type EntryType = "phrasalVerb" | "idiom";
// export type ModelType = typeof Idiom | typeof PhrasalVerb;

// export interface EntryContent {
//   text: string;
//   audio: string | null;
//   partOfSpeech: string;
//   definition: string;
//   example: string;
//   tags?: string[];
//   images?: string[];
//   senseLabel?: string[];
// }

// export interface FetchEntryDataOptions {
//   entry: string;
//   type: EntryType;
//   model: ModelType;
// };

// export interface ContentBlockProps {
//   text: string | undefined;
//   partOfSpeech: string | null;
//   audio: string | null;
//   definition: string;
//   example: string;
//   senseLabel?: string[] | null;
// }

// export interface UnsplashImage {
//   id: string;
//   urls: {
//     raw: string;
//     full: string;
//     regular: string;
//     small: string;
//     thumb: string;
//     small_s3?: string;
//   };
// }
