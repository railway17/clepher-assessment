import { useMemo } from 'react';
import { QueryType } from '../constants';
import modifyVolumeSeries from '../chart-utils/modify-volume-series';
import modifyTimeSeriesData from '../chart-utils/modify-time-series-data';

const useChartSeries = (chartData: any, dataQuery: QueryType) => {
    const barSeries = useMemo(() => {
      if (!chartData) return [];
      return modifyVolumeSeries(chartData, dataQuery.function, dataQuery.interval);
    }, [chartData, dataQuery.function, dataQuery.interval]);
  
    const candleSeries = useMemo(() => {
      if (!chartData) return [];
      return modifyTimeSeriesData(chartData, dataQuery.function, dataQuery.interval);
    }, [chartData, dataQuery.function, dataQuery.interval]);
  
    return { barSeries, candleSeries };
};

export default useChartSeries