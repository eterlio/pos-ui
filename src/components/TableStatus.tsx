import { FC } from "react";

interface TableStatusProps {
  text: string;
  bg: string;
  textColor: string;
  circleBg?: string;
}
const TableStatus: FC<TableStatusProps> = ({ bg, text, textColor, circleBg }) => {
  return (
    <p
      className={`${bg} ${textColor} px-2 w-[100px] text-center flex items-center justify-center rounded gap-1 text-[12px] min-h-[25px]`}
    >
      {circleBg && <span className={`block h-[5px] w-[5px] rounded-full ${circleBg}`}></span>}
      <span>{text}</span>
    </p>
  );
};

export default TableStatus;
