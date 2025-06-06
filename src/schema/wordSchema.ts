import { z } from "zod";

export const zWordDataSchema = z.array(
  z.object({
    word: z.string(),
    phonetic: z.string().optional(),
    phonetics: z.array(
      z.object({
        text: z.string().optional(),
        audio: z.string().optional(),
      })
    ),
    meanings: z.array(
      z.object({
        partOfSpeech: z.string(),
        definitions: z.array(
          z.object({
            definition: z.string(),
            synonyms: z.array(z.string()).optional(),
            antonyms: z.array(z.string()).optional(),
            example: z.string().optional(),
          })
        ),
      })
    ),
  })
);
