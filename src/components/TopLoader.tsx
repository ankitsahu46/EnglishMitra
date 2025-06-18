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
  const query = searchParams.get("query");

  useEffect(() => {
    if (typeof loading === "boolean") {
      if (loading) {
        nprogress.start();
      } else {
        nprogress.set(0.9);
        nprogress.done();
      }
      return () => {
        nprogress.set(0.9);
        nprogress.done(); 
        
      }
    } else {
      nprogress.start();
      const timer = setTimeout(() => nprogress.done(), 500);
      return () => {
        clearTimeout(timer);
        nprogress.done();
      };
    }
  }, [loading, pathName, query]);

  return null;
};

export default TopLoader;