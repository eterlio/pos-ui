import { Input, InputProps } from "@/components/ui/input";
import { ChangeEvent, FC } from "react";
import { FormIconProps, HandlerProps } from "../type";
import InputLabel from "../FieldLabel";
import InputError from "./InputError";

interface InputFieldProps extends InputProps {
  label?: string | { text: string; icon?: FormIconProps; className?: string };
  isRequired?: boolean;
  handleInputChange: (data: HandlerProps) => void;
  fieldKey: string;
  errorMessage?: string;
}
const InputField: FC<InputFieldProps> = ({
  fieldKey,
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
      handleInputChange({ key: fieldKey, value });
    }
  };
  return (
    <div className="w-full">
      {label && (
        <div className="my-1">
          <InputLabel id={id} required={isRequired || false} label={label} />
        </div>
      )}
      <Input
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
