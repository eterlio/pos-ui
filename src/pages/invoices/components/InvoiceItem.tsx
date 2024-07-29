import { formatCurrency } from "@/helpers";
import { Trash } from "lucide-react";
import { FC } from "react";

interface InvoiceItemProps {
  item: {
    amount: number;
    quantity: number;
    item: string;
  };
}
const InvoiceItem: FC<InvoiceItemProps> = ({ item }) => {
  const totalPrice = item.quantity * item.amount;
  return (
    <div className="flex item-center text-[12px] relative border-b pb-1">
      <div className="w-[60%] flex gap-x-4 items-center">
        <div className="item-title">
          <p>{item.item}</p>
        </div>
      </div>
      <div className="w-[40%] flex items-center justify-between">
        <p className="text-start w-[38%]">{item.quantity}</p>
        <p className="text-center w-[30%]">{formatCurrency({ value: item.amount, showCurrencySign: false })}</p>
        <p className=" w-1/3 text-right">{formatCurrency({ value: totalPrice })}</p>
      </div>
      <div className="absolute top-[-0.25rem] right-[-37px]">
        <button className="p-1 hover:bg-primary hover:text-white bg-transparent">
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
};

export default InvoiceItem;
