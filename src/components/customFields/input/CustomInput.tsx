import { Input, InputProps } from "@/components/ui/input";
import { ChangeEvent, FC } from "react";
import { FormIconProps, HandlerProps } from "../type";
import InputLabel from "../FieldLabel";
import InputError from "./InputError";
import { LucideIcon } from "lucide-react";

interface CustomFieldProps extends InputProps {
  label?: string | { text: string; icon?: FormIconProps; className?: string };
  isRequired?: boolean;
  handleInputChange: (data: HandlerProps) => void;
  errorMessage?: string;
  fieldKey: string;
  type: HTMLInputElement["type"];
  icon?: {
    element: LucideIcon;
    show?: boolean;
    position: "left" | "right";
  };
}

const CustomField: FC<CustomFieldProps> = ({
  value,
  onBlur,
  handleInputChange,
  disabled,
  label,
  id,
  errorMessage,
  isRequired,
  fieldKey,
  type,
  icon,
  ...props
}) => {
  const handleInputFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      target: { value }
    } = event;

    if (handleInputChange) {
      handleInputChange({ key: fieldKey, value });
    }
  };

  const inputPaddingLeft = icon && icon.show && icon.position === "left" ? "pl-10" : "";
  const inputPaddingRight = icon && icon.show && icon.position === "right" ? "pr-10" : "";

  return (
    <div className="w-full">
      {label && (
        <div className="my-2">
          <InputLabel id={id} required={isRequired || false} label={label} />
        </div>
      )}
      <div className="relative">
        {icon && icon.show && icon.position === "left" && (
          <div
            className="absolute flex items-center justify-center top-1 left-1 h-[33px] w-[33px] bg-gray-100 rounded-bl-sm rounded-tl-sm"
            style={{
              lineHeight: "2.5rem"
            }}
          >
            <icon.element size={18} />
          </div>
        )}
        <Input
          type={type}
          name={fieldKey}
          value={value}
          onBlur={onBlur}
          onChange={handleInputFieldChange}
          disabled={disabled}
          className={`${inputPaddingLeft} ${inputPaddingRight}`}
          {...props}
          id={id}
        />
        {icon && icon.show && icon.position === "right" && (
          <div
            className="absolute flex items-center justify-center top-1 right-1 h-[33px] w-[33px] bg-gray-100 rounded-br-sm rounded-tr-sm"
            style={{
              lineHeight: "2.5rem"
            }}
          >
            <icon.element size={18} />
          </div>
        )}
      </div>
      {errorMessage && <InputError message={errorMessage} />}
    </div>
  );
};

export default CustomField;
