"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import nprogress from "nprogress";
import "../styles/nprogress.css";

interface TopLoaderProps {
  loading?: boolean;
}

const TopLoader = ({ loading }: TopLoaderProps) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (typeof loading === "boolean") {
      if (loading) {
        nprogress.start();
      } else {
        nprogress.done();
      }
    } else {
      nprogress.start();
      timer = setTimeout(() => nprogress.done(), 500);
    }

    return () => {
      if (timer) clearTimeout(timer);
      nprogress.done();
    };
  }, [loading, pathName, searchParams]);

  return null;
};

export default TopLoader;
