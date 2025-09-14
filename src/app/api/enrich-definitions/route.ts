import { enrichDefinitions } from "@/services";
import { EnrichDefinitionsResult } from "@/types";
import { cNextResponse } from "@/utils/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { content } = await req.json();

    const result = await enrichDefinitions(content);
    return cNextResponse.json<EnrichDefinitionsResult>(true, result);
  } catch (err) {
    console.error("POST /api/enrichDefinitions error:", err);
    return cNextResponse.json<null>(false, null, "Internal Server Error", 500);
  }
}
