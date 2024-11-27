import { memo } from "react";

type PerformanceStateProps = {
  label: string;
  value: string; // Support numeric values
};

const PerformanceState = memo(function PerformanceState({
  label,
  value,
}: PerformanceStateProps) {
  return (
    <div className="p-2 rounded-md bg-gray-200 flex-1" role="group" aria-label={`${label}: ${value}`}>
      <p className="text-xs font-bold text-gray-600">{label}</p>
      <p className="text-sm mt-1 font-semibold" aria-hidden="true">
        {value}
      </p>
    </div>
  );
});

export default PerformanceState;
