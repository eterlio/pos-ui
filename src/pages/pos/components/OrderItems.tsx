import { FC } from "react";
import { OrderItem } from "./OrderItem";

interface Item {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const OrderItems: FC<{ items: Item[] }> = ({ items }) => {
  return (
    <div className="flex-1 items-container overflow-y-scroll">
      {items.length > 0 && (
        <>
          <h1>Items</h1>
          {items.map((item, index) => {
            return <OrderItem item={item} key={index} />;
          })}
        </>
      )}
      {!items.length && (
        <div className="flex items-center justify-center flex-1 h-full">
          <h1 className="text-gray-500">Item carts is empty</h1>
        </div>
      )}
    </div>
  );
};

export default OrderItems;
