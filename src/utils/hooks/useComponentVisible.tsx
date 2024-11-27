import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Custom hook to manage the visibility of a component.
 * It listens for clicks outside the component and the Escape key to toggle visibility.
 */
const useComponentVisible = (initialIsVisible = false) => {
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Toggle visibility manually
  const toggleChild = useCallback(() => {
    setIsComponentVisible((prev) => !prev);
  }, []);

  // Click outside handler
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
      setIsComponentVisible(false);
    }
  }, []);

  // Escape key handler
  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsComponentVisible(false);
    }
  }, []);

  // Add event listeners when component mounts
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [handleClickOutside, handleEscapeKey]);

  return {
    wrapRef,
    isComponentVisible,
    setIsComponentVisible,
    toggleChild,
  };
};

export default useComponentVisible;
