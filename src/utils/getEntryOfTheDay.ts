import { OfTheDayList } from "@/models";
import { fetchEntryData, validateDayParam } from "@/utils";
import connectDB from "@/lib/connectDB";
import { EntryType, ModelType } from "@/types";

interface GetEntryOptions {
  type: EntryType;
  day: string;
  listField: "idioms" | "phrasalVerbs";
  defaultValue: string;
  model: ModelType;
}

export async function getEntryOfTheDay({
  type,
  day,
  listField,
  defaultValue,
  model,
}: GetEntryOptions) {
  await connectDB();

  const validDay = validateDayParam(day);

  // 1. Get the list and select the entry
  const listDoc = await OfTheDayList.findOne();
  const entries: string[] = listDoc?.[listField] || [];
  const entry =
    (entries.length > 0
      ? entries[
          validDay > entries.length
            ? Math.floor(Math.random() * entries.length)
            : validDay - 1
        ] || defaultValue
      : defaultValue).trim().toLowerCase();
  // 2. Check cache
  if (model) {
    const cached = await model.findOne({ [type]: entry });
    if (cached) {
      return { status: 200, data: cached };
    }
  }

  // 3. Fetch from dictionary API
  const result = await fetchEntryData({ entry, type, model });
  return result;
}

