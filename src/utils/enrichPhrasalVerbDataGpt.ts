
// // using Chatgpt AI for enriching word data

// // import { PhrasalVerbSchemaFormat } from '@/types';
// // import OpenAI from 'openai';

// // const openai = new OpenAI({
// //   apiKey: process.env.OPENAI_API_KEY,
// // });

// // export const enrichWordDataGpt = async (phrasalVerbData: PhrasalVerbSchemaFormat) => {
// //   const phrasalVerb = phrasalVerbData.phrasalVerb;
// //   const definition = phrasalVerbData.definitions[0].definition;
// //     const prompt = `Given a phrasal-verb and its definition, return a simple example sentence and a simpler version of the definition. Keep it short. Return in this JSON format:

// // {
// //   "example": "your example here",
// //   "simple_definition": "your simpler definition here"
// // }

// // phrasalVerb: "${phrasalVerb}"
// // Definition: "${definition}"`;

// //   try {
// //     const response = await openai.chat.completions.create({
// //       model: 'gpt-3.5-turbo',
// //       messages: [
// //         {
// //           role: 'user',
// //           content: prompt,
// //         },
// //       ],
// //       temperature: 0.5,
// //     });

// //     const message = response.choices?.[0]?.message?.content;
// //     console.log("open ai message: ", message);
// //     let parse;
// //     try {
// //       parse = JSON.parse(message || "{}");

// //       console.log("Parsed response:", parse);
// //       if (parse?.example) phrasalVerbData.definitions[0].example = parse.example;
// //       if (parse?.definition) phrasalVerbData.definitions[0].definition = parse.definition;
// //     } catch (error) {
// //       console.error("parse error:", error);
// //       return undefined;
// //     }

// //     return phrasalVerbData;
// //   } catch (error) {
// //     console.error("Error fetching data from OpenAI:", error);
// //     return undefined;
// //   }
// // }










// // using Cohere AI for enriching word data


// import { PhrasalVerbSchemaFormat } from '@/types';
// import { CohereClient } from 'cohere-ai';

// const cohere = new CohereClient({
//   token: process.env.COHERE_API_KEY!,
// });

// export const enrichPhrasalVerbDataGpt = async (phrasalVerbData: PhrasalVerbSchemaFormat) => {
//   const phrasalVerb = phrasalVerbData.phrasalVerb;
//   const definition = phrasalVerbData.definitions[0].definition;

//   const prompt = `Given a phrasal-verb and its definition, return a simple example sentence and a simpler version of the definition. Keep it short. Return in this JSON format:

// {
//   "example": "your example here",
//   "simple_definition": "your simpler definition here"
// }

// phrasalVerb: "${phrasalVerb}"
// Definition: "${definition}"`;

//   try {
//     const response = await cohere.generate({
//       model: 'command-r-plus', // or 'command-r', 'command-light' based on availability
//       prompt,
//       temperature: 0.5,
//       maxTokens: 150,
//     });

//     const message = response.generations?.[0]?.text.trim();
//     console.log("Cohere message:", message);

//     let parse;
//     try {
//       parse = JSON.parse(message || '{}');

//       if (parse?.example) phrasalVerbData.definitions[0].example = parse.example;
//       if (parse?.simple_definition) phrasalVerbData.definitions[0].definition = parse.simple_definition;
//     } catch (error) {
//       console.error('Parse error:', error);
//       return undefined;
//     }

//     return phrasalVerbData;
//   } catch (error) {
//     console.error('Error fetching data from Cohere:', error);
//     return undefined;
//   }
// };
