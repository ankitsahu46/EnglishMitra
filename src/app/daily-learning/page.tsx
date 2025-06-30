import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { fetchData } from "@/utils";
import { ExpressionCard, ExpressionCardSkeleton } from "@/components";
import React, { Suspense } from "react";

const DAY = 1;

const DAILY_TYPES = [
  { type: "word", endpoint: "word-of-the-day" },
  { type: "phrasalVerb", endpoint: "phrasalVerb-of-the-day" },
  { type: "idiom", endpoint: "idiom-of-the-day" },
];

const ExpressionCardLoader = async ({
  type,
  endpoint,
  day,
}: {
  type: string;
  endpoint: string;
  day: number;
}) => {
  const data = await fetchData(
    `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}/${day}`
  );
  if (!data) return null;
  return <ExpressionCard data={data} type={type} isOfTheDay={true} />;
};

const DailyLearningPage = () => {
  const day = DAY;

  return (
    <div>
      <section className="bg-slate-100 py-12">
        <MaxWidthWrapper className="flex flex-col gap-12">
          {DAILY_TYPES.map(({ type, endpoint }) => (
            <Suspense key={type} fallback={<ExpressionCardSkeleton />}>
              <ExpressionCardLoader type={type} endpoint={endpoint} day={day} />
            </Suspense>
          ))}
        </MaxWidthWrapper>
      </section>
    </div>
  );
};

export default DailyLearningPage;