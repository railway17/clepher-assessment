import { useContext } from 'react';
import ReactChart from 'react-apexcharts';
import { StockContext } from '../../utils/contexts/StockContext';
import Loader from '../loader';
import ApiLimit from '../api-limit';
import useChartSeries from '../../utils/hooks/useChartSeries';
import useChartOptions from '../../utils/hooks/useChartOptions';

const Chart = () => {
  const { chartData, dataQuery, chartLoading } = useContext(StockContext);
  const { barSeries, candleSeries } = useChartSeries(chartData, dataQuery);
  const options = useChartOptions(chartData, dataQuery);

  const renderCharts = () => (
    <>
      <div className="h-[30%] absolute bottom-[2%] opacity-40 w-full pl-5">
        <ReactChart
          type="bar"
          height="100%"
          series={barSeries}
          options={options.bar}
        />
      </div>
      <ReactChart
        height="100%"
        type="candlestick"
        series={candleSeries}
        options={options.candle}
      />
    </>
  );

  return (
    <div className="h-[95%] w-full lg:w-[70%] pt-6 relative">
      <Loader isLoading={chartLoading} />
      {!chartLoading && chartData && (
        chartData.Information ? <ApiLimit /> : renderCharts()
      )}
    </div>
  );
};

export default Chart;
