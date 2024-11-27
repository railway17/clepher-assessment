
import {Symbols, Intervals, Functions} from './enums';

export type QueryType = {
    symbol: Symbols;
    interval: Intervals;
    function: Functions;
}

export type SymbolResult = {
    ["1. symbol"]: Symbols;
    ["2. name"]: string;
    ["3. type"]: string;
    ["4. region"]: string;
}