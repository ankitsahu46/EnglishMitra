import connectDB from "@/lib/connectDB";
import { capitalizeFirstLetter } from "@/utils";
import { OfTheDayList } from "@/models";

export async function removeExpression(
  type: "phrasalVerb" | "idiom",
  entry: string,
  entryKey: string = ""
) {
  const field = type === "phrasalVerb" ? "phrasalverbs" : "idioms";
  const values = [
    entry,
    entryKey,
    capitalizeFirstLetter(entryKey),
    capitalizeFirstLetter(entry),
  ];
  try {
    await connectDB();
    const result = await OfTheDayList.findOneAndUpdate(
      {},
      {
        $pull: {
          [field]: { $in: values },
        },
      },
      { new: true }
    );
    console.log("Expression removal from DB result:", Boolean(result), type, entry);
  } catch (err) {
    console.error("DB error removing expression:", err);
  }
}
