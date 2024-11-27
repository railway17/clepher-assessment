import { FC, ReactNode} from 'react';

interface ChartViewProps {
  bgColor?: string;
  children?: ReactNode;
}

const ChartView: FC<ChartViewProps> = ({ bgColor = "bg-white", children }) => {
  return (
    <div className={`h-[100vh] pt-10 ${bgColor} w-full`}>
      <div className="px-4 h-full flex flex-col-reverse lg:flex-row">
        {children}
      </div>
    </div>
  );
};

export default ChartView;
