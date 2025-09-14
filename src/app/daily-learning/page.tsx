"use client";

import {
  MaxWidthWrapper,
  ExpressionCardSkeleton,
  OfTheDayErrorMessage,
  AllExpressionsContainer,
} from "@/components";
import { useDailyLearning } from "@/hooks";
import { ExpressionType } from "@/types";
import { memo } from "react";

const DailyLearningClient = () => {
  const { results } = useDailyLearning();

  return (
    <section className="bg-slate-100 py-12">
      <MaxWidthWrapper className="flex flex-col gap-12">
        {results.map(({ type, data, isLoading, error }) => {
          if (isLoading) return <ExpressionCardSkeleton key={type} />;
          if (error) return <OfTheDayErrorMessage key={type} type={type} />;
          if (data) {
            return (
              <AllExpressionsContainer
                key={type}
                data={data.data}
                type={type as ExpressionType}
                isOfTheDay
              />
            );
          }
          return null;
        })}
      </MaxWidthWrapper>
    </section>
  );
};

export default memo(DailyLearningClient);