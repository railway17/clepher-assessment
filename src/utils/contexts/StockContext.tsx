import axios from "../../http/axios";
import { Symbols, Intervals, Functions, QueryType } from "../constants";
import { Context, ReactNode, createContext, Dispatch, SetStateAction, useEffect, useState } from "react";

type ContextType = {
  chartData: any;
  chartLoading: boolean;
  lastTradedLoading: boolean;
  dataQuery: QueryType;
  lastTradedData: Record<string, string> | null,
}


const defaultData: QueryType = {
  symbol: Symbols.IBM,
  interval: Intervals.FIVE_MIN,
  function: Functions.TIME_SERIES_INTRADAY,
}

type DispatchContextType = {
  setChartData: Dispatch<SetStateAction<any>>;
  setChartLoading: Dispatch<SetStateAction<boolean>>;
  setLastTradedLoading: Dispatch<SetStateAction<boolean>>;
  setDataQuery: Dispatch<SetStateAction<QueryType>>;
  setLastTradedData: Dispatch<SetStateAction<Record<string, string> | null>>,
};

const StockContext: Context<ContextType> = createContext(undefined as any);
const StockDispatchContext: Context<DispatchContextType> = createContext(undefined as any);

function StockDataProvider({ children }: { children: ReactNode }) {
  const [dataQuery, setDataQuery] = useState<QueryType>(defaultData);
  const [chartData, setChartData] = useState<any>(null);
  const [chartLoading, setChartLoading] = useState<boolean>(false);
  const [lastTradedLoading, setLastTradedLoading] = useState<boolean>(false);
  const [lastTradedData, setLastTradedData] = useState<Record<string, string> | null>(null);
  
  useEffect(() => {
    const modifyUrl = () => {
      let queryString = `function=${dataQuery.function}&symbol=${dataQuery.symbol}`;
      if (dataQuery.function === Functions.TIME_SERIES_INTRADAY) {
        return `${queryString}&interval=${dataQuery.interval}`;
      }
      return queryString;
    }

    const getStockData = async () => {
      setChartLoading(true);
      const response = await axios.get(`?${modifyUrl()}&apikey=${process.env.REACT_APP_API_KEY}`);
      setChartData(response.data);      
      setChartLoading(false);
    }

    getStockData();
  }, [dataQuery.interval, dataQuery.function, dataQuery.symbol]);

  useEffect(() => {
    const fetchLastTradedData = async () => {
      setLastTradedLoading(true);
      const response = await axios.get(`?function=GLOBAL_QUOTE&symbol=${dataQuery.symbol}&apikey=${process.env.REACT_APP_API_KEY}`);

      if (response.data && response.data["Global Quote"]) {
        setLastTradedData(response.data["Global Quote"]);
      }
      
      setLastTradedLoading(false);
    }

    fetchLastTradedData();
  }, [dataQuery.symbol])

  const contextValues = {
    dataQuery,
    chartData,
    chartLoading,
    lastTradedData,
    lastTradedLoading
  }

  const contextSetterValues = {
    setDataQuery,
    setChartData,
    setChartLoading,
    setLastTradedData,
    setLastTradedLoading
  }

  return (
    <StockContext.Provider value={contextValues}>
      <StockDispatchContext.Provider value={contextSetterValues}>
        {children}
      </StockDispatchContext.Provider>
    </StockContext.Provider>
  );
}

export { StockDataProvider, StockContext, StockDispatchContext };