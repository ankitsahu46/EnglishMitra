import { model, models, Schema } from "mongoose";


const OfTheDayListSchema = new Schema({
  words: { type: [String], default: [] },
  phrasalVerbs: { type: [String], default: [] },
  idioms: { type: [String], default: [] },
  // phrases: { type: [String], default: [] },
});

export const OfTheDayList = models.OfTheDayList || model('OfTheDayList', OfTheDayListSchema);