import { FC } from "react";
import { FormIconProps } from "./type";
import { Label } from "../ui/label";

interface InputLabelProps {
  label?: string | { text: string; icon?: FormIconProps; className?: string };
  id?: string;
  required?: boolean;
}

const InputLabel: FC<InputLabelProps> = ({ label, id, required }) => {
  return (
    <>
      {label && typeof label === "string" && (
        <Label htmlFor={id} className="cursor-pointer text-sm my-1">
          {label} {required && <sup className="font-bold text-red-500">*</sup>}
        </Label>
      )}

      {label && typeof label !== "string" && (
        <Label htmlFor={id} className={`my-1 cursor-pointer text-sm block ${label.className || ""}`}>
          {label.text}
          {required && <sup className="font-bold text-red-500">*</sup>}
        </Label>
      )}
    </>
  );
};

export default InputLabel;
