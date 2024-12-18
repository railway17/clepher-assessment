import { Functions } from "../constants";
import getSeriesKey from "./get-series-key";
import modifyDateTime from "./modify-datetime";

const modifyTimeSeriesData = (
  chartData: any,
  func: Functions,
  interval?: string
) => {
  if (!chartData) return;

  const currentTimeSeriesKey = getSeriesKey(func, interval);
  const currentTimeSeriesData = chartData[currentTimeSeriesKey];

  if (!currentTimeSeriesData) {
    return [
      {
        data: [],
      },
    ];
  }

  return [
    {
      data: Object.keys(currentTimeSeriesData).map((el) => ({
        x: modifyDateTime(el, func),
        y: [
          currentTimeSeriesData[el]["1. open"],
          currentTimeSeriesData[el]["2. high"],
          currentTimeSeriesData[el]["3. low"],
          currentTimeSeriesData[el]["4. close"],
        ],
      })),
    },
  ];
};

export default modifyTimeSeriesData;
