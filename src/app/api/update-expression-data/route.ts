import { NextRequest } from "next/server";
import connectDB from "@/lib/connectDB";
import { updateExpression } from "@/services";
import { cNextResponse } from "@/utils/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, text, definitions } = body;

    // 1️⃣ Validate request
    if (!type || !text || !definitions) {
      return cNextResponse.json(false, null, "Invalid request body", 400);
    }

    // 2️⃣ Connect to DB
    await connectDB();

    // 3️⃣ Update expression
    const updated = await updateExpression(body);

    if (!updated) {
      return cNextResponse.json(false, null, "Expression not found", 404);
    }
    return cNextResponse.json(true, updated);
  } catch (error) {
    console.error("Error updating expression:", error);
    return cNextResponse.json(
      false,
      null,
      `Internal server error ${error}`,
      500
    );
  }
}
