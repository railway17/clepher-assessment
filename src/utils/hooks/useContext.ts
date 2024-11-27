import { useContext } from "react";
import { StockContext, StockDispatchContext } from "../contexts/StockContext";

export const useStockQuery = () => useContext(StockContext);
export const useStockDispatch = () => useContext(StockDispatchContext);
