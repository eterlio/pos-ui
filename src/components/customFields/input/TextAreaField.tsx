import { Textarea, TextareaProps } from "@/components/ui/textarea";
import { FormIconProps } from "../type";
import { ChangeEvent, FC } from "react";
import InputLabel from "../FieldLabel";

interface TextAreaFieldProps extends TextareaProps {
  label?: string | { text: string; icon?: FormIconProps; className?: string };
  isRequired?: boolean;
  handleInputChange: (data: { key: string; value: any }) => void;
  name: string;
}
const TextAreaField: FC<TextAreaFieldProps> = ({
  name,
  value,
  onBlur,
  handleInputChange,
  disabled,
  label,
  id,
  isRequired,
  ...props
}) => {
  const handleInputFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { value },
    } = event;

    if (handleInputChange && name) {
      handleInputChange({ key: name, value });
    }
  };
  return (
    <div>
      {label && (
        <InputLabel id={id} required={isRequired || false} label={label} />
      )}
      <Textarea
        name={name}
        value={value}
        disabled={disabled}
        onChange={handleInputFieldChange}
        onBlur={onBlur}
        {...props}
        id={id}
      />
    </div>
  );
};

export default TextAreaField;
