
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
  onChange?: (selectedValues: any | any[]) => void;
  label?: string | { text: string; icon?: FormIconProps; className?: string };
  isRequired?: boolean;
  id?: string;
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
}) => {
  const constructOption = () => {
    if (!isMulti) {
      return (
        options.find((option) => option.value === selectValue) || {
          value: "",
          label: "",
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
            onChange(value);
          }
        }
        if (option && Array.isArray(option)) {
          const values = option.map((opt) => opt.value);
          if (onChange) {
            onChange(values);
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
        <InputLabel id={id} required={isRequired || false} label={label} />
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
      />
      </div>
    </div>
  );
};

export default SelectField;
