import { Functions, Intervals } from './enums';

export * from './types';
export * from './enums';

export const INTERVAL_OPTIONS = Object.values(Intervals);

export const TIME_SERIES_FUNCTIONS = [
  { val: Functions.IME_SERIES_DAILY, label: "Daily" },
  { val: Functions.TIME_SERIES_WEEKLY, label: "Weekly" },
  { val: Functions.TIME_SERIES_MONTHLY, label: "Monthly" },
  { val: Functions.TIME_SERIES_INTRADAY, label: "Intraday" },
];

export const KEY_INTRADAY_TIME_SERIES = {
  "1min" : "Time Series (1min)",
  "5min" : "Time Series (5min)",
  "15min" : "Time Series (15min)",
  "30min" : "Time Series (30min)",
  "60min" : "Time Series (60min)"
}
export const KEY_DAILY_TIME_SERIES = "Time Series (Daily)";
export const KEY_WEEKLY_TIME_SERIES = "Weekly Time Series";
export const KEY_MONTHLY_TIME_SERIES = "Monthly Time Series";

export const CHART_TYPE_CANDLE = "candlestick";
export const CHART_TYPE_BAR = "bar";
