import { model, models, Schema } from "mongoose";


const WordSchema = new Schema({
  word: {
    type: String,
    required: true,
    unique: true,
  },
  phonetic: String,
  audio: String,
  meanings: [{
    partOfSpeech: String,
    definitions: [
      {
        definition: String,
        example: String,
        synonyms: [String],
        antonyms: [String],
      },
    ],
  }]
})

export const Word = models.Word || model("Word", WordSchema);