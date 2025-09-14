"use client";

import { useEffect, useState, useRef } from "react";
import { StandardExpData } from "@/types";

export function useEnrichedContent(content: StandardExpData | null) {
  const [enrichedContent, setEnrichedContent] =
    useState<StandardExpData | null>(content);
  const [hasNewData, setHasNewData] = useState(false);
  const hasUpdated = useRef(false);

  useEffect(() => {
    hasUpdated.current = false;
    setHasNewData(false);

    if (!content?.definitions?.length) return;

    const needsEnrichment = content.definitions.some(
      (def) => (def.example ?? "") === "" || (def.images?.length ?? 0) === 0
    );
    if (!needsEnrichment) return;

    const controller = new AbortController();

    const enrich = async () => {
      try {
        const res = await fetch("/api/enrich-definitions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
          signal: controller.signal,
        });

        const result = await res.json();
        if (result?.success) {
          setEnrichedContent(result.data.enriched);
          setHasNewData(result.data.foundNewData);
          hasUpdated.current = true;
        } 
      } catch (error) {
         if (error instanceof Error && error.name !== "AbortError") {
        console.error("Client enrichment failed:", error);
        }
      }
    };

    enrich();
    return () => controller.abort();
  }, [content]);

  return { enrichedContent, hasNewData, hasUpdated };
}