import { Schema } from "mongoose";

export const SimpleDefinitionSchema = new Schema(
  {
    definition: { type: String, required: true },
    example: { type: String, default: null },
    tags: { type: [String], default: [] },
    images: { type: [String], default: [] },
    senseLabel: { type: [String], default: null },
  },
  { _id: false }
);

export const MeaningSchema = new Schema(
  {
    partOfSpeech: { type: String, default: null },
    definitions: { type: [SimpleDefinitionSchema], required: true },
  },
  { _id: false }
);
