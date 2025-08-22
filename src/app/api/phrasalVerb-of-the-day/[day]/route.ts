import { PhrasalVerb } from "@/models";
import { getEntryOfTheDay } from "@/utils";

export async function GET(
  _request: Request,
  { params }: { params: { day: string } }
) {
  try {
    const { day } = await params;

    if (typeof day !== "string" || !day.trim()) {
      return Response.json(
        { message: "Validation error: 'day' (string) parameter is required." },
        { status: 422 }
      );
    }

    const result = await getEntryOfTheDay({
      type: "phrasalVerb",
      day,
      listField: "phrasalVerbs",
      defaultValue: "wake up",
      model: PhrasalVerb,
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
    console.error("Error in GET /api/phrasalVerb-of-the-day/[day]:", error);
    return Response.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}