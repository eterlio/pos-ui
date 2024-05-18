import { ChangeEvent, FC } from "react";
import Select from "react-tailwindcss-select";
import { FormIconProps } from "../type";
import InputLabel from "../FieldLabel";

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
  onChange?: (data: { key: string; value: any }) => void;
  label?: string | { text: string; icon?: FormIconProps; className?: string };
  isRequired?: boolean;
  id?: string;
  key: string;
  searchFieldChanged?: (selectValue: any) => void;
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
  key
}) => {
  const constructOption = () => {
    if (!isMulti) {
      return (
        options.find((option) => option.value === selectValue) || {
          value: "",
          label: ""
        }
      );
    }
    return options.filter((option) => {
      return selectValue.includes(option.value) || [{ value: "", label: "" }];
    });
  };
  const handleItemChange = (option: Option | Option[] | null) => {
    if (option) {
      if (!isMulti) {
        if (option && !Array.isArray(option)) {
          const value = option.value;
          if (onChange) {
            onChange({ value, key });
          }
        }
        if (option && Array.isArray(option)) {
          const values = option.map((opt) => opt.value);
          if (onChange) {
            onChange({ value: values, key });
          }
        }
      }
    }
  };
  const handleSelectInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (searchFieldChanged) {
      searchFieldChanged(event.target.value);
    }
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
                isSelected ? `text-white bg-blue-500` : `text-gray-500 hover:bg-gray-100 hover:text-gray-500`
              }`
          }}
        />
      </div>
    </div>
  );
};

export default SelectField;
