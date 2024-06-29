import { Trash2 } from "lucide-react";

import Tile from "@/assets/tile.jpg";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import usePosStore from "@/store/usePosStore";
import useProductStore from "@/store/useProductStore";

interface Item {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const OrderItem: FC<{ item: Item }> = ({ item }) => {
  const { removeItem, incrementItemQuantity, decrementItemQuantity } = usePosStore();
  const { getProductById } = useProductStore();
  const handleIncrement = () => {
    incrementItemQuantity(item.id, 1);
  };

  const handleDecrement = () => {
    decrementItemQuantity(item.id, 1);
  };
  const handleItemRemove = () => {
    removeItem(item.id);
  };
  const product = getProductById(item.id);
  return (
    <div className="border-b my-3 item-container p-0.5">
      <div className="min-h-[70px] flex justify-between gap-4 my-4">
        <div className="item-img w-[20%] h-[70px] border">
          <img src={Tile} alt="" className="h-full w-full" />
        </div>
        <div className="flex flex-col flex-1">
          <p>{item.name}</p>
          <div className="flex flex-1 items-end">
            <div className="flex flex-1 gap-2">
              <QuantityButton isIncrement={false} onClick={handleDecrement} disabled={item.quantity === 1} />
              <p>{item.quantity || 0}</p>
              <QuantityButton
                isIncrement={true}
                onClick={handleIncrement}
                disabled={product?.productQuantity?.availableQuantity === 0}
              />
            </div>
          </div>
        </div>
        <div className="trash-amount__container flex flex-col justify-between items-end">
          <Button
            className="flex items-center justify-center bg-gray-50 text-primary hover:bg-gray-100"
            size={"icon"}
            onClick={handleItemRemove}
          >
            <Trash2 />
          </Button>
          <div className="flex items-end justify-between gap-2">
            <span className="text-[10px] text-gray-500 block -mb-0.5">{item.quantity} X</span>
            <span className="font-semibold block -mb-1">&#8373;{item.price.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface QuantityButtonProps {
  isIncrement: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const QuantityButton: React.FC<QuantityButtonProps> = ({ isIncrement, onClick, disabled }) => {
  return (
    <button
      className={`w-[25px] h-[25px] rounded-full flex items-center justify-center cursor-pointer ${
        isIncrement ? "bg-primary text-white" : "bg-gray-300 text-primary disabled:opacity-40"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {isIncrement ? "+" : "-"}
    </button>
  );
};
