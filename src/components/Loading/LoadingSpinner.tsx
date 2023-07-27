import { ObjectList } from "@component/data/types";
import React from "react";

const sizeObject: ObjectList = {
  small: "h-6 w-6",
  medium: "h-12 w-12",
  large: "h-28 w-28",
  xl: "h-52 w-52",
} as const;

export default function Loading({
  iconColor,
  iconSize,
  strokeWidth,
}: {
  iconColor: string;
  iconSize: keyof typeof sizeObject;
  strokeWidth?: number;
}) {
  const color = `text-${iconColor}`;
  const className = `${color} w-fit`;

  const size = sizeObject[iconSize];

  return (
    <div className={className}>
      <div style={{ animation: "rotate 2s linear infinite" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={strokeWidth || 1.5}
          stroke="currentColor"
          className={size}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </div>
    </div>
  );
}
