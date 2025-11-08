import React from "react";

export function Button({
  childern,
  type = "button",
  bgColor = "bg-blue-500",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${textColor} ${bgColor}${className}`}
      {...props}
      type={type}
    >
      {childern}
    </button>
  );
}
