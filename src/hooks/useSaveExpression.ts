"use client";

import { useEffect } from "react";
import { StandardExpData, ExpressionType } from "@/types";

export function useSaveExpression(
  enrichedContent: StandardExpData | null,
  hasNewData: boolean,
  hasUpdated: React.RefObject<boolean>,
  type: ExpressionType
) {
  useEffect(() => {
    if (!enrichedContent || !hasNewData || hasUpdated.current) return;

    const save = async () => {
      try {
        hasUpdated.current = true;
        const obj = {
          type,
          text: enrichedContent.commonData.text,
          definitions: enrichedContent.definitions,
          phonetic: enrichedContent.commonData.phonetic,
          audio: enrichedContent.commonData.audio,
        };

        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/update-expression-data`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(obj),
          }
        );
      } catch (err) {
        console.error("Error updating expression data:", err);
      }
    };

    save();
  }, [enrichedContent, hasNewData, hasUpdated, type]);
}
