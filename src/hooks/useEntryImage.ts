"use client";

import { useState } from "react";

export type ImageStatus = "loading" | "success" | "error";

export const useEntryImage = (images: string[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [status, setStatus] = useState<ImageStatus>("loading");
  const [status, setStatus] = useState<ImageStatus>((!images || images.length === 0) ? "error": "loading");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleImageLoad = () => {
    setStatus("success");
  };

  const handleImageError = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setStatus("loading");
    } else {
      setStatus("error");
    }
  };

  const handleRefresh = () => {
    if (status === "success") return;
    setRefreshKey((prev) => prev + 1);
    setCurrentIndex(0);
    setStatus(!images || images.length === 0 ? "error" : "loading");
  };

  return {
    currentIndex,
    status,
    refreshKey,
    handleImageLoad,
    handleImageError,
    handleRefresh,
  };
};
