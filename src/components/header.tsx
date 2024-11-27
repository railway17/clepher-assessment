import React, { useContext } from 'react';
import SelectorDivider from './selector-divider';
import { Functions } from '../utils/constants';
import { StockContext } from '../utils/contexts/StockContext';
const SymbolSelector = React.lazy(() => import('./symbol-selector'));
const IntervalSelector = React.lazy(() => import('./interval-selector'));
const FunctionSelector = React.lazy(() => import('./function-selector'));

function Header() {
  const { dataQuery } = useContext(StockContext);
  const shouldRenderIntervalSelector = dataQuery.function === Functions.TIME_SERIES_INTRADAY;

  return (
    <div className="px-4 flex items-center h-12 shadow-lg fixed top-0 left-0 w-full z-50 bg-white">
      <div className="header-content flex items-center gap-4">
        <SymbolSelector />
        <SelectorDivider />
        {shouldRenderIntervalSelector && <IntervalSelector />}
        <SelectorDivider />
        <FunctionSelector />
      </div>
    </div>
  );
}

export default Header;
