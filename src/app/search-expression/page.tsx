import React, { Suspense } from "react";
import {
  AllExpressionsContainer,
  ExpressionCardSkeleton,
  MaxWidthWrapper,
  SearchErrorMessage,
} from "@/components";
import Link from "next/link";
import { ArrowRightUp } from "@/components/Icons";

interface SearchExpressionProps {
  searchParams: { query?: string };
}

const SearchExpression = async ({ searchParams }: SearchExpressionProps) => {
  const query = (await searchParams)?.query;
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
                    <Link
                      href={defaultQueryHref}
                      className="flex font-bold italic ml-1"
                    >
                      welcome
                      <ArrowRightUp />
                    </Link>
                  </span>
                </div>
              </div>
            </>
          )}
          {query && (
            <Suspense fallback={<ExpressionCardSkeleton />}>
              <SearchResultSection key={query} query={query} />
            </Suspense>
          )}
        </MaxWidthWrapper>
      </section>
    </div>
  );
};
export default SearchExpression;
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
const SearchResultSection = async ({ query }: { query: string }) => {
  try {
    const result = await fetchExpressionByQuery(query);
    if (
      Array.isArray(result.suggestions) &&
      typeof result.suggestions[0] === "string"
    ) {
      return (
        <SearchErrorMessage
          message={"Couldn't find the data."}
          query={query}
          suggestions={result.suggestions}
        />
      );
    }
    if (!result || !result.data) {
      throw new Error("No data found");
    }
    return <AllExpressionsContainer data={result.data} type={result.type} />;
  } catch (err) {
    console.log("No expression data Found, search-expression.tsx", err);
    return <SearchErrorMessage message={"Something went wrong. Please try again"} query={query} />;
  }
};

//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.

const fetchExpressionByQuery = async (query: string) => {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/search-expression?query=${encodeURIComponent(query.toLowerCase().trim())}`
    // { cache: "no-store" }
  );
  if (!res.ok) {
    const data = await res.json();
    if (
      Array.isArray(data.suggestions) &&
      typeof data.suggestions[0] === "string"
    ) {
      return data;
    }
    throw new Error("No Data Found");
  }
  return res.json();
};
