import {
  KEY_DAILY_TIME_SERIES,
  KEY_WEEKLY_TIME_SERIES,
  KEY_MONTHLY_TIME_SERIES,
  KEY_INTRADAY_TIME_SERIES,
  Functions,
} from "../constants";

const getSeriesKey = (func: string, interval?: string) => {
  switch (func) {
    case Functions.IME_SERIES_DAILY:
      return KEY_DAILY_TIME_SERIES;
    case Functions.TIME_SERIES_WEEKLY:
      return KEY_WEEKLY_TIME_SERIES;
    case Functions.TIME_SERIES_MONTHLY:
      return KEY_MONTHLY_TIME_SERIES;
    default:
      return KEY_INTRADAY_TIME_SERIES[
        interval as keyof typeof KEY_INTRADAY_TIME_SERIES
      ];
  }
};

export default getSeriesKey;
