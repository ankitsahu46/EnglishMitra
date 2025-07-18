import { model, models, Schema } from "mongoose";
import { MeaningSchema } from "./sharedSchema";

const PhrasalVerbSchema = new Schema(
  {
    phrasalVerb: { type: String, required: true, unique: true },
    audio: { type: String, default: null },
    meanings: { type: [MeaningSchema], required: true },
  },
  { timestamps: true }
);

export const PhrasalVerb =
  models.PhrasalVerb || model("PhrasalVerb", PhrasalVerbSchema);
