import React, { Suspense } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  MaxWidthWrapper,
  OfTheDayComponent,
  OfTheDayComponentSkeleton,
  SearchErrorMessage,
} from "@/components";

interface SearchExpressionProps {
  searchParams: { query?: string };
}

const fetchExpressionByQuery = async (query: string) => {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/search-expression?query=${encodeURIComponent(query.toLowerCase().trim())}`
    // { cache: "no-store" }
  );
  if (!res.ok) throw new Error("No result Found");
  return res.json();
};

const SearchExpression = async ({ searchParams }: SearchExpressionProps) => {
  const query = (await searchParams).query;
  const defaultQueryHref = `/search-expression?query=${encodeURIComponent(
    "welcome".toLowerCase().trim()
  )}`;

  return (
    <div className="flex-1 flex flex-col">
      <section className="bg-slate-100 py-12 flex-1 flex flex-col">
        <MaxWidthWrapper className="flex flex-col justify-center gap-12 flex-1">
          {!query && (
            <>
              <div className="text-center text-gray-500 h-full flex flex-col items-center">
                <p>Enter a word, phrasal verb, or idiom to search.</p>
                <div className="flex gap-1">
                  <span>Try</span>
                  <span>
                    <a
                      href={defaultQueryHref}
                      className="flex font-bold italic ml-1"
                    >
                      welcome
                      <ArrowUpRight />
                    </a>
                  </span>
                </div>
              </div>
            </>
          )}
          {query && (
            <Suspense fallback={<OfTheDayComponentSkeleton />}>
              <SearchResultSection query={query} />
            </Suspense>
          )}
        </MaxWidthWrapper>
      </section>
    </div>
  );
};

export default SearchExpression;



const SearchResultSection = async ({ query }: { query: string }) => {
  try {
    const data = await fetchExpressionByQuery(query);
    if (!data || !data.data) {
      throw new Error("No data found");
    }
    return <OfTheDayComponent data={data.data} type={data.type} />;
  } catch (err) {
    const message = err instanceof Error ? err.message : "No result Found";
    return <SearchErrorMessage message={message} query={query} />;
  }
};
