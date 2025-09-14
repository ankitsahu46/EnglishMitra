"use client";

import React, { Suspense, useEffect, useState } from "react";
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

const LOCAL_STORAGE_KEY = "search_history";

export default function SearchExpression({ searchParams }: SearchExpressionProps) {
  const [query, setQuery] = useState(searchParams?.query || "");
  // const [suggestions, setSuggestions] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);

  // Load history from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
    setHistory(saved);
  }, []);

  // Save to history when query changes
  useEffect(() => {
    if (query && !history.includes(query)) {
      const updated = [query, ...history].slice(0, 10); // keep last 10
      setHistory(updated);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
  }, [query, history]);

  // Fetch suggestions from API
// const fetchSuggestions = useCallback(async (term: string) => {
//     if (!term.trim()) return;
//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/suggestions?query=${encodeURIComponent(term)}`
//       );
//       if (res.ok) {
//         const data = await res.json();
//         if (Array.isArray(data.suggestions)) {
//           setSuggestions(data.suggestions);
//         }
//       }  
//     } catch (err) {
//       console.error("Error fetching suggestions:", err);
//     }
//   }, []);

  // Handle search submit
  const handleSearch = (term: string) => {
    if (!term.trim()) return;
    setQuery(term);
    // fetchSuggestions(term);
    window.history.pushState({}, "", `/search-expression?query=${encodeURIComponent(term)}`);
  };

  const defaultQueryHref = `/search-expression?query=${encodeURIComponent("welcome")}`;

  return (
    <div className="flex-1 flex flex-col">
      <section className="bg-slate-100 py-12 flex-1 flex flex-col">
        <MaxWidthWrapper className="flex flex-col justify-center gap-12 flex-1">
          {/* Search Input */}
          <div className="flex flex-col items-center gap-4">
            <input
              type="text"
              placeholder="Search for a word, phrasal verb, or idiom..."
              className="border rounded px-4 py-2 w-full max-w-md"
              defaultValue={query}
              onKeyDown={(e) => e.key === "Enter" && handleSearch((e.target as HTMLInputElement).value)}
            />
            {/* Suggestions */}
            {(history.length > 0) && (
              <div className="bg-white shadow rounded p-3 w-full max-w-md">
                {history.length > 0 && (
                  <>
                    <p className="font-semibold text-sm text-gray-500">Recent Searches</p>
                    <ul>
                      {history.map((h, i) => (
                        <li
                          key={i}
                          className="cursor-pointer hover:underline"
                          onClick={() => handleSearch(h)}
                        >
                          {h}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Default message */}
          {!query && (
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
          )}

          {/* Search Results */}
          {query && (
            <Suspense fallback={<ExpressionCardSkeleton />}>
              <SearchResultSection key={query} query={query} />
            </Suspense>
          )}
        </MaxWidthWrapper>
      </section>
    </div>
  );
}

const SearchResultSection = async ({ query }: { query: string }) => {
  try {
    const result = await fetchExpressionByQuery(query);
    if (Array.isArray(result.suggestions) && typeof result.suggestions[0] === "string") {
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
    console.error("No expression data Found, search-expression.tsx", err);
    return (
      <SearchErrorMessage
        message={"Something went wrong. Please try again"}
        query={query}
      />
    );
  }
};

const fetchExpressionByQuery = async (query: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/search-expression?query=${encodeURIComponent(
      query.toLowerCase().trim()
    )}`
  );
  if (!res.ok) {
    const data = await res.json();
    if (Array.isArray(data.suggestions) && typeof data.suggestions[0] === "string") {
      return data;
    }
    throw new Error("No Data Found");
  }
  return res.json();
};
