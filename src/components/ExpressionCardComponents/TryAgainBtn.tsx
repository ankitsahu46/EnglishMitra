"use client";
import React from "react";

const TryAgainBtn = () => {
  return (
    <button
      className="mt-2 px-5 py-2 bg-red-500 text-white rounded-full font-semibold shadow hover:bg-red-600 transition"
      onClick={() => window.location.reload()}
    >
      Try Again
    </button>
  );
};

export default TryAgainBtn;
