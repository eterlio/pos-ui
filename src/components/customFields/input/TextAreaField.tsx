import { Textarea, TextareaProps } from "@/components/ui/textarea";
import { FormIconProps } from "../type";
import { ChangeEvent, FC } from "react";
import InputLabel from "../FieldLabel";
import InputError from "./InputError";

interface TextAreaFieldProps extends TextareaProps {
  label?: string | { text: string; icon?: FormIconProps; className?: string };
  isRequired?: boolean;
  handleInputChange: (data: { key: string; value: any }) => void;
  fieldKey: string;
  errorMessage?: string;
}
const TextAreaField: FC<TextAreaFieldProps> = ({
  fieldKey,
  value,
  onBlur,
  handleInputChange,
  disabled,
  label,
  id,
  isRequired,
  errorMessage,
  ...props
}) => {
  const handleInputFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      target: { value }
    } = event;

    if (handleInputChange && fieldKey) {
      handleInputChange({ key: fieldKey, value });
    }
  };
  return (
    <div>
      {label && (
        <div className="my-1">
          <InputLabel id={id} required={isRequired || false} label={label} />
        </div>
      )}
      <Textarea
        name={fieldKey}
        value={value}
        disabled={disabled}
        onChange={handleInputFieldChange}
        onBlur={onBlur}
        id={id}
        className="resize-none"
        {...props}
      />
      {errorMessage && <InputError message={errorMessage} />}
    </div>
  );
};

export default TextAreaField;
