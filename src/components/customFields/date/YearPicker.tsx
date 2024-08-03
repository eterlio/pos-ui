import { FC } from "react";
import SelectField from "../Select/SelectField";
import { FormIconProps, HandlerProps } from "../type";

interface YearPickerProps {
  value?: number;
  handleFieldChange?: (data: HandlerProps) => void;
  label?: string | { text: string; icon?: FormIconProps; className?: string };
  isRequired?: boolean;
  id?: string;
  fieldKey: string;
  errorMessage?: string;
}

const YearPicker: FC<YearPickerProps> = ({
  value,
  handleFieldChange,
  label,
  isRequired,
  id,
  fieldKey,
  errorMessage
}) => {
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - 2000 + 1 }, (_, index) => ({
    label: String(2000 + index),
    value: 2000 + index
  }));

  return (
    <SelectField
      fieldKey={fieldKey}
      options={yearOptions}
      closeOnSelect
      placeholder="Select year"
      selectValue={value}
      onChange={handleFieldChange}
      isRequired={isRequired}
      label={label}
      isMulti={false}
      id={id}
      errorMessage={errorMessage}
    />
  );
};

export default YearPicker;
