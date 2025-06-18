import { prepositions } from "./prespositions";

export const detectExpressionType = (query: string): "word" | "phrasalVerb" | "idiom" => {
  const words = query.trim().toLowerCase().split(/\s+/);
  if (words.length === 1) {
    return "word";
  }
  
  const lastWord = words[words.length - 1];
  if (prepositions.includes(lastWord)) {
    return "phrasalVerb";
  }

  return "idiom";
}




