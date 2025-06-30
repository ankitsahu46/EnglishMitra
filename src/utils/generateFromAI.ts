import { CohereClient } from "cohere-ai";

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY!,
});

export const generateFromAI = async (prompt: string) => {
  if (!prompt) return null;

  try {
    const response = await cohere.generate({
      model: "command-r-plus",
      prompt,
      temperature: 0.7,
      // maxTokens: 150,
    });

    const message = response.generations?.[0]?.text.trim();

    if (!message) {
      console.warn("Cohere returned no generations.");
      return null;
    }

    return message;
  } catch (error) {
    console.error("Error generating examples", error);
    return null;
  }
};









// import OpenAI from 'openai';

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export const generateFromAI = async (prompt: string) => {
//   if (!prompt) return null;

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

//     if (!message) {
//       console.warn("OpenAI returned no generations.");
//       return null;
//     }

//     return message;
//   } catch (error) {
//     console.error("Error generating examples", error);
//     return null;
//   }
// };



