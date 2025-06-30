import { generateTags, searchUnsplashImage } from "@/utils";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { sentence, tags: inputTags = [] } = await req.json();

    if (typeof sentence !== "string" || !sentence.trim()) {
      return Response.json(
        { error: "Validation error: 'sentence' (string) is required." },
        { status: 422 }
      );
    }
    let tags: string[] =
      Array.isArray(inputTags) && inputTags.length > 0 ? inputTags : [];

    if (tags.length === 0) {
      tags = await generateTags(sentence);

      if (!Array.isArray(tags) || tags.length === 0) {
        return Response.json(
          {
            error:
              "Something went wrong while generating tags for the provided example.",
          },
          { status: 500 }
        );
      }
    }

    const query = tags.join(" ");
    const images = await searchUnsplashImage(query);

    if (!Array.isArray(images) || images.length === 0) {
      console.error("Images not found.");
      return Response.json(
        { error: `Images cannot be searched` },
        { status: 404 }
      );
    }
    return Response.json({ images, tags }, { status: 200 });
  } catch (error) {
    console.error("Internal Sever Error", error);
    return Response.json(
      {
        error: `internal Server Error, ${
          error instanceof Error ? error.message : String(error)
        }`,
      },
      { status: 500 }
    );
  }
};
