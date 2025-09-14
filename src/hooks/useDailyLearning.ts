"use client";

import useSWR from "swr";
import { getDay, secondsUntilMidnight } from "@/utils";

const DAY = getDay();

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
};

export function useDailyLearning() {
  const refreshInterval = secondsUntilMidnight();

  const word = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/expression-of-the-day/word/${DAY}`,
    fetcher,
    {
      revalidateOnFocus: false,
      refreshInterval,
    }
  );
  const idiom = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/expression-of-the-day/idiom/${DAY}`,
    fetcher,
    {
      revalidateOnFocus: false,
      refreshInterval,
    }
  );
  const phrasalVerb = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/expression-of-the-day/phrasalVerb/${DAY}`,
    fetcher,
    {
      revalidateOnFocus: false,
      refreshInterval,
    }
  );

  return {
    results: [
      { type: "word", data: word.data, isLoading: word.isLoading, error: word.error },
      { type: "idiom", data: idiom.data, isLoading: idiom.isLoading, error: idiom.error },
      { type: "phrasalVerb", data: phrasalVerb.data, isLoading: phrasalVerb.isLoading, error: phrasalVerb.error },
    ],
    isLoading: word.isLoading && idiom.isLoading && phrasalVerb.isLoading,
  };
}