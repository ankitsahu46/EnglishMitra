import { Definition, DefinitionType } from "@/types";
import { generateAIExample, buildPrompt } from "@/utils";

export const extractDefinitionAndExample = async (
  dt: DefinitionType[] | undefined,
  expression: string,
  partOfSpeech: string | null
): Promise<Definition | null> => {
  if (!dt) return null;

  const defEntry = dt?.find((entry) => entry[0] === "text");
  if (!defEntry || typeof defEntry[1] !== "string") return null;
  
  const visEntry = dt?.find((entry) => entry[0] === "vis");
  const definition = defEntry[1];
  
  const example =
      visEntry && Array.isArray(visEntry[1]) && visEntry[1][0]?.t
        ? visEntry[1][0].t
        : null;

  const finalExample =
    example ||
    (await generateAIExample(
      buildPrompt(expression, definition, partOfSpeech)
    ));

  return { definition, example: finalExample , tags: [], images: [] };
};
