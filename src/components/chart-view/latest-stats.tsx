import { useContext, useMemo } from "react";
import PerformanceState from "../performance-state";
import { StockContext } from "../../utils/contexts/StockContext";
import toFixedIfNecessary from "../../utils/chart-utils/to-fixed-if-necessary";
import Loader from "../loader";
import ApiLimit from "../api-limit";

const LatestStats = () => {
  const { lastTradedData, lastTradedLoading } = useContext(StockContext);

  const stats = useMemo(() => {
    if (!lastTradedData) return null;

    const price = Number(lastTradedData["05. price"]);
    const change = Number(lastTradedData["09. change"]);
    const isNegative = change < 0;

    return {
      symbol: lastTradedData["01. symbol"],
      price: toFixedIfNecessary(price, 2),
      change: toFixedIfNecessary(Math.abs(change), 2),
      changePercent: lastTradedData["10. change percent"],
      latestTradingDay: new Date(lastTradedData["07. latest trading day"]).toLocaleDateString("en-US", {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      }),
      high: toFixedIfNecessary(Number(lastTradedData["03. high"]), 2),
      low: toFixedIfNecessary(Number(lastTradedData["04. low"]), 2),
      open: toFixedIfNecessary(Number(lastTradedData["02. open"]), 2),
      volume: lastTradedData["06. volume"],
      isNegative,
      textClass: isNegative ? "text-red-800" : "text-green-800",
    };
  }, [lastTradedData]);

  if (lastTradedLoading) {
    return (
      <div className="p-4 lg:p-10 lg:h-full w-full lg:w-[30%] lg:border-l-2 lg:border-solid lg:border-b-slate-700">
        <Loader isLoading={true} />
      </div>
    );
  }

  if (!lastTradedData || lastTradedData["Information"]) {
    return (
      <div className="p-4 lg:p-10 lg:h-full w-full lg:w-[30%] lg:border-l-2 lg:border-solid lg:border-b-slate-700">
        <ApiLimit />
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-10 lg:h-full w-full lg:w-[30%] lg:border-l-2 lg:border-solid lg:border-b-slate-700">
      <h1 className="font-bold text-xl">{stats?.symbol}</h1>
      <h1 className="font-semibold text-2xl">
        {stats?.price}
        &nbsp;
        <span className={`${stats?.textClass} text-sm font-medium`}>
          {stats?.isNegative ? "-" : "+"}
          {stats?.change} &nbsp;({stats?.isNegative ? "-" : "+"}{stats?.changePercent})
        </span>
      </h1>
      <p className="text-gray-400 text-xs">{stats?.latestTradingDay}</p>

      <h1 className="mt-4 text-sm font-bold">Performance</h1>
      <div className="flex flex-wrap gap-4 mt-3">
        {[
          { label: "High", value: stats?.high },
          { label: "Low", value: stats?.low },
          { label: "Open", value: stats?.open },
          { label: "Volume", value: stats?.volume },
        ].map(({ label, value }) => (
          <PerformanceState key={label} label={label} value={String(value)} />
        ))}
      </div>
    </div>
  );
};

export default LatestStats;
