import { OrderItem } from "./OrderItem";

const OrderItems = () => {
  return (
    <div className="flex-1 items-container overflow-y-scroll">
      <h1>Items</h1>
      <OrderItem />
      <OrderItem />
    </div>
  );
};

export default OrderItems;
