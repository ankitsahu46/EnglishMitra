// import connectDB from "@/lib/connectDB";
// import { Idiom, PhrasalVerb, Word } from "@/models";
import { updateExpressionImagesInDBProps } from "@/types";

export const updateExpressionImagesInDB = async ({
  expression,
  sentence,
  type,
  images = [],
}: updateExpressionImagesInDBProps) => {
  if (
    !expression ||
    !sentence ||
    !type ||
    !Array.isArray(images) ||
    !(images.length > 0)
  )
    return;

  try {
    const res = await fetch(`/cache-example-image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ expression, sentence, type, images }),
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const data = await res.json();
    console.log("data from updupdateExpressionImagesInDB", data);
  } catch (error) {
    console.error("Error updating expression images in DB:", error);
  }
};
// import connectDB from "@/lib/connectDB";
// import { Idiom, PhrasalVerb, Word } from "@/models";
// import { updateExpressionImagesInDBProps } from "@/types";

// export const updateExpressionImagesInDB = async ({
//   expression,
//   sentence,
//   type,
//   images = [],
// }: updateExpressionImagesInDBProps) => {
//   if (
//     !expression ||
//     !sentence ||
//     !type ||
//     !Array.isArray(images) ||
//     !(images.length > 0)
//   )
//     return;

//   try {
//     await connectDB();

//     const model =
//       type === "word" ? Word : type === "phrasalVerb" ? PhrasalVerb : Idiom;

//     const doc = await model.findOne({ [type]: expression });
//     if (!doc) return;

//     let updated = false;

//     for (const meaning of doc.meanings) {
//       for (const def of meaning.length) {
//         if (
//           def?.example &&
//           sentence &&
//           def.example.trim().toLowerCase() === sentence.trim().toLowerCase()
//         ) {
//           def.images = images;
//           updated = true;
//           break;
//         }
//       }
//       if (updated) break;
//     }

//     await doc.save();
//   } catch (error) {
//     console.error("Error updating expression images in DB:", error);
//   }
// };
