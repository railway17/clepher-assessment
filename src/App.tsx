import React from 'react';
import Header from './components/header';
import ChartView from './components/chart-view';
import { StockDataProvider } from './utils/contexts/StockContext';
import Chart from './components/chart-view/chart';
import LatestStats from './components/chart-view/latest-stats';
import './App.css';

function App() {
  return (
    <StockDataProvider>
      <Header />
      <ChartView>
        <Chart />
        <LatestStats />
      </ChartView>
    </StockDataProvider>
  );
}

export default App;
