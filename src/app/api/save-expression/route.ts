import { NextRequest } from "next/server";
import { Idiom, PhrasalVerb, Word } from "@/models";
import { ExpressionData, ExpressionType, SaveExpressionOptions } from "@/types";
import { convertToExpData } from "@/utils";
import { cNextResponse } from "@/lib/cNextResponse";
import connectDB from "@/lib/connectDB";

type ModelType = typeof Word | typeof Idiom | typeof PhrasalVerb;
export async function POST(req: NextRequest) {
  try {
    const body: SaveExpressionOptions = await req.json();
    const { type, formattedData } = body;

    // 1️⃣ Validate input
    if (!type || !formattedData?.commonData || !formattedData?.definitions) {
      return cNextResponse.json(
        false,
        null,
        "Missing required fields",
        400,
        "Invalid request body"
      );
    }

    await connectDB();

    // 2️⃣ Resolve model and field
    const Model: Record<ExpressionType, ModelType> = {
      phrasalVerb: PhrasalVerb,
      idiom: Idiom,
      word: Word,
    };

    const resolved: ModelType = Model[type];
    if (!resolved) {
      return cNextResponse.json(
        false,
        null,
        "Invalid type",
        400,
        "Unsupported expression type"
      );
    }

    const expressionData = convertToExpData({
      data: formattedData,
      type,
    });
    const textValue = expressionData[type as keyof ExpressionData];

    // 3️⃣ Upsert logic
    await resolved.updateOne(
      { [type]: textValue },
      { $setOnInsert: expressionData },
      { upsert: true }
    );

    console.log("Expression saved successfully:", type, textValue);
    return cNextResponse.json(
      true,
      null,
      null,
      200,
      "Expression saved successfully."
    );
  } catch (error) {
    console.error("Couldn't save expression to DB:", error);

    return cNextResponse.json(
      false,
      null,
      error instanceof Error ? error.message : "Unknown error",
      500,
      "Database error"
    );
  }
}