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
  "word": Word,
  "phrasalVerb": PhrasalVerb,
  "idiom": Idiom,
};

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query")?.trim();

  if (!query) {
    return Response.json(
      { message: "Query parameter is required" },
      { status: 400 }
    );
  }

  const detectedType = detectExpressionType(query);
  try {
    await connectDB();

    const data = await MODEL[detectedType].findOne({ [detectedType]: query });

    if (data) {
      return Response.json({ data, type: detectedType }, { status: 200 });
    }

    for (const { model, type } of COLLECTIONS) {
      if (type === detectedType) continue; // Skip the already checked type
      const data = await model.findOne({ [type]: query });
      if (data) {
        return Response.json({ data, type }, { status: 200 });
      }
    }

    let result;
    if (detectedType === "word") {
      result = await fetchWordData(query);
    }
    else {
      result = await fetchEntryData({ entry: query });
      // result = await fetchEntryData({ entry: query, model: MODEL[detectedType], type: detectedType });
    }

    
    if (!result || !result.data) {
      const errorMessage = "error" in result ? result.error : "No data found";
      return Response.json({ message: errorMessage }, { status: result.status });
    }
    return Response.json({ data: result.data, type: detectedType }, { status: result.status });

    // return Response.json({ message: "No results found" }, { status: 404 });
  } catch (error) {
    console.error("Error fetching search results:", error);
    return Response.json(
      { message: "Internal server error", error: (error as Error).message },
      { status: 500 }
    );
  }
};
