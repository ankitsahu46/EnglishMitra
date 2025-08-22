import { Idiom } from "@/models";
import { getEntryOfTheDay } from "@/utils";

export const GET = async (
  _request: Request,
  { params }: { params: { day: string } }
) => {
  try {
    const { day } = await params;

    if (typeof day !== "string" || !day.trim()) {
      return Response.json(
        { message: "Validation error: 'day' (string) parameter is required." },
        { status: 422 }
      );
    }

    const result = await getEntryOfTheDay({
      type: "idiom",
      day,
      listField: "idioms",
      defaultValue: "say when",
      model: Idiom,
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
    console.error("Failed to get idiom of the day:", error);
    return Response.json(
      { message: "Internal Server Error", error: (error as Error).message },
      { status: 500 }
    );
  }
};
