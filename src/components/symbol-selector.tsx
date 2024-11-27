import React, { useState, useEffect, useCallback, ChangeEvent, useContext } from "react";
import { FixedSizeList as List } from 'react-window';
import axios from "../http/axios";
import Modal from "./modal";
import useModal from "../utils/hooks/useModal";
import { useDebounce } from "../utils/hooks/useDebounce";
import { StockContext, StockDispatchContext } from "../utils/contexts/StockContext";
import { SymbolResult, Symbols } from "../utils/constants";
import EmptyResult from "./empty-result";
import SymbolListItem from "./symbol-list-item";
import { ReactComponent as SearchSvg } from '../assets/search.svg';
import { ReactComponent as ClearSvg } from '../assets/clear.svg';

const SymbolSelector = () => {
  const { toggleModal, closeModal, isOpen } = useModal();
  const { dataQuery } = useContext(StockContext);
  const { setDataQuery } = useContext(StockDispatchContext);

  const [searchVal, setSearchVal] = useState<string>('');
  const [fetching, setFetching] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SymbolResult[]>([]);

  const searchQuery = useDebounce(searchVal.trim(), 1500);

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  }, []);

  const handleCloseModal = useCallback(() => {
    closeModal();
    setSearchVal('');
    setSearchResults([]);
  }, [closeModal]);

  const handleSymbolSelect = useCallback((symbol: Symbols) => {
    setDataQuery((prev) => ({
      ...prev,
      symbol,
    }));
    handleCloseModal();
  }, [setDataQuery, handleCloseModal]);

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }

    const fetchSymbols = async () => {
      try {
        setFetching(true);
        const response = await axios.get(`?function=SYMBOL_SEARCH&keywords=${searchQuery}&apikey=${process.env.REACT_APP_API_KEY}`);
        if (response.data?.bestMatches) {
          setSearchResults(response.data.bestMatches);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error fetching symbols:", error);
        setSearchResults([]);
      } finally {
        setFetching(false);
      }
    };

    fetchSymbols();
  }, [searchQuery]);

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const symbolRes = searchResults[index];
    return (
      <div style={style}>
        <SymbolListItem
          key={symbolRes["1. symbol"]}
          item={symbolRes}
          onItemClick={handleSymbolSelect}
        />
      </div>
    );
  };

  return (
    <>
      <div onClick={toggleModal} className="cursor-pointer flex items-center gap-2 hover:bg-gray-100 px-3">
        <span className="font-bold text-sm py-2">
          {dataQuery.symbol || "Select Symbol"}
        </span>
        <SearchSvg />
      </div>

      {isOpen && (
        <Modal closeModal={handleCloseModal}>
          <div className="h-[500px] overflow-y-hidden">
            <div className="relative">
              <input
                value={searchVal}
                onChange={handleSearch}
                placeholder="Search for a symbol..."
                aria-label="Search for a stock symbol"
                className="w-full outline-transparent focus:outline-1 focus:outline-slate-500 border border-gray-400 rounded-md p-2"
              />
              {searchVal && (
                <button
                  onClick={() => setSearchVal('')}
                  className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <ClearSvg />
                </button>
              )}
            </div>

            <div className="flex flex-1 h-full overflow-y-auto flex-col justify-start items-start py-4">
              {fetching ? (
                <div className="flex justify-center items-center py-4">Loading...</div>
              ) : searchResults.length > 0 ? (
                <List
                  height={400}
                  itemCount={searchResults.length}
                  itemSize={50}
                  width="100%"
                >
                  {Row}
                </List>
              ) : searchVal.length > 0 ? (
                <EmptyResult />
              ) : null}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default SymbolSelector;
