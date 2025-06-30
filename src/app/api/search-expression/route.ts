import connectDB from "@/lib/connectDB";
import { Idiom, PhrasalVerb, Word } from "@/models";
import { detectExpressionType, fetchEntryData, fetchWordData } from "@/utils";
import { NextRequest } from "next/server";

const COLLECTIONS = [
  { model: Word, type: "word" },
  { model: PhrasalVerb, type: "phrasalVerb" },
  { model: Idiom, type: "idiom" },
];
const MODEL = {
  word: Word,
  phrasalVerb: PhrasalVerb,
  idiom: Idiom,
};

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query")?.trim();

  if (!query) {
    return Response.json(
      {
        success: false,
        data: null,
        message: "Validation error: 'query' parameter is required.",
        error: "Missing query parameter",
      },
      { status: 422 }
    );
  }

  const detectedType = detectExpressionType(query);
  try {
    await connectDB();

    // Try to find in the detected type's collection first
    const data = await MODEL[detectedType].findOne({ [detectedType]: query });

    if (data) {
      return Response.json(
        {
          success: true,
          data,
          type: detectedType,
          message: "Entry found in database.",
        },
        { status: 200 }
      );
    }

    // Try other collections
    for (const { model, type } of COLLECTIONS) {
      if (type === detectedType || !model) continue;
      const data = await model.findOne({ [type]: query });
      if (data) {
        return Response.json(
          {
            success: true,
            data,
            type,
            message: "Entry found in database.",
          },
          { status: 200 }
        );
      }
    }

    // Fallback to external fetchers
    let result;
    if (detectedType === "word") {
      result = await fetchWordData(query);
    } else {
      result = await fetchEntryData({ entry: query });
    }

    // Handle suggestions (array of strings)
    if (
  (!result || !result.data) &&
  Array.isArray(result?.suggestions) &&
  result.suggestions.length > 0
) {
  // console.log("apiData 3", result?.suggestions);
  return Response.json({
    success: false,
    data: null,
    message: result.message || "No data found. Did you mean:",
    suggestions: result.suggestions,
  }, { status: result.status ?? 404 });
}

    return Response.json(
      {
        success: true,
        data: result.data,
        type: detectedType,
        message: "Entry fetched from external source.",
      },
      { status: result.status ?? 200 }
    );
  } catch (error) {
    console.error("Error fetching search results:", error);
    return Response.json(
      {
        success: false,
        data: null,
        message: "Internal server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
};
// //.
// //.
// ///./.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
//






// import connectDB from "@/lib/connectDB";
// import { Idiom, PhrasalVerb, Word } from "@/models";
// import { detectExpressionType, fetchEntryData, fetchWordData } from "@/utils";
// import { NextRequest } from "next/server";

// const COLLECTIONS = [
//   { model: Word, type: "word" },
//   { model: PhrasalVerb, type: "phrasalVerb" },
//   { model: Idiom, type: "idiom" },
// ];
// const MODEL = {
//   word: Word,
//   phrasalVerb: PhrasalVerb,
//   idiom: Idiom,
// };

// export const GET = async (req: NextRequest) => {
//   const { searchParams } = new URL(req.url);
//   const query = searchParams.get("query")?.trim();

//   if (!query) {
//     return Response.json(
//       { message: "Validation error: 'query' parameter is required." },
//       { status: 422 }
//     );
//   }

//   const detectedType = detectExpressionType(query);
//   try {
//     await connectDB();

    
//     // Try to find in the detected type's collection first
//     const data = await MODEL[detectedType].findOne({ [detectedType]: query });
    
//     if (data) {
//       return Response.json({ data, type: detectedType }, { status: 200 });
//     }
    
//     for (const { model, type } of COLLECTIONS) {
//       if (type === detectedType) continue;
//       const data = await model.findOne({ [type]: query });
//       if (data) {
//         return Response.json({ data, type }, { status: 200 });
//       }
//     }
    
//     // Fallback to external fetchers
//     let result;
//     if (detectedType === "word") {
//       result = await fetchWordData(query);
//     } else {
//       result = await fetchEntryData({ entry: query });

//     }
//     if (Array.isArray(result?.data) && typeof result?.data?.[0] === "string") {
//       console.log("returnning result", result);

//       return Response.json(
//         { data: result?.data },
//         { status: result.status ?? 200 }
//       );
//     }

//     if (!result || !result.data) {
//       const errorMessage = "error" in result ? result.error : "No data found";
//       return Response.json(
//         { message: errorMessage },
//         { status: result.status ?? 404 }
//       );
//     }
//     return Response.json(
//       { data: result.data, type: detectedType },
//       { status: result.status ?? 200 }
//     );
//   } catch (error) {
//     console.error("Error fetching search results:", error);
//     return Response.json(
//       {
//         message: "Internal server error",
//         error: error instanceof Error ? error.message : String(error),
//       },
//       { status: 500 }
//     );
//   }
// };





// //.
// //.
// ///./.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
// //.
//

// import connectDB from "@/lib/connectDB";
// import { Idiom, PhrasalVerb, Word } from "@/models";
// import { detectExpressionType, fetchEntryData, fetchWordData } from "@/utils";
// import { NextRequest } from "next/server";

// const COLLECTIONS = [
//   { model: Word, type: "word" },
//   { model: PhrasalVerb, type: "phrasalVerb" },
//   { model: Idiom, type: "idiom" },
// ];
// const MODEL = {
//   word: Word,
//   phrasalVerb: PhrasalVerb,
//   idiom: Idiom,
// };

// export const GET = async (req: NextRequest) => {
//   const { searchParams } = new URL(req.url);
//   const query = searchParams.get("query")?.trim();

//   if (!query) {
//     return Response.json(
//       { message: "Validation error: 'query' parameter is required." },
//       { status: 422 }
//     );
//   }

//   const detectedType = detectExpressionType(query);
//   try {
//     await connectDB();

//     // Try to find in the detected type's collection first
//     const data = await MODEL[detectedType].findOne({ [detectedType]: query });

//     if (data) {
//       return Response.json({ data, type: detectedType }, { status: 200 });
//     }

//     for (const { model, type } of COLLECTIONS) {
//       if (type === detectedType) continue;
//       const data = await model.findOne({ [type]: query });
//       if (data) {
//         return Response.json({ data, type }, { status: 200 });
//       }
//     }

//     // Fallback to external fetchers
//     let result;
//     if (detectedType === "word") {
//       result = await fetchWordData(query);
//     } else {
//       result = await fetchEntryData({ entry: query });
//     }

//     if (!result || !result.data) {
//       const errorMessage = "error" in result ? result.error : "No data found";
//       return Response.json(
//         { message: errorMessage },
//         { status: result.status ?? 404 }
//       );
//     }
//     return Response.json(
//       { data: result.data, type: detectedType },
//       { status: result.status ?? 200 }
//     );
//   } catch (error) {
//     console.error("Error fetching search results:", error);
//     return Response.json(
//       {
//         message: "Internal server error",
//         error: error instanceof Error ? error.message : String(error),
//       },
//       { status: 500 }
//     );
//   }
// };
