import { X } from "lucide-react";
import { FC } from "react";

interface SingleOption {
  value: string;
  label?: string;
  handleItemDelete: (value: any) => void;
}
const SingleOption: FC<SingleOption> = ({ value, label, handleItemDelete }) => {
  return (
    <div
      key={value}
      className="m-[2px] gap-1 pr-0.5 bg-gray-100 border rounded flex space-x-1 pl-1"
    >
      <span>{label}</span>
      <span
        onClick={(e) => {
          e.preventDefault();
          handleItemDelete(value);
        }}
        className="flex items-center rounded-sm px-[1px] hover:bg-accent hover:text-red-500"
      >
        <X size={14} />
      </span>
    </div>
  );
};

export default SingleOption;
