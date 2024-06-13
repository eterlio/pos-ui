import { startCase } from "lodash";
import { FC } from "react";

interface StockCardProps {
  product: {
    name: string;
  };
  stock: {
    quantityExpected?: number;
    quantityReceived?: number;
    status?: "received" | "partially received";
  };
}
const StockCard: FC<StockCardProps> = ({ product, stock: { quantityExpected = 0, quantityReceived = 0, status } }) => {
  return (
    <div className="mb-2 rounded border-[1.8px] p-4 border-primary min-h-[200px] flex flex-col">
      <div className="flex items-center justify-between flex-wrap">
        <div className="space-y-1">
          <h1 className="font-medium">Product</h1>
          <p className="text-center">{product?.name}</p>
        </div>
        <div className="space-y-1">
          <h1 className="font-medium">Expected Quantity</h1>
          <p className="text-center">{quantityExpected}</p>
        </div>
        <div className="space-y-1  text-center w-full my-1 mb:my-auto md:w-auto md:text-start">
          <h1 className="font-medium">Quantity Received</h1>
          <p className="text-center">{quantityReceived}</p>
        </div>
      </div>
      <div className="flex items-center justify-center flex-1 flex-col">
        <div>
          <h1 className="font-bold text-2xl text-center">{quantityExpected - quantityReceived}</h1>
          <p>Discrepancy</p>
        </div>
        <div className="status -mb-5 text-[12px] text-gray-500">{startCase(status)}</div>
      </div>
    </div>
  );
};

export default StockCard;
