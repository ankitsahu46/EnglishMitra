// app/api/word-of-the-day/[day]/route.ts
import connectDB from "@/lib/connectDB";
import { OfTheDayList, Word } from "@/models";
import {
  validateDayParam,
  fetchWordData,
} from "@/utils";

export async function GET(
  _request: Request,
  { params }: { params: { day: string } }
) {
  try {
    // 1. Connect to the database
    await connectDB();

    const prm = await params;
    const day = validateDayParam(prm.day);

    let word = "happy"; //default word

    // 2. Fetch the word list from the database
    const list = await OfTheDayList.findOne();

    if (list && list.words.length > 0) {
      const validDay =
        day > list.words.length
          ? Math.floor(Math.random() * list.words.length) + 1
          : day;
      word = list.words[validDay - 1] || "happy";
    }

    // 3. Check if the word is already cached
    const cachedWord = await Word.findOne({ word });
    if (cachedWord) {
      console.log("Returning the Cached data word fo the day");
      return Response.json({ data: cachedWord }, { status: 200 });
    }

    const result = await fetchWordData(word);

    if (!result || !result.data) {
      const errorMessage = "error" in result ? result.error : "No data found";
      return Response.json(
        { message: errorMessage },
        { status: result.status }
      );
    }
    return Response.json({ data: result.data }, { status: result.status });
  } catch (error) {
    return Response.json(
      { message: "Server error", error: (error as Error).message },
      { status: 500 }
    );
  }
}














// // app/api/word-of-the-day/[day]/route.ts
// import connectDB from "@/lib/connectDB";
// import { zWordDataSchema } from "@/schema";
// import { OfTheDayList, Word } from "@/models";
// import { enrichWordDataGpt } from "@/utils/enrichWordDataGpt";
// import { WordSchemaFormat } from "@/types";
// import {
//   validateDayParam,
//   convertToWordSchemaFormat,
//   generateAudio,
// } from "@/utils";

// export async function GET(
//   _request: Request,
//   { params }: { params: { day: string } }
// ) {
//   try {
//     // 1. Connect to the database
//     await connectDB();

//     const prm = await params;
//     const day = validateDayParam(prm.day);

//     let word = "happy"; //default word

//     // 2. Fetch the word list from the database
//     const list = await OfTheDayList.findOne();

//     if (list && list.words.length > 0) {
//       const validDay =
//         day > list.words.length
//           ? Math.floor(Math.random() * list.words.length) + 1
//           : day;
//       word = list.words[validDay - 1] || "happy";
//     }

//     // 3. Check if the word is already cached
//     const cachedWord = await Word.findOne({ word });
//     if (cachedWord) {
//       console.log("Returning the Cached data word fo the day")
//       return Response.json({ data: cachedWord }, { status: 200 });
//     }

//     // 4. Fetch the word details from the dictionary API
//     const res = await fetch(
//       `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
//     );

//     if (!res.ok) {
//       return Response.json(
//         { message: "Dictionary API failed!" },
//         { status: res.status }
//       );
//     }
//     const data = await res.json();

//     // 5. Validate the response data using zod schema
//     const parsed = zWordDataSchema.safeParse(data);
//     if (!parsed.success) {
//       return Response.json(
//         { message: "Validation Failed", errors: parsed.error.errors },
//         { status: 400 }
//       );
//     }

//     // 6. Convert to internal schema format
//     const wordData = convertToWordSchemaFormat(parsed.data[0]);
//     if (!wordData) {
//       console.error("Failed to convert word data!");
//       return Response.json({ message: "Conversion failed" }, { status: 500 });
//     }

//     // 7. Generate audio if missing
//     if (!wordData.audio) {
//       try {
//         const audioUrl = await generateAudio(word);
//         wordData.audio = audioUrl || null;
//       } catch (error) {
//         console.error("Failed to generate audio:", error);
//       }
//     }

//     // 8. Enrich the word data with GPT and cache it
//     let enrichedWordData: WordSchemaFormat | null = wordData;
//     try {
//       enrichedWordData = await enrichWordDataGpt(wordData);
//       await Word.create(enrichedWordData ?? wordData);
//     } catch (error) {
//       console.error("Failed to cache word data!", error);
//     }

//     // 9. Return the final word data
//     return Response.json({ data: enrichedWordData ?? {} }, { status: 200 });
//   } catch (error) {
//     return Response.json({ message: "Server error", error: (error as Error).message }, { status: 500 });
//   }
// }
