import connectDB from "@/lib/connectDB";
import { Idiom, PhrasalVerb, Word } from "@/models";
import { detectExpressionType, convertToStandardExpData } from "@/utils";
import { fetchEntryData, fetchWordData } from "@/utils/server";
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
  const query = searchParams?.get("query")?.trim();

  if (!query) {
    return Response.json(
      {
        success: false,
        data: null,
        message: "No query provided. Try an example search.",
        example: "welcome",
      },
      { status: 200 }
    );
  }

  const detectedType = detectExpressionType(query);
  try {
    await connectDB();

    // Try to find in the detected type's collection first
    const data = await MODEL[detectedType]?.findOne({ [detectedType]: query });
    console.log("data from search-expression.ts", data);
    
    if (data) {
      const normalizedData = convertToStandardExpData(data, detectedType);
      console.log("normalized Data from search-expression.ts", data);

      return Response.json(
        {
          success: true,
          data: normalizedData,
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
        const normalizedData = convertToStandardExpData(data, detectedType);
        return Response.json(
          {
            success: true,
            data: normalizedData,
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
      result = await fetchWordData({ entry: query });
    } else {
      result = await fetchEntryData({ entry: query });
    }

    // Handle suggestions (array of strings)
    if (
      (!result || !result.data) &&
      Array.isArray(result?.suggestions) &&
      result.suggestions.length > 0
    ) {
      return Response.json(
        {
          success: false,
          data: null,
          message: result.message || "No data found. Did you mean:",
          suggestions: result.suggestions,
        },
        { status: result.status ?? 404 }
      );
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
    console.error("Error fetching search results, search-expression:", error);

    const errorMessage =
      error && typeof error === "object" && "message" in error
        ? (error as { message: string }).message
        : String(error);

    return Response.json(
      {
        success: false,
        data: null,
        message: "Internal server error",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
};
