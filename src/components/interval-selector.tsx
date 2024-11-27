import { useCallback } from "react";
import { INTERVAL_OPTIONS, Intervals } from "../utils/constants";
import useComponentVisible from "../utils/hooks/useComponentVisible";
import { useStockQuery, useStockDispatch } from "../utils/hooks/useContext";

const IntervalSelector = () => {
  const { dataQuery } = useStockQuery();
  const { setDataQuery } = useStockDispatch();

  const { wrapRef, toggleChild, isComponentVisible } = useComponentVisible();

  const onIntervalSelect = useCallback(
    (interval: Intervals) => {
      setDataQuery((prev) => ({
        ...prev,
        interval,
      }));
    },
    [setDataQuery]
  );

  return (
    <div
      className="relative cursor-pointer"
      ref={wrapRef}
      onClick={toggleChild}
      aria-haspopup="listbox"
      aria-expanded={isComponentVisible}
    >
      <span className="font-semibold text-sm px-3 py-2 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 rounded-md">
        {dataQuery.interval}
      </span>
      {isComponentVisible && (
        <ul
          className="bg-white absolute top-10 w-[80px] rounded-md shadow-lg py-2"
          role="listbox"
        >
          {INTERVAL_OPTIONS.map((interval) => (
            <li
              key={interval}
              role="option"
              aria-selected={dataQuery.interval === interval}
              className="w-full font-medium text-sm p-2 bg-white hover:bg-gray-100 transition-all duration-200 ease-in-out"
              onClick={() => onIntervalSelect(interval)}
            >
              {interval}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IntervalSelector;
