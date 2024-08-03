import { formatCurrency } from "@/helpers";
import { Discount } from "@/interfaces/invoice";
import { FC } from "react";

interface InvoiceSummaryProps {
  invoiceSubTotal: number;
  discount?: Discount;
  invoiceDiscountTotal: number;
}
const InvoiceSummary: FC<InvoiceSummaryProps> = ({ invoiceSubTotal, discount, invoiceDiscountTotal }) => {
  const discountValue = discount?.value || 0;
  const discountType = discount?.type;
  const discountText = discountType === "percentage" ? `${discountValue}%` : discountValue;

  const totalAmount = invoiceSubTotal - invoiceDiscountTotal;

  return (
    <div className="invoice-summary flex-1 w-full text-right mb-5">
      <div className="text-sm flex items-end justify-end flex-col space-y-1">
        <p className="w-1/2 lg:w-[40%] flex justify-between items-center">
          <span>Sub Total: </span>
          <span>{formatCurrency({ value: invoiceSubTotal })}</span>
        </p>
        <p className="w-1/2 lg:w-[40%] flex justify-between items-center">
          <span>Discount({discountText}):</span>
          <span>{formatCurrency({ value: invoiceDiscountTotal })}</span>
        </p>
        <p className="font-medium w-1/2 lg:w-[40%] flex justify-between items-center">
          <span>Total:</span>
          <span>{formatCurrency({ value: totalAmount })}</span>
        </p>
        <p className="font-medium w-1/2 lg:w-[40%] flex justify-between items-center">
          <span>Amount Due:</span>
          <span>{formatCurrency({ value: totalAmount })}</span>
        </p>
      </div>
    </div>
  );
};

export default InvoiceSummary;
