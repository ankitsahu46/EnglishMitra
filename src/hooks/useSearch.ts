
import React, { useState, useTransition, useCallback } from "react";
import { useRouter } from "next/navigation";

export const useSearch = () => {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Handle input change
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    []
  );

  // Handle form submit
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const trimmedQuery = query.trim().toLowerCase();
      const encodedQuery = encodeURIComponent(trimmedQuery);

      startTransition(() => {
        router.push(`/search-expression?query=${encodedQuery}`);
        router.refresh(); 
      });
    },
    [query, router]
  );

  // Handle clear/cancel action
  const clearQuery = useCallback(() => {
    setQuery("");
  }, []);

  return {
    query,
    isPending,
    handleChange,
    handleSubmit,
    clearQuery,
  };
}