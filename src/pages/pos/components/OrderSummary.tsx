import { formatCurrency } from "@/helpers";
import { FC } from "react";

interface OrderSummaryProps {
  totalItems: number;
  totalItemAmount: number;
}
const OrderSummary: FC<OrderSummaryProps> = ({ totalItemAmount, totalItems }) => {
  return (
    <div className="receipt mb-10 min-h-[80px]">
      <h1>Order Summary</h1>
      <div className="bg-gray-100 rounded p-2 h-full">
        <div className="upper space-y-2 text-[13px]">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 font-light">Item</p>
            <p className="font-semibold">{totalItems} Items</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-500 font-light">Sub Total</p>
            <p className="font-semibold">{formatCurrency(totalItemAmount)}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-500 font-light">Discount</p>
            <p className="font-semibold">&#8373;0</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-500 font-light">Tax(0%)</p>
            <p className="font-semibold">&#8373;0</p>
          </div>
        </div>
        <div className="lower mt-4 text-[13px] border-t border-t-gray-600 border-dashed w-full">
          <div className="flex justify-between items-center mt-2">
            <p className="text-gray-700">Total</p>
            <p className="font-semibold">{formatCurrency(totalItemAmount)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
