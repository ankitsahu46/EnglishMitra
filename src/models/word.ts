import { model, models, Schema } from "mongoose";

const WordSchema = new Schema(
  {
    word: {
      type: String,
      required: true,
      unique: true,
    },
    phonetic: String,
    audio: String,
    meanings: [
      {
        partOfSpeech: String,
        definitions: [
          {
            definition: String,
            example: { type: String, default: null },
            tags: { type: [String], default: [] },
            images: { type: [String], default: [] },
            synonyms: [String],
            antonyms: [String],
          },
        ],
        synonyms: { type: [String], default: [] },
        antonyms: { type: [String], default: [] },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Word = models.Word || model("Word", WordSchema);
