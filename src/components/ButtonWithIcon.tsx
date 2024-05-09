import React from "react";
import { Button } from "./ui/button";

interface ButtonWithIconProps {
  text: string;
  children: React.ReactNode
}
const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({ text, children }) => {
  return (
    <div>
      <Button className="flex items-center justify-between min-w-[100px]">
        <span className="text-md font-medium">{text}</span>
       {children}
      </Button>
    </div>
  );
};

export default ButtonWithIcon;
