import { OfTheDayList } from "@/models";
import { validateDayParam } from "@/utils";

type GetEntryOptions = {
  day: string;
  listField: string;
  defaultValue: string;
};

export const getExpressionOfTheDay = async ({
  day,
  listField,
  defaultValue,
}: GetEntryOptions): Promise<string> => {
  const validDay = validateDayParam(day);

  const listDoc = await OfTheDayList.findOne();
  const entries: string[] = listDoc?.[listField] || [];

  const entry =
    entries.length > 0
      ? entries[
          validDay > entries.length
            ? Math.floor(Math.random() * entries.length)
            : validDay - 1
        ] || defaultValue
      : defaultValue;

  return entry.trim().toLowerCase();
};
