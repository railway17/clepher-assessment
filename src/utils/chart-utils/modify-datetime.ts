import { Functions } from "../constants";

const modifyDateTime = (date: string, func: Functions) => {
  if (func === Functions.TIME_SERIES_INTRADAY) {
    return new Date(date.split(" ").join("T")).getTime();
  }
  
  return new Date(date);  
};

export default modifyDateTime;
