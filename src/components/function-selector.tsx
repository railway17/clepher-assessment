import { useMemo, useCallback, KeyboardEvent } from "react";
import { Functions, TIME_SERIES_FUNCTIONS } from "../utils/constants";
import { useStockDispatch, useStockQuery } from "../utils/hooks/useContext";
import useComponentVisible from "../utils/hooks/useComponentVisible";

const FunctionSelector = () => {
  const { dataQuery } = useStockQuery();
  const { setDataQuery } = useStockDispatch();
  const { wrapRef, toggleChild, isComponentVisible, setIsComponentVisible } = useComponentVisible();

  // Derive the label to display in the dropdown button
  const timeSeriesLabel = useMemo(() => {
    return (
      TIME_SERIES_FUNCTIONS.find((el) => el.val === dataQuery?.function)?.label ||
      "Select Function"
    );
  }, [dataQuery?.function]);

  // Function to handle selecting a function from the dropdown
  const handleFunctionSelect = useCallback(
    (func: Functions) => {
      setDataQuery((prev) => ({
        ...prev,
        function: func,
      }));
      setIsComponentVisible(false); // Close the dropdown after selection
    },
    [setDataQuery, setIsComponentVisible]
  );

  // Handle keyboard navigation and accessibility
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        toggleChild();
        e.preventDefault();
      } else if (e.key === "Escape") {
        setIsComponentVisible(false);
      }
    },
    [toggleChild, setIsComponentVisible]
  );

  return (
    <div
      className="relative"
      ref={wrapRef}
      tabIndex={0} // Make it focusable for keyboard users
      onKeyDown={handleKeyDown}
      aria-haspopup="true"
      aria-expanded={isComponentVisible}
      aria-label="Function Selector"
    >
      <button
        className="font-semibold text-sm px-3 py-2 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={toggleChild}
        aria-expanded={isComponentVisible}
        aria-haspopup="listbox"
      >
        {timeSeriesLabel}
      </button>

      {isComponentVisible && (
        <ul
          className="bg-white absolute top-12 w-[160px] rounded-md shadow-lg py-2 z-10"
          role="listbox"
          tabIndex={-1}
        >
          {TIME_SERIES_FUNCTIONS.map(({ val, label }) => (
            <li
              key={val}
              onClick={() => handleFunctionSelect(val)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleFunctionSelect(val);
              }}
              className="font-medium text-sm p-2 hover:bg-gray-100 transition-all duration-200 ease-in-out cursor-pointer focus:bg-blue-100 focus:outline-none"
              role="option"
              aria-selected={dataQuery.function === val}
              tabIndex={0} // Allows focusing each list item
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FunctionSelector;
