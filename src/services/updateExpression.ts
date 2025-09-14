import { Idiom, PhrasalVerb, Word } from "@/models";
import { UpdateDoc, ExpressionDefinitions } from "@/types";
import { convertDefinitionsToMeanings } from "@/utils";

interface UpdateExpressionInput {
  type: "word" | "idiom" | "phrasalVerb";
  text: string;
  definitions: ExpressionDefinitions[];
  phonetic?: string;
  audio?: string;
}

export async function updateExpression({
  type,
  text,
  definitions,
  phonetic,
  audio
}: UpdateExpressionInput) {
  const meanings = convertDefinitionsToMeanings(definitions);

  let Model;
  let queryField: string;
  let updateDoc: UpdateDoc;

  switch (type) {
    case "word":
      Model = Word;
      queryField = "word";
      updateDoc = { phonetic: phonetic ?? null, audio: audio ?? null, meanings };
      break;
    case "idiom":
      Model = Idiom;
      queryField = "idiom";
      updateDoc = { audio: audio ?? null, meanings };
      break;
    case "phrasalVerb":
      Model = PhrasalVerb;
      queryField = "phrasalVerb";
      updateDoc = { audio: audio ?? null, meanings };
      break;
    default:
      throw new Error("Invalid type");
  }

  return Model.findOneAndUpdate(
    { [queryField]: text.trim().toLowerCase() },
    { $set: updateDoc },
    { new: true, upsert: true }
  );
}
