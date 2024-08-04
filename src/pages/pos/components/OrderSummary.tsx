import { formatCurrency } from "@/helpers";
import { Discount } from "@/interfaces/invoice";
import { calculateDiscountAmount } from "@/utils";
import { FC } from "react";

interface OrderSummaryProps {
  totalItems: number;
  totalItemAmount: number;
  title: string;
  discount?: Discount;
}
const OrderSummary: FC<OrderSummaryProps> = ({ totalItemAmount, totalItems, title, discount }) => {
  const discountValue = discount?.value || 0;
  const discountType = discount?.type;
  const discountText = discountType === "percentage" ? `${discountValue}%` : discountValue;
  const calculateDiscount = calculateDiscountAmount(totalItemAmount, discount);
  return (
    <div className="receipt mb-10 min-h-[60px]">
      <h1>{title}</h1>
      <div className="bg-gray-100 rounded px-2 h-full">
        <div className="upper space-y-2 text-[13px]">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 font-light">Item</p>
            <p className="font-semibold">{totalItems} Items</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-500 font-light">Sub Total</p>
            <p className="font-semibold">{formatCurrency({ value: totalItemAmount })}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-500 font-light">Discount({discountText})</p>
            <p className="font-semibold">{formatCurrency({ value: calculateDiscount })}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-500 font-light">Tax(0%)</p>
            <p className="font-semibold">{formatCurrency({ value: 0 })}</p>
          </div>
        </div>
        <div className="lower mt-2 text-[13px] border-t border-t-gray-600 border-dashed w-full">
          <div className="flex justify-between items-center mt-2">
            <p className="text-gray-700">Total</p>
            <p className="font-semibold">{formatCurrency({ value: totalItemAmount - calculateDiscount })}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
