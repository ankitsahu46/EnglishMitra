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
// console.log("entry", entry);
  // 2. Check cache
  if (model) {
    const cached = await model.findOne({ [type]: entry });
    if (cached) {
      // console.log("cached data showing ",cached);
      // console.log("showing cached data getEntryOfTheDay", cached.meanings[0].definitions[0]);
      return { status: 200, data: cached };
    }
  }

  // 3. Fetch from dictionary API
  // console.log("entry", entry, "type", type, "mdoel", model, "getEntryOfThe Day");
  const result = await fetchEntryData({ entry, type, model });
  // console.log("result", result, "getEntryOfThe Day");
  // console.log("apidata result", result);
  return result;
}
























  // const apiUrl = `https://dictionaryapi.com/api/v3/references/learners/json/${encodeURIComponent(
  //   entry
  // )}?key=${process.env.DICTIONARY_API_KEY_PV}`;
  // const apiRes = await fetch(apiUrl);

  // if (!apiRes.ok) {
  //   return { status: apiRes.status, error: "Dictionary API failed!" };
  // }

  // const apiData = await apiRes.json();
  // const formatted = await convertToEntrySchemaFormat(apiData, entry, type);
  
  // if (!formatted) {
  //   return { status: 500, error: "Failed to format entry data" };
  // }
  // console.log("Entry dictionary data formatted", formatted);
  
  // // 4. Generate audio
  // try {
  //   formatted.audio = (await generateAudio(entry, type)) || null;
  // } catch (err) {
  //   console.error("Failed to generate audio:", err);
  // }
  
  // // 5. Save to DB
  // try {
  //   await model.create(formatted);
  //   console.log("Entry dictionary data formatted after caching", formatted);
  // } catch (err) {
  //   console.error("Failed to save entry to the database:", err);
  // }

  // return { status: 200, data: formatted };





// const fetchEntryData = async (entry, type, model) => {
//   const apiUrl = `https://dictionaryapi.com/api/v3/references/learners/json/${encodeURIComponent(
//     entry
//   )}?key=${process.env.DICTIONARY_API_KEY_PV}`;
//   const apiRes = await fetch(apiUrl);

//   if (!apiRes.ok) {
//     return { status: apiRes.status, error: "Dictionary API failed!" };
//   }

//   const apiData = await apiRes.json();
//   const formatted = await convertToEntrySchemaFormat(apiData, entry, type);
  
//   if (!formatted) {
//     return { status: 500, error: "Failed to format entry data" };
//   }
//   console.log("Entry dictionary data formatted", formatted);
  
//   // 4. Generate audio
//   try {
//     formatted.audio = (await generateAudio(entry, type)) || null;
//   } catch (err) {
//     console.error("Failed to generate audio:", err);
//   }
  
//   // 5. Save to DB
//   try {
//     await model.create(formatted);
//     console.log("Entry dictionary data formatted after caching", formatted);
//   } catch (err) {
//     console.error("Failed to save entry to the database:", err);
//   }

//   return { status: 200, data: formatted };
// }