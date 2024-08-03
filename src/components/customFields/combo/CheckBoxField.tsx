import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxProps } from "@radix-ui/react-checkbox";
import { FC } from "react";
import InputLabel from "../FieldLabel";
import { FormIconProps } from "../type";

interface CheckBoxFieldProps extends CheckboxProps {
  label?: string | { text: string; icon?: FormIconProps; className?: string };
  isRequired?: boolean;
}
const CheckBoxField: FC<CheckBoxFieldProps> = ({
  onCheckedChange,
  value,
  id,
  name,
  isRequired,
  label,
  ...props
}) => {
  return (
    <div className="flex items-center  gap-4">
      <Checkbox
        id={id}
        onCheckedChange={onCheckedChange}
        value={value}
        name={name}
        {...props}
      />
      {label && (
        <InputLabel id={id} required={isRequired || false} label={label} />
      )}
    </div>
  );
};

export default CheckBoxField;
