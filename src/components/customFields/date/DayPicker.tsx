import { FC } from "react";
import SelectField from "../Select/Select";
import { FormIconProps, HandlerProps } from "../type";

interface DayPickerProps {
  value?: number;
  handleFieldChange?: (data: HandlerProps) => void;
  label?: string | { text: string; icon?: FormIconProps; className?: string };
  isRequired?: boolean;
  id?: string;
  fieldKey: string;
  errorMessage?: string;
}
const DayPicker: FC<DayPickerProps> = ({ value, handleFieldChange, label, isRequired, id, fieldKey, errorMessage }) => {
  const dayOptions = Array.from({ length: 31 }, (_, index) => ({
    label: String(index + 1),
    value: index + 1
  }));
  return (
    <SelectField
      fieldKey={fieldKey}
      options={dayOptions}
      closeOnSelect
      placeholder="Select day"
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

export default DayPicker;
