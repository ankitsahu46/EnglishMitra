import { ApiResponse } from "@/types";
import { NextResponse } from "next/server";

// Custom NextResponse wrapper
export class cNextResponse {
  static json<T>(
    success: boolean,
    data: T | null,
    error?: string | null,
    status: number = 200,
    message?: string,
    suggestions?: string[]
  ) {
    // Build response object
    const response: ApiResponse<T> = {
      success,
      data,
      error,
      message,
      suggestions,
    };

    // Remove null/undefined fields for cleaner JSON
    Object.keys(response).forEach((key) => {
      if (
        response[key as keyof ApiResponse<T>] === null ||
        response[key as keyof ApiResponse<T>] === undefined
      ) {
        delete response[key as keyof ApiResponse<T>];
      }
    });

    return NextResponse.json(response, { status });
  }
}
