import { SaveExpressionOptions } from "@/types";

export async function saveExpression({
  type,
  expression,
  formattedData,
}: SaveExpressionOptions) {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/save-expression`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        expression,
        formattedData,
      }),
    });
  } catch (error) {
    console.error("Failed to save expression:", error);
  }
}
