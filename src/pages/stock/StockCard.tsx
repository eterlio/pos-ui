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
    batchId?: string;
    remark?: string;
  };
}
const StockCard: FC<StockCardProps> = ({
  product,
  stock: { quantityExpected = 0, quantityReceived = 0, status, batchId = "", remark = "" }
}) => {
  return (
    <div className="mb-2 rounded border-[1.8px] p-4 border-primary min-h-[200px] flex flex-col">
      <div className="space-y-1 text-center">
        <h1 className="font-medium">Product</h1>
        <p className="text-center">{product?.name}</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="font-medium">Expected Quantity</h1>
          <p className="text-center">{quantityExpected}</p>
        </div>
        <div className="space-y-1">
          <h1 className="font-medium">Quantity Received</h1>
          <p className="text-center">{quantityReceived}</p>
        </div>
      </div>
      <div className="flex items-center justify-center flex-1 flex-col mt-3">
        <div>
          <h1 className="font-bold text-2xl text-center">{quantityExpected - quantityReceived}</h1>
          <p>Discrepancy</p>
        </div>
        <div className="text-[10px] text-gray-500">{startCase(status)}</div>
        <div className="mt-2">{batchId}</div>
      </div>
      <div>
        <p className="text-[12px] text-center mt-3">{remark}</p>
      </div>
    </div>
  );
};

export default StockCard;
