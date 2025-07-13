import { model, models, Schema } from "mongoose";
import { MeaningSchema } from "./sharedSchema";

const IdiomSchema = new Schema(
  {
    idiom: { type: String, required: true, unique: true },
    audio: { type: String, default: null },
    meanings: { type: [MeaningSchema], required: true },
  },
  { timestamps: true }
);

export const Idiom = models.Idiom || model("Idiom", IdiomSchema);
