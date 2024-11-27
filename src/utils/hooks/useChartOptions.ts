import { useMemo } from 'react';
import { QueryType } from '../constants';
import getChartOptions from '../chart-utils/get-chart-options';

const useChartOptions = (chartData: any, dataQuery: QueryType) => {
    return useMemo(() => ({
      bar: getChartOptions(chartData, 'bar', dataQuery.function, dataQuery.interval),
      candle: getChartOptions(chartData),
    }), [chartData, dataQuery.function, dataQuery.interval]);
};

export default useChartOptions;

  