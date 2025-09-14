import { getExpOfTheDayDataOpt } from "@/types";
import connectDB from "@/lib/connectDB";
import { Idiom, PhrasalVerb, Word } from "@/models";
import {
  fetchEntryData,
  getExpressionOfTheDay,
  fetchWordData,
} from "@/utils/server";
import { convertToStandardExpData } from "@/utils";

export async function getExpressionOfTheDayData({
  type,
  day,
  listField,
  defaultValue,
}: getExpOfTheDayDataOpt) {
  await connectDB();

  const entry = await getExpressionOfTheDay({
    day,
    listField,
    defaultValue,
  });

  const modelMap = {
    idiom: Idiom,
    phrasalVerb: PhrasalVerb,
    word: Word,
  } as const;

  const cached = await modelMap[type]?.findOne({ [type]: entry });

  if (cached) {
    console.log("cached data, getExpressionOfTheDay: type", type, entry, day);
    const data = convertToStandardExpData(cached, type);

    return { success: true, status: 200, data, error: "" };
  }

  // Otherwise fetch fresh data
  if (type === "word") {
    return await fetchWordData({ entry });
  } else {
    return await fetchEntryData({ entry, type });
  }
}
