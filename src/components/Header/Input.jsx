import React, { useId } from "react";

export const Input = ({
  label,
  type = "text",
  className = "",
  ref,
  ...props
}) => {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1" htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );
};
