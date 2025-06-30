"use client";

import React, { useState } from "react";
import IconContainer from "./IconContainer";
import { Heart } from "lucide-react";

export const FavExpressionBtn = () => {
  const [isFav, setIsFav] = useState(false);
  const handleFavWordBtn = () => {
    setIsFav((prev: boolean) => !prev);
  }

  return (
    <IconContainer handleClick={handleFavWordBtn}>
      <Heart className={`stroke-[#00d9a9] transition-all active:scale-110 ${isFav && "fill-[#00d9a9]"}`} />
      {/* <Heart className={`stroke-green-500/60 transition-all active:scale-110 ${isFav && "fill-green-500/60"}`} /> */}
    </IconContainer>
  );
};

