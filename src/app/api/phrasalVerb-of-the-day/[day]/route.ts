import { PhrasalVerb } from "@/models";
import { getEntryOfTheDay } from "@/utils";

export async function GET(_request: Request, { params }: { params: { day: string } }) {
  try {
    const paramDay = await params;
    const result = await getEntryOfTheDay({
      type: "phrasalVerb",
      day: paramDay.day,
      listField: "phrasalVerbs",
      defaultValue: "wake up",
      model: PhrasalVerb,
    });

    if (result.error) {
      return Response.json({ message: result.error }, { status: result.status });
    }
    return Response.json({ data: result.data }, { status: result.status });
  } catch (error) {
    console.error("Error in GET /api/phrasalVerb-of-the-day/[day]:", error);
    return Response.json(
      { message: "Internal server error", error: (error as Error).message },
      { status: 500 }
    );
  }
}






// import connectDB from "@/lib/connectDB";
// // import { zPhrasalVerbDataSchema } from "@/schema";
// import { OfTheDayList, PhrasalVerb } from "@/models";
// import {
//   validateDayParam,
//   generateAudio,
//   convertToEntrySchemaFormat,
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

//     let phrasalVerb = "wake up"; //default phrasal verb

//     // 2. Fetch the phrasal verb list from the database
//     const list = await OfTheDayList.findOne();

//     if (list && list.phrasalVerbs.length > 0) {
//       const validDay =
//         day > list.phrasalVerbs.length
//           ? Math.floor(Math.random() * list.phrasalVerbs.length)
//           : day-1;
//       phrasalVerb = list.phrasalVerbs[validDay] || "wake up";
//     }


//     // 3. Check if the phrasal verb is already cached
//     const cached = await PhrasalVerb.findOne({ phrasalVerb });
//     if (cached) {
//       return Response.json({ data: cached }, { status: 200 });
//     }


//     // 4. Fetch the phrasal verb details from the dictionary API
//     const res = await fetch(
//       `https://dictionaryapi.com/api/v3/references/learners/json/${encodeURIComponent(phrasalVerb)}?key=${process.env.DICTIONARY_API_KEY_PV}`,
//     );

//     if (!res.ok) {
//       return Response.json(
//         { message: "Dictionary API failed!" },
//         { status: res.status }
//       );
//     }
//     const data = await res.json();

//     // 6. Convert to internal schema format
//     const formatted = convertToEntrySchemaFormat(data, phrasalVerb, "phrasalVerb");
//     if (!formatted) {
//       console.error("Failed to convert phrasal verb data!");
//       return Response.json({ message: "Conversion failed" }, { status: 500 });
//     }

//     // 7. Generate audio for the phrasal verb
//     try {
//       const audioUrl = await generateAudio(phrasalVerb, "phrasalVerb");
//       formatted.audio = audioUrl || null;
//     } catch (error) {
//       console.error("Failed to generate audio:", error);
//     }

//     // 8. Cache the word data.
//     try {
//       await PhrasalVerb.create(formatted);
//     } catch (error) {
//       console.error("Failed to cache phrasal verb data!", error);
//     }


//     // 9. Return the final phrasal verb data
//     return Response.json({ data: formatted || {} }, { status: 200 });
//   } catch (error) {
//     console.log("Error in GET /api/phrasalVerb-of-the-day/[day]:", error);
//     return Response.json({ message: "Internal server error", error: (error as Error).message }, { status: 500 });
//   }
// }