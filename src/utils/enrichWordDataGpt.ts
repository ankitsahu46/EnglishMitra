import { defExampleArr, WordSchemaFormat } from "@/types";
import { generateFromAI } from "./generateFromAI";
import { generateImageArrayFromTagsArray } from "./generateImageArrayFromTagsArray";

export const enrichWordDataGpt = async (wordData: WordSchemaFormat) => {
  try {
    const { defsNeedingExample, defsWithExample } =
      separateDefinitions(wordData);

    if (defsWithExample.length === 0 && defsNeedingExample.length === 0) {
      return wordData;
    }

    const prompt = buildPrompt(wordData, defsWithExample, defsNeedingExample);
    const aiResponse = await generateFromAI(prompt);

    const { tagsForExisting, generatedExamples } = parseAIResponse(
      aiResponse || "",
      defsWithExample,
      defsNeedingExample
    );

    defsWithExample.forEach((item, i) => {
      const tags = tagsForExisting[i];
      wordData.meanings[item.mIdx].definitions[item.idx].tags = Array.isArray(
        tags
      )
        ? tags.map((tag) => String(tag).trim()).filter(Boolean)
        : [];
    });

    defsNeedingExample.forEach((item, i) => {
      const { example, tags } = generatedExamples[i] || {
        example: "",
        tags: [],
      };
      wordData.meanings[item.mIdx].definitions[item.idx].example = example;
      wordData.meanings[item.mIdx].definitions[item.idx].tags = Array.isArray(
        tags
      )
        ? tags.map((tag) => String(tag).trim()).filter(Boolean)
        : [];
    });

    const allTags: string[][] = [];
    wordData.meanings.forEach((meaning) => {
      meaning.definitions.forEach((def) => {
        allTags.push(def.tags ?? []);
      });
    });

    const imageArray = await generateImageArrayFromTagsArray(allTags);

    let defCounter = 0;
    wordData.meanings.forEach((meaning) => {
      meaning.definitions.forEach((def) => {
        def.images = Array.isArray(imageArray[defCounter])
          ? imageArray[defCounter]
          : [];
        defCounter++;
      });
    });

    return wordData;
  } catch (error) {
    console.log("Error enriching word data:", error);
    return null;
  }
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
const separateDefinitions = (wordData: WordSchemaFormat) => {
  const defsNeedingExample: defExampleArr[] = [];
  const defsWithExample: defExampleArr[] = [];

  wordData.meanings.forEach((meaning, mIdx) => {
    meaning.definitions.forEach((def, idx) => {
      if (!def.example || def.example.trim() === "") {
        defsNeedingExample.push({ def, idx, mIdx });
      } else {
        defsWithExample.push({ def, idx, mIdx });
      }
    });
  });

  return { defsNeedingExample, defsWithExample };
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
const buildPrompt = (
  wordData: WordSchemaFormat,
  defsWithExample: defExampleArr[],
  defsNeedingExample: defExampleArr[]
): string => {
  const prompt = `You are an AI assistant that supports vocabulary learning through visual image tagging.
  
Your task has two parts:

---

**PART 1: For Existing Example Sentences**

For each sentence provided, generate 3–5 short, relevant, comma-separated tags that represent the main visual ideas, actions, or objects.

➡️ Output Format:
"exampleTags": [
  ["tag1", "tag2", "tag3"],
  ...
]

If no sentences are provided, return an empty array for "exampleTags".

Example Sentences:
${
  defsWithExample.length > 0
    ? defsWithExample
        .map((item, i) => `${i + 1}. ${item.def.example}`)
        .join("\n")
    : "None"
}

---

**PART 2: For Definitions Needing Examples**

For each vocabulary item, do the following:
1. Create a simple, clear example sentence based on the word, definition, and part of speech.
2. Generate 3–5 relevant, comma-separated tags for image search from that sentence.

➡️ Output Format:
"generatedExamples": [
  {
    "example": "Your sentence here",
    "tags": ["tag1", "tag2", "tag3"]
  },
  ...
]

If there are no definitions needing examples, return an empty array for "generatedExamples".

Vocabulary Items:
${
  defsNeedingExample.length > 0
    ? defsNeedingExample
        .map(
          (item, i) =>
            `${i + 1}. Word: "${wordData.word}"\nDefinition: "${
              item.def.definition
            }"\nPart of Speech: "${wordData.meanings[item.mIdx].partOfSpeech}"`
        )
        .join("\n\n")
    : "None"
}

---

⚠️ Return a JSON object containing **both keys**:
{
  "exampleTags": [...],
  "generatedExamples": [...]
}
Strictly follow this structure.
`;

  return prompt || "";
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

function parseAIResponse(
  aiResponse: string,
  defsWithExample: defExampleArr[],
  defsNeedingExample: defExampleArr[]
) {
  try {
    const parsed = JSON.parse(aiResponse);
    const tagsForExisting = Array.isArray(parsed.exampleTags)
      ? parsed.exampleTags
      : [];
    const generatedExamples = Array.isArray(parsed.generatedExamples)
      ? parsed.generatedExamples
      : [];
    return { tagsForExisting, generatedExamples };
  } catch {
    return {
      tagsForExisting: defsWithExample.map(() => []),
      generatedExamples: defsNeedingExample.map(() => ({
        example: "",
        tags: [],
      })),
    };
  }
}