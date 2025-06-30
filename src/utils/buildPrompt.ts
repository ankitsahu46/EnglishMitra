export const buildPrompt = (
  word: string,
  definition: string,
  pos: string | null
): string => `Given an expression (phrasal-verb or idiom), its definition, and part of speech, return a simple example sentence.

Return this JSON:
{
  "example": "your example here"
}

Word: "${word}"
Definition: "${definition}"
Part of speech: ${pos}`;