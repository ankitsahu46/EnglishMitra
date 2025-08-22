// app/api/word-of-the-day/[day]/route.ts
import connectDB from "@/lib/connectDB";
import { OfTheDayList, Word } from "@/models";
import { validateDayParam, fetchWordData } from "@/utils";

const DEFAULT_WORD = "happy";

export async function GET(
  _request: Request,
  { params }: { params: { day: string } }
) {
  try {
    // 1. Connect to the database
    await connectDB();

    const prm = await params;
    const day = validateDayParam(prm.day);

    // 2. Fetch the word list from the database
    const list = await OfTheDayList.findOne();
    let word = DEFAULT_WORD;
    if (list && Array.isArray(list.words) && list.words.length > 0) {
      const validDay =
        day > list.words.length
          ? Math.floor(Math.random() * list.words.length) + 1
          : day;
      word = (list.words[validDay - 1] || DEFAULT_WORD).trim().toLowerCase();
    }

    // 3. Check if the word is already cached
    const cachedWord = await Word.findOne({ word });
    if (cachedWord) {
      return Response.json(
        {
          success: true,
          data: cachedWord,
          message: "Word of the day (cached) fetched successfully.",
        },
        { status: 200 }
      );
    }

    const result = await fetchWordData(word);

    if (!result || !result.data) {
      const errorMessage = "error" in result ? result.error : "No data found";
      return Response.json(
        {
          success: false,
          data: null,
          message: errorMessage,
          error: errorMessage,
        },
        { status: result?.status ?? 404 }
      );
    }
    return Response.json(
      {
        success: true,
        data: result.data,
        message: "Word of the day fetched successfully.",
      },
      { status: result.status ?? 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/word-of-the-day/[day]:", error);
    return Response.json(
      {
        success: false,
        data: null,
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}