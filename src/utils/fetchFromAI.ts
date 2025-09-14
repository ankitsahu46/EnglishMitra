export async function fetchFromAI(prompt: string) {
  try {
    if (typeof window === "undefined") {
      // Running on the server → call generateFromAI directly
      const { generateFromAI } = await import("@/utils/server");

      const result = await generateFromAI(prompt);
      if (!result) {
        throw new Error("AI returned no response");
      }
      return result;;
    } else {
      // Running on the client → call API route
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to fetch from AI");
      }

      return result.data;
    }
  } catch (err) {
    console.error("fetchFromAI error:", err);
    throw err;
  }
}
