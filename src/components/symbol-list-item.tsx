import { SymbolResult, Symbols } from "../utils/constants";

type SymbolListItemProps = {
  item: SymbolResult;
  onItemClick: (symbol: Symbols) => void;
};

const SymbolListItem = ({ item, onItemClick }: SymbolListItemProps) => {
  const { "1. symbol": symbol, "2. name": name, "3. type": type, "4. region": region } = item;

  return (
    <div
      onClick={() => onItemClick(symbol)}
      className="py-2 px-1 w-full border-b border-gray-200 flex justify-between items-center bg-white hover:bg-gray-100 cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onItemClick(symbol)} // Accessibility for keyboard navigation
    >
      <div className="flex flex-col items-start flex-1">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-500">{symbol}</p>
      </div>

      <div className="flex flex-col items-end flex-1">
        <p className="font-medium">{region}</p>
        <p className="text-sm text-gray-500">{type}</p>
      </div>
    </div>
  );
};

export default SymbolListItem;
