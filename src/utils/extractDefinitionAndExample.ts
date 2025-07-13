import { DefinitionsType, DefinitionType } from "@/types";
import { generateAIExample, buildPrompt } from "@/utils";

export const extractDefinitionAndExample = async (
  dt: DefinitionType[] | undefined,
  expression: string,
  partOfSpeech: string | null
): Promise<DefinitionsType | null> => {
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

  return { definition, example: finalExample };
};


//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.

// import { DefinitionType, SimpleDefinition } from "@/types";
// import { generateAIExample } from "./generateAIExample";
// import { generateTags } from "./generateTagsForExampleImage";

// export const extractDefinitionAndExample = async (
//   dt: DefinitionType[] | undefined,
//   expression: string,
//   partOfSpeech: string | null
// ): Promise<SimpleDefinition | null> => {
//   const defEntry = dt?.find((entry) => entry[0] === "text");
//   if (!defEntry || typeof defEntry[1] !== "string") return null;

//   const visEntry = dt?.find((entry) => entry[0] === "vis");

//   const definition = defEntry[1];
//   let tags: string[] = [];
//   let example =
//       visEntry && Array.isArray(visEntry[1]) && visEntry[1][0]?.t
//         ? visEntry[1][0].t
//         : null;

//   //generating examples using AI if missing
//   if (definition && !example) {
//     const prompt = `Given an expression(phrasal-verb or idiom), its definition, and part of speech, return a simple example sentence according to the definition and part of speech. Return in this JSON format:

//   {
//     "example": "your example here",
//   }

//   Word: "${expression}"
//   Definition: "${definition}"
//   Part of speech: ${partOfSpeech}`;

//     example = await generateAIExample(prompt);
//   }

//   if (example) {
//     tags = (await generateTags(example)) || [];
//   }
//   return { definition, example: example ?? null, tags };
// };
