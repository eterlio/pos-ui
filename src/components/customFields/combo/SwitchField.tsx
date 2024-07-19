import { FC } from "react";
import InputLabel from "../FieldLabel";
import { FormIconProps, HandlerProps } from "../type";
import { Switch } from "@/components/ui/switch";

interface SwitchFieldProps {
  label?: string | { text: string; icon?: FormIconProps; className?: string };
  isRequired?: boolean;
  value?: boolean;
  handleFieldChange?: (data: HandlerProps) => void;
  fieldKey?: string;
}

const SwitchField: FC<SwitchFieldProps> = ({ value, isRequired, label, handleFieldChange, fieldKey, ...props }) => {
  const handleOnChange = (newValue: boolean) => {
    if (handleFieldChange && fieldKey) {
      handleFieldChange({ key: fieldKey, value: newValue });
    }
  };

  return (
    <div className="flex items-center gap-x-4">
      <Switch id={fieldKey} checked={value} onCheckedChange={handleOnChange} {...props} />
      {label && <InputLabel id={fieldKey} required={isRequired || false} label={label} />}
    </div>
  );
};

export default SwitchField;
