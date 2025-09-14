import { ExpressionType, fieldType } from "@/types";
import { getExpressionOfTheDayData } from "@/utils/server";

export async function GET(
  _request: Request,
  { params }: { params: { type: string; day: string } }
) {
  try {
    const { type, day } = await params;

    //  Validate "day"
    if (typeof day !== "string" || !day.trim()) {
      return Response.json(
        { message: "Validation error: 'day' (string) parameter is required." },
        { status: 422 }
      );
    }

    //  Allowed entry types
    const allowedTypes = ["word", "idiom", "phrasalVerb"] as const;
    if (!allowedTypes.includes(type as (typeof allowedTypes)[number])) {
      return Response.json(
        {
          message: "Validation error: 'type' must be 'word', 'idiom' or 'phrasalVerb'.",
        },
        { status: 422 }
      );
    }

    // Config mapping for each type
    const configMap: Record<
      "word" | "idiom" | "phrasalVerb",
      { type: ExpressionType; listField: string; defaultValue: string }
    > = {
      word: { type: "word", listField: "words", defaultValue: "serendipity" },
      idiom: { type: "idiom", listField: "idioms", defaultValue: "say when" },
      phrasalVerb: {
        type: "phrasalVerb",
        listField: "phrasalVerbs",
        defaultValue: "wake up",
      },
    };

    const config = configMap[type as keyof typeof configMap];

    // Fetch data
    const result = await getExpressionOfTheDayData({
      type: config.type,
      listField: config.listField as fieldType,
      defaultValue: config.defaultValue,
      day,
    });

    if (!result || !result.data) {
      const errorMessage = "error" in result ? result.error : "No data found";
      return Response.json(
        { message: errorMessage },
        { status: result.status ?? 404 }
      );
    }

    return Response.json(
      { data: result.data },
      { status: result.status ?? 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/entry-of-the-day/[type]/[day]:", error);
    return Response.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}