// ===================
// UI Props Interfaces
// ===================
export interface GoBackBtnProps {
  route?: string;
  className?: string;
  children: React.ReactNode;
}

export interface OfTheDayComponentProps {
  data: StandardExpData;
  type: ExpressionType;
  isOfTheDay?: boolean;
}

export interface ContentBlockProps {
  text: string;
  phonetic: string | null;
  audio: string | null;
  partOfSpeech: string | null;
  definition: string;
  example: string;
  tags: string[];
  images: string[];
  senseLabel?: string[] | null;
  groupedSynonyms: Record<string, string[]> | null | undefined;
  groupedAntonyms: Record<string, string[]> | null | undefined;
  synonyms?: string[] | null;
  antonyms?: string[] | null;
}

// ===================
// Word Data Interfaces
// ===================
export interface WordData {
  _id?: string;
  word: string;
  phonetic: string | null;
  audio: string | null;
  meanings: Meaning[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Meaning {
  partOfSpeech?: string | null;
  definitions: Definition[];
  synonyms?: string[] | null;
  antonyms?: string[] | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Definition {
  definition: string;
  example: string | null;
  tags: string[];
  images: string[];
  senseLabel?: string[] | null;
  synonyms?: string[] | null;
  antonyms?: string[] | null;
}

export interface SaveExpressionOptions {
  type: ExpressionType;
  expression: string;
  formattedData: StandardExpData;
}
// ===================
// Entry Data Interfaces
// ===================
export interface EntryData {
  _id?: string;
  phrasalVerb?: string;
  idiom?: string;
  audio: string | null;
  meanings: Meaning[];
}

export interface ExpressionCardLoaderProps {
  type: ExpressionType;
  data: ExpressionData | null;
}
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
export type ExpressionType = "word" | "phrasalVerb" | "idiom";
export type ExpressionData = WordData | EntryData;
export type fieldType = "words" | "idioms" | "phrasalVerbs";

export interface FetchEntryDataOptions {
  entry: string;
  type?: EntryType;
}

export interface FetchEntryResponse {
  success: boolean;
  data: StandardExpData | null;
  message: string;
  error: string | Error | null;
  status: number;
  suggestions: string[];
}
export interface getExpOfTheDayDataOpt {
  type: ExpressionType;
  day: string;
  listField: fieldType;
  defaultValue: string;
}

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

export interface EnrichDefinitionsResult {
  enriched: StandardExpData;
  foundNewData: boolean;
}
export interface StandardExpData {
  commonData: ExpressionCommonData;
  definitions: ExpressionDefinitions[];
}

export interface ExpressionCommonData {
  text: string;
  phonetic: string | null;
  audio: string | null;
  synonyms?: Record<string, string[]> | null;
  antonyms?:  Record<string, string[]> | null;
}

export interface ExpressionDefinitions {
  partOfSpeech: string | null;
  definition: string;
  example: string;
  tags: string[];
  images: string[];
  senseLabel?: string[] | null;
  synonyms?: string[] | null;
  antonyms?: string[] | null;
}
export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error?: string | null;
  message?: string;
  status?: number;
  suggestions?: RawEntryData[] | string[];
}

export interface ExpressionCardProps {
  def: ExpressionDefinitions;
  commonData: ExpressionCommonData;
  idx: number;
}

export interface UpdateDoc {
  phonetic?: string | null;
  audio?: string | null;
  meanings: Array<{
    partOfSpeech: string | null;
    definitions: Array<{
      definition: string;
      example: string;
      tags: string[];
      images: string[];
      senseLabel?: string[] | string | null;
    }>;
    synonyms?: string[];
    antonyms?: string[];
  }>;
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
  def: Definition;
  idx: number;
  mIdx: number;
}
