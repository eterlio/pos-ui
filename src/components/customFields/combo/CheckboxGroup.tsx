import { FC } from "react";
import { OptionsProps } from "@/interfaces";
import { Checkbox } from "@/components/ui/checkbox";
import InputLabel from "../FieldLabel";
import InputError from "../input/InputError";
import { FormIconProps, HandlerProps } from "../type";

interface CheckboxGroupFieldProps {
  isRequired?: boolean;
  id?: string;
  description?: string;
  fieldKey: string;
  handleFieldChange: (data: HandlerProps) => void;
  value?: string[];
  options: OptionsProps[];
  errorMessage?: string;
  disabled?: boolean;
  label?: string | { text: string; icon?: FormIconProps; className?: string };
}

const CheckboxGroupField: FC<CheckboxGroupFieldProps> = ({
  value = [],
  isRequired,
  description,
  handleFieldChange,
  fieldKey,
  options,
  id,
  errorMessage,
  disabled,
  label
}) => {
  const handleOnChange = (checkedValue: string) => {
    const newValue = value.includes(checkedValue) ? value.filter((v) => v !== checkedValue) : [...value, checkedValue];
    handleFieldChange({ key: fieldKey, value: newValue });
  };

  return (
    <div>
      <InputLabel id={id} required={isRequired || false} label={label} />
      <div className="ms-2 text-sm">
        <p id="helper-checkbox-text" className="text-xs font-normal text-gray-500 dark:text-gray-300">
          {description}
        </p>
      </div>
      {options &&
        options.length > 0 &&
        options.map((option, index) => {
          return (
            <div key={index} className="flex items-center gap-2">
              <Checkbox
                id={option.value}
                checked={value.includes(option.value)}
                onCheckedChange={() => handleOnChange(option.value)}
                disabled={disabled}
              />
              <p>{option.label}</p>
            </div>
          );
        })}
      {errorMessage && <InputError message={errorMessage} />}
    </div>
  );
};

export default CheckboxGroupField;
