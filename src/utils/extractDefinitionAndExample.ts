import { DefinitionType, SimpleDefinition } from "@/types";
import { generateAIExample } from "./generateAIExample";

export const extractDefinitionAndExample = async (
  dt: DefinitionType[] | undefined,
  expression: string,
  partOfSpeech: string | null
): Promise<SimpleDefinition | null> => {
  const defEntry = dt?.find((entry) => entry[0] === "text");
  if (!defEntry || typeof defEntry[1] !== "string") return null;

  const visEntry = dt?.find((entry) => entry[0] === "vis");
  const definition = defEntry[1];
  let example =
    visEntry && Array.isArray(visEntry[1]) && visEntry[1][0]?.t
      ? visEntry[1][0].t
      : null;

  //generating examples using AI if missing
  if (definition && !example) {
    console.log(`Definition has no example for.`);

    const prompt = `Given an expression(phrasal-verb or idiom), its definition, and part of speech, return a simple example sentence according to the definition and part of speech. Return in this JSON format:
  
  {
    "example": "your example here",
  }
  
  Word: "${expression}"
  Definition: "${definition}"
  Part of speech: ${partOfSpeech}`;

    example = await generateAIExample(prompt);
  }
  return { definition, example };
};
