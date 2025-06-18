
"use client";

import { Loader2, Search, X } from "lucide-react";
import TopLoader from "./TopLoader";
import { useSearch } from "@/hooks/useSearch";

const SearchBar = () => {
  const { query, isPending, handleChange, handleSubmit, clearQuery } = useSearch();

  return (
    <>
      <TopLoader loading={isPending} />
      <form
        onSubmit={handleSubmit}
        className="relative text-gray-600"
        role="search"
        aria-label="Search Bar"
      >
        <input
          type="search"
          name="search"
          placeholder="Search"
          className="relative bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none border border-gray-300 lg:w-80 md:w-40 w-full"
          autoComplete="off"
          value={query}
          onChange={handleChange}
          disabled={isPending}
          aria-label="Search input"
        />

        {/* Clear button */}
        {query && (
          <button
            type="button"
            onClick={clearQuery}
            className="absolute top-1 right-10 size-8 flex items-center justify-center p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none transition-colors duration-200"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}

        {/* Submit/Search button */}
        <button
          type="submit"
          className="absolute top-1 right-1 size-8 flex items-center justify-center p-2 rounded-full bg-teal-500 text-white hover:bg-teal-600 focus:outline-none transition-colors duration-200"
          aria-label="Submit search"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Search className="size-4" />
          )}
        </button>
      </form>
    </>
  );
};

export default SearchBar;

