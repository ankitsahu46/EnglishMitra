import { model, models, Schema } from "mongoose";
import { MeaningSchema } from "./sharedSchema";

const PhrasalVerbSchema = new Schema({
  phrasalVerb: { type: String, required: true },
  audio: { type: String, default: null },
  meanings: { type: [MeaningSchema], required: true },
});

export const PhrasalVerb =
  models.PhrasalVerb || model("PhrasalVerb", PhrasalVerbSchema);