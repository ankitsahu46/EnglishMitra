import { model, models, Schema } from "mongoose";

const uniqueArray = (arr: string[]) => Array.from(new Set(arr));

const OfTheDayListSchema = new Schema(
  {
    words: { type: [String], default: [], set: uniqueArray },
    phrasalVerbs: { type: [String], default: [], set: uniqueArray },
    idioms: { type: [String], default: [], set: uniqueArray },
  },
  {
    timestamps: true,
  }
);

export const OfTheDayList =
  models.OfTheDayList || model("OfTheDayList", OfTheDayListSchema);
