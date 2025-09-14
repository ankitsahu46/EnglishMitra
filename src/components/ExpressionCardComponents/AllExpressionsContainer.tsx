"use client";

import { OfTheDayComponentProps, ExpressionDefinitions } from "@/types";
import { ExpressionCard, EntryTextBadgeBar } from "@/components";
import { useEnrichedContent, useSaveExpression } from "@/hooks";
import { useMemo } from "react";

export const AllExpressionsContainer = ({
  data,
  type,
  isOfTheDay = false,
}: OfTheDayComponentProps) => {
  console.log("data from allExpressionContainer", data);
  const { enrichedContent, hasNewData, hasUpdated } = useEnrichedContent(data);

  useSaveExpression(enrichedContent, hasNewData, hasUpdated, type);

  const definitionsToShow = useMemo(() => {
    const defs = (enrichedContent?.definitions ?? []).filter(
      (def) => def?.definition && def?.example
    );

    return isOfTheDay ? defs.slice(0, 1) : defs;
  }, [enrichedContent?.definitions, isOfTheDay]);

  if (!enrichedContent?.commonData?.text) return null;
  // const definitionsToShow = isOfTheDay
  // ? enrichedContent.definitions.filter((def) => def != null).slice(0, 1)
  // : enrichedContent.definitions;

  return (
    <div className="flex flex-col items-center gap-2 px-8 md:px-12 lg:px-16">
      <EntryTextBadgeBar type={type} isOfTheDay={isOfTheDay} />
      <div className="flex flex-col items-center gap-16">
        {definitionsToShow.map((def: ExpressionDefinitions, idx: number) => (
          <ExpressionCard
            key={def.example}
            def={def}
            commonData={enrichedContent.commonData}
            idx={idx}
          />
        ))}
      </div>
    </div>
  );
};
