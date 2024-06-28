import SelectField from "@/components/customFields/Select/SelectField";
import OrderItems from "./OrderItems";
import OrderSummary from "./OrderSummary";
import { Button } from "@/components/ui/button";
import usePosStore from "@/store/usePosStore";

const OrderDetails = () => {
  const { items, getItemTotalAmount, getTotalItems, removeItem } = usePosStore();
  const totalAmount = getItemTotalAmount();
  const totalItems = getTotalItems();

  return (
    <aside className="order-details__section md:w-[30%] border-l border-l-gray-300  bg-white p-2 flex flex-col overflow-hidden md:fixed right-0 bottom-0 top-0 mt-8">
      <div className="my-4">
        <div className="flex border-t border-t-gray-300">
          <h1 className="text-xl">Order Details</h1>
        </div>
        <SelectField fieldKey="customerId" label={"Customer Name"} onChange={() => {}} options={[]} />
      </div>
      <OrderItems items={items} removeItem={removeItem} />
      <div className="flex-1 h-full flex flex-col justify-end">
        <OrderSummary totalItems={totalItems} totalItemAmount={totalAmount} />
        <div className="pay-button mb-3 flex items-center gap-4">
          <Button className="w-full flex gap-2 items-center" disabled={totalAmount === 0}>
            <span>Pay</span>
            <span>&#8373;{totalAmount.toFixed(2)}</span>
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default OrderDetails;
