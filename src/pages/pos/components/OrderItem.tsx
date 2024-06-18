import { Trash2 } from "lucide-react";

import Tile from "@/assets/tile.jpg";

export const OrderItem = () => {
    const handleIncrement = () => {
        console.log("Increment");
      };
    
      const handleDecrement = () => {
        console.log("Decrement");
      };
  return (
    <div className="border-b my-3 item-container p-0.5">
    <div className="min-h-[70px] flex justify-between gap-4 my-4">
      <div className="item-img w-[20%] h-[70px] border">
        <img src={Tile} alt="" className="h-full w-full"/>
      </div>
      <div className="flex flex-col flex-1">
        <p>Some long item name</p>
        <div className="flex flex-1 items-end">
          <div className="flex flex-1 gap-2">
            <QuantityButton isIncrement={false} onClick={handleDecrement} />
            <p>1</p>
            <QuantityButton isIncrement={true} onClick={handleIncrement} />
          </div>
        </div>
      </div>
      <div className="trash-amount__container flex flex-col justify-between">
        <div className="flex items-center justify-end">
          <Trash2 />
        </div>
        <div className="flex items-end justify-between gap-2">
          <span className="text-[10px] text-gray-500 block -mb-0.5">1 X</span>
          <span className="font-semibold block -mb-1">&#8373;24.00</span>
        </div>
      </div>
    </div>
  </div>
  );
};



interface QuantityButtonProps {
    isIncrement: boolean;
    onClick: () => void;
  }
  
  const QuantityButton: React.FC<QuantityButtonProps> = ({ isIncrement, onClick }) => {
    return (
      <span
        className={`w-[23px] h-[23px] rounded-[100%] flex items-center justify-center cursor-pointer ${
          isIncrement ? "bg-primary text-white" : "bg-gray-300 text-primary"
        }`}
        onClick={onClick}
      >
        {isIncrement ? "+" : "-"}
      </span>
    );
  };
  