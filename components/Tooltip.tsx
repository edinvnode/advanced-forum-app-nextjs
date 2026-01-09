"use client";

import React from "react";

type TooltipProps = {
  text: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
};

const positionClasses = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

export default function Tooltip({
  text,
  children,
  position = "top",
}: TooltipProps) {
  return (
    <div className="relative inline-block group">
      {children}

      <span
        className={`
          absolute z-50 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-sm text-white
          opacity-0 invisible transition-all duration-200
          group-hover:opacity-100 group-hover:visible
          ${positionClasses[position]}
        `}
      >
        {text}
      </span>
    </div>
  );
}
