
// // using Chatgpt AI for enriching word data

// import { WordSchemaFormat } from '@/types';


// export const enrichWordDataGpt = async (wordData: WordSchemaFormat) => {
//   const word = wordData.word;
//   const definition = wordData.meanings[0].definitions[0].definition;
//   const partOfSpeech = wordData.meanings[0].partOfSpeech;
//   const prompt = `Given a word, its definition, and part of speech, return a simple example sentence and a simpler version of the definition. Keep it short. Return in this JSON format:

// {
//   "example": "your example here",
//   "simple_definition": "your simpler definition here"
// }

// Word: "${word}"
// Definition: "${definition}"
// Part of speech: ${partOfSpeech}`;

//   try {
//     const response = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages: [
//         {
//           role: 'user',
//           content: prompt,
//         },
//       ],
//       temperature: 0.5,
//     });

//     const message = response.choices?.[0]?.message?.content;
//     console.log("open ai message: ", message);
//     let parse;
//     try {
//       parse = JSON.parse(message || "{}");

//       console.log("Parsed response:", parse);
//       if (parse?.example) wordData.meanings[0].definitions[0].example = parse.example;
//       if (parse?.definition) wordData.meanings[0].definitions[0].definition = parse.definition;
//     } catch (error) {
//       console.error("parse error:", error);
//       return undefined;
//     }

//     return wordData;
//   } catch (error) {
//     console.error("Error fetching data from OpenAI:", error);
//     return undefined;
//   }
// }










// using Cohere AI for enriching word data


import { WordSchemaFormat } from '@/types';
import { generateAIExample } from './generateAIExample';

export const enrichWordDataGpt = async (wordData: WordSchemaFormat) => {
  const word = wordData.word;
  const definition = wordData.meanings[0].definitions[0].definition;
  const partOfSpeech = wordData.meanings[0].partOfSpeech;

  const prompt = `Given a word, its definition, and part of speech, return a simple example sentence according to the definition and part of speech. Return in this JSON format:

{
  "example": "your example here",
}

Word: "${word}"
Definition: "${definition}"
Part of speech: ${partOfSpeech}`;

  try {
    wordData.meanings[0].definitions[0].example = await generateAIExample(prompt);
    console.log(wordData, "word data after enriching the data");
    return wordData;
  } catch (error) {
    console.error('Error fetching data from Cohere:', error);
    return null;
  }
};
