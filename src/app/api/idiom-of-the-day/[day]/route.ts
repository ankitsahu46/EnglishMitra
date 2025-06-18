import { Idiom } from "@/models";
import { getEntryOfTheDay } from "@/utils";

export const GET = async (_request: Request, { params }: { params: { day: string } }) => {
  try {
    const paramDay = await params;
    const result = await getEntryOfTheDay({
      type: "idiom",
      day: paramDay.day,
      listField: "idioms",
      defaultValue: "say when",
      model: Idiom,
    });

    if (!result || !result.data) {
      const errorMessage = "error" in result ? result.error : "No data found";
      return Response.json({ message: errorMessage }, { status: result.status });
    }
    return Response.json({ data: result.data }, { status: result.status });
  } catch (error) {
    console.error("Failed to get idiom of the day:", error);
    return Response.json(
      { message: "Internal Server Error", error: (error as Error).message },
      { status: 500 }
    );
  }
};












// import connectDB from "@/lib/connectDB";
// import { Idiom, OfTheDayList } from "@/models";
// import { convertToEntrySchemaFormat, generateAudio, validateDayParam } from "@/utils";

// export const GET = async (  _request: Request, { params }: { params: { day: string } }) => {
//   try {
//     await connectDB();

//     const dayParam = await params;
//     const day = validateDayParam(dayParam.day);

//     // Retrieve the list of idioms from the database
//     const listDoc = await OfTheDayList.findOne();
//     const idioms: string[] = listDoc?.idioms || [];
//     let idiom = "say when"; //default idiom

//     if (idioms.length > 0) {
//       const index =
//         day > idioms.length
//           ? Math.floor(Math.random() * idioms.length)
//           : day - 1;
//       idiom = idioms[index] || "say when";
//     }

//     // Check if the idiom is already cached
//     const cached = await Idiom.findOne({ idiom });
//     if (cached) {
//       return Response.json({ data: cached }, { status: 200 });
//     }

//     // Fetch the idiom details from the dictionary API
//     const apiUrl = `https://dictionaryapi.com/api/v3/references/learners/json/${encodeURIComponent(idiom)}?key=${process.env.DICTIONARY_API_KEY_PV}`;
//     const apiRes = await fetch(apiUrl);

//     if (!apiRes.ok) {
//       return Response.json(
//         { message: "Dictionary API failed!" },
//         { status: apiRes.status }
//       );
//     }
//     const idiomData = await apiRes.json();
//     const formatted = await convertToEntrySchemaFormat(idiomData, idiom, "idiom");

//     if (!formatted) {
//       return Response.json(
//         { message: "Failed to format idiom data" },
//         { status: 500 }
//       )
//     }

//     // Generate audio for the idiom
//     try {
//       formatted.audio = (await generateAudio(idiom, "idiom")) || null;
//     } catch (err) {
//       console.error("Failed to generate audio for idiom:", err);
//     }

//     // Save the idiom to the database
//     try {
//       await Idiom.create(formatted);
//     } catch (err) {
//       console.error("Failed to save the idiom to the database:", err);
//     }

//     return Response.json({ data: formatted }, { status: 200 });
//   } catch (error) {
//     console.error("Failed to get idiom of the day:", error);
//     return Response.json(
//       { message: "Internal Server Error", error: (error as Error).message },
//       { status: 500 }
//     );
//   }
// };
