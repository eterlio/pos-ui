import { ChangeEvent, FC } from "react";
import Select from "react-tailwindcss-select";
import { FormIconProps, HandlerProps } from "../type";
import InputLabel from "../FieldLabel";
import InputError from "../input/InputError";

export interface Option {
  value: string;
  label: string;
  disabled?: boolean;
  isSelected?: boolean;
}
interface SelectProp {
  isMulti?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  isLoading?: boolean;
  options: { label: string; value: any }[];
  closeOnSelect?: boolean;
  selectValue?: any | any[];
  isDisabled?: boolean;
  placeholder?: string;
  onChange?: (data: HandlerProps) => void;
  label?: string | { text: string; icon?: FormIconProps; className?: string };
  isRequired?: boolean;
  id?: string;
  fieldKey: string;
  searchFieldChanged?: (selectValue: any) => void;
  errorMessage?: string;
}
const SelectField: FC<SelectProp> = ({
  isClearable,
  isMulti,
  isSearchable,
  isLoading,
  options,
  selectValue,
  isDisabled,
  placeholder,
  onChange,
  label,
  isRequired,
  id,
  searchFieldChanged,
  fieldKey,
  errorMessage
}) => {
  const constructOption = () => {
    if (isMulti) {
      return options.filter((option) => selectValue?.includes(option.value));
    } else {
      return options.find((option) => option.value === selectValue) || null;
    }
  };

  const handleItemChange = (option: Option | Option[] | null) => {
    if (Array.isArray(option)) {
      const values = option.map((opt) => opt.value);
      onChange?.({ value: values, key: fieldKey });
    } else if (option) {
      onChange?.({ value: option.value, key: fieldKey });
    } else {
      onChange?.({ value: isMulti ? [] : "", key: fieldKey });
    }
  };

  const handleSelectInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    searchFieldChanged?.(event.target.value);
  };

  return (
    <div>
      {label && (
        <div className="my-1">
          <InputLabel id={id} required={isRequired || false} label={label} />
        </div>
      )}
      <div className="select_field-container">
        <Select
          value={constructOption()}
          options={options}
          onChange={handleItemChange}
          primaryColor={"white"}
          isMultiple={isMulti}
          isSearchable={isSearchable}
          isDisabled={isDisabled}
          placeholder={placeholder}
          loading={isLoading}
          onSearchInputChange={handleSelectInputChange}
          isClearable={isClearable}
          classNames={{
            listItem: ({ isSelected }: any) =>
              `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                isSelected ? `text-gray-600 bg-gray-50` : `text-gray-500 hover:bg-gray-50 hover:text-gray-500`
              }`
          }}
          noOptionsMessage="No data found"
          
        />
        {errorMessage && <InputError message={errorMessage} />}
      </div>
    </div>
  );
};

export default SelectField;
