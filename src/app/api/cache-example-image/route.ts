import connectDB from "@/lib/connectDB";
import { Idiom, PhrasalVerb, Word } from "@/models";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { expression, sentence, type, imageArr, tagArr } = await req.json();

    if (
      !expression ||
      !sentence ||
      !type ||
      !imageArr ||
      imageArr.length === 0
    ) {
      console.error(
        "All parameters are required, and imageArr cannot be empty."
      );
      return Response.json({
        success: false,
        message: "All parameters are required, and imageArr cannot be empty.",
        status: 400,
      });
    }

    await connectDB();

    const model =
      type === "word" ? Word : type === "phrasalVerb" ? PhrasalVerb : Idiom;

    if (!model) {
      console.error("Invalid type parameter. model not found");
      return Response.json({
        success: false,
        message: "Invalid type parameter.",
        status: 400,
      });
    }

    const doc = await model.findOne({ [type]: expression });
    if (!doc) return;

    let updated = false;

    for (let m = 0; m < doc.meanings.length; m++) {
      const meaning = doc.meanings[m];
      for (let d = 0; d < meaning.definitions.length; d++) {
        const definition = meaning.definitions[d];
        if (
          definition?.example &&
          definition.example.trim().toLowerCase() ===
            sentence.trim().toLowerCase()
        ) {
          definition.images = imageArr;
          definition.tags = tagArr || [];
          updated = true;
          break;
        }
      }
      if (updated) break;
    }

    await doc.save();

    if (updated) {
      return Response.json({
        success: true,
        message: "Example imageArr updated successfully",
        error: null,
        status: 200,
      });
    } else {
      console.error("No matching example sentence found to update imageArr");
      return Response.json({
        success: false,
        message: "No matching example sentence found to update imageArr.",
        status: 404,
      });
    }
  } catch (error) {
    console.error("Internal Server Error", error);
    return Response.json({
      success: false,
      message: "Example imageArr could not be updated.",
      error,
      status: 500,
    });
  }
};
