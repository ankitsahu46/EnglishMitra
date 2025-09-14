import { Idiom, PhrasalVerb } from "@/models";

export type ModelType = typeof Idiom | typeof PhrasalVerb;
export type EntryType = "phrasalVerb" | "idiom";
export interface FetchEntryDataOptions {
  entry: string;
  type: EntryType;
  model: ModelType;
}
