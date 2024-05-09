import { FC } from "react";
import { FormIconProps } from "./type";

interface InputLabelProps {
  label?: string | { text: string; icon?: FormIconProps; className?: string };
  id?: string;
  required?: boolean;
}

const InputLabel: FC<InputLabelProps> = ({ label, id, required }) => {
  return (
    <>
      {label && typeof label === "string" && (
        <label htmlFor={id} className="cursor-pointer text-sm  my-1">
          {label} {required && <sup className="font-bold text-red-500">*</sup>}
        </label>
      )}

      {label && typeof label !== "string" && (
        <label
          htmlFor={id}
          className={`my-1 cursor-pointer text-sm block ${
            label.className || ""
          }`}
        >
          {label.text}
          {required && <sup className="font-bold text-red-500">*</sup>}
        </label>
      )}
    </>
  );
};

export default InputLabel;
