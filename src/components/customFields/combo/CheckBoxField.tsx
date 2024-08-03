import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxProps } from "@radix-ui/react-checkbox";
import { FC } from "react";
import InputLabel from "../FieldLabel";
import { FormIconProps, HandlerProps } from "../type";

interface CheckBoxFieldProps extends CheckboxProps {
  label?: string | { text: string; icon?: FormIconProps; className?: string };
  isRequired?: boolean;
  value?: any;
  handleFieldChange?: (data: HandlerProps) => void;
  fieldKey?: string;
}
const CheckBoxField: FC<CheckBoxFieldProps> = ({
  value,
  id,
  name,
  isRequired,
  label,
  handleFieldChange,
  fieldKey,
  ...props
}) => {
  const handleOnChange = (e: any) => {
    if (handleFieldChange && fieldKey) {
      handleFieldChange({ key: fieldKey, value: e });
    }
  };
  return (
    <div className="flex items-center  gap-4">
      <Checkbox
        id={fieldKey}
        value={value}
        name={name}
        {...props}
        onCheckedChange={handleOnChange}
        defaultValue={value}
        defaultChecked={!!value}
      />
      {label && <InputLabel id={id || fieldKey} required={isRequired || false} label={label} />}
    </div>
  );
};

export default CheckBoxField;
