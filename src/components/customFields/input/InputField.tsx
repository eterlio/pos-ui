import { Input, InputProps } from "@/components/ui/input";
import { ChangeEvent, FC } from "react";
import { FormIconProps, HandlerProps } from "../type";
import InputLabel from "../FieldLabel";
import InputError from "./InputError";

interface InputFieldProps extends InputProps {
  label?: string | { text: string; icon?: FormIconProps; className?: string };
  isRequired?: boolean;
  handleInputChange: (data: HandlerProps) => void;
  name: string;
  errorMessage?: string;
}
const InputField: FC<InputFieldProps> = ({
  name,
  value,
  onBlur,
  handleInputChange,
  disabled,
  label,
  id,
  errorMessage,
  isRequired,
  ...props
}) => {
  const handleInputFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      target: { value }
    } = event;

    if (handleInputChange) {
      handleInputChange({ key: name, value });
    }
  };
  return (
    <div className="w-full">
      {label && <InputLabel id={id} required={isRequired || false} label={label} />}
      <Input
        type={name}
        value={value || ""}
        onBlur={onBlur}
        onChange={handleInputFieldChange}
        disabled={disabled}
        {...props}
        id={id}
      />
      {errorMessage && <InputError message={errorMessage} />}
    </div>
  );
};

export default InputField;
