import { FC } from "react";

export const HeaderText: FC<{ text: string; className?: string }> = ({
  text,
  className,
  ...props
}) => {
  return (
    <div className={`text-3xl font-bold ${className}`} {...props}>
      {text}
    </div>
  );
};
