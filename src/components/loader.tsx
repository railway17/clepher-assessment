import React from "react";

type LoaderProps = {
  isLoading: boolean;
  message?: string; // Allow customizable loading message
  className?: string; // Allow additional styling
};

const Loader: React.FC<LoaderProps> = ({ isLoading, message = "Loading...", className = "" }) => {
  if (!isLoading) {
    return null; // Return null instead of an empty fragment
  }

  return (
    <div
      className={`h-full flex justify-center items-center ${className}`}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
};

export default Loader;
