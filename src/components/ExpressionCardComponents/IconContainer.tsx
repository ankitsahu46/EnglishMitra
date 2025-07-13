"use client";

import React, { ReactNode } from "react";

const IconContainer = ({ children, handleClick }: { children: ReactNode, handleClick?: () => void}) => {
  return (
    <div onClick={handleClick} className=" p-2 size-10">
      {children}
    </div>
  );
};

export default IconContainer;
