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
      className={`${bg} ${textColor} px-3 w-[100px] text-center flex items-center justify-center rounded gap-1 text-[12px] min-h-[30px]`}
    >
      {circleBg && <span className={`block h-[6px] w-[6px] rounded-full ${circleBg}`}></span>}
      <span>{text}</span>
    </p>
  );
};

export default TableStatus;
