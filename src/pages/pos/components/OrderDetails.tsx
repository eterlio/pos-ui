import SelectField from "@/components/customFields/Select/SelectField";
import OrderItems from "./OrderItems";
import OrderSummary from "./OrderSummary";
import { Button } from "@/components/ui/button";


const OrderDetails = () => {
  return (
    <aside className="order-details__section w-[30%] border-l border-l-gray-300  bg-white p-2 flex flex-col overflow-hidden fixed right-0 bottom-0 top-0 mt-8">
      <div className="my-4">
        <div className="flex  border-t border-t-gray-300">
          <h1 className="text-xl">Order Details</h1>
        </div>
        <SelectField fieldKey="customerId" label={"Customer Name"} onChange={() => {}} options={[]} />
      </div>
      <OrderItems />
      <OrderSummary />
      <div className="pay-button mb-3 flex items-center gap-4">
        <Button className="w-full flex gap-2 items-center">
          <span>Pay</span>
          <span>&#8373;23.00</span>
        </Button>
      </div>
    </aside>
  );
};

export default OrderDetails;
