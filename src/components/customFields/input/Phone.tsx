import { FormIconProps } from "../type";
import { PhoneProps } from "@/interfaces";
import { FC, FocusEventHandler } from "react";
import { PhoneInput, defaultCountries, parseCountry } from "react-international-phone";
import "react-international-phone/style.css";
import InputLabel from "../FieldLabel";
import InputError from "./InputError";

interface InputPhoneProps {
  value?: PhoneProps;
  fieldKey: string;
  handleInputChange: (data: { key: string; value: PhoneProps }) => void;
  disabled?: boolean;
  label?: string | { text: string; icon?: FormIconProps; className?: string };
  isRequired?: boolean;
  id?: string;
  onblur?: FocusEventHandler<HTMLInputElement>;
  name?: string;
  placeholder?: string;
  errorMessage?: string;
}
const PhoneInputField: FC<InputPhoneProps> = ({
  value,
  fieldKey,
  handleInputChange,
  disabled,
  label,
  isRequired,
  id,
  onblur,
  name,
  placeholder,
  errorMessage
}) => {
  const handleChange = ({}, meta: any) => {
    const fieldValue = meta?.inputValue?.split(" ")[1] || "";

    const stateValue = {
      prefix: meta?.country?.dialCode || "233",
      number: fieldValue || "",
      country: meta?.country?.iso2 || "gh"
    };
    handleInputChange({ key: fieldKey, value: stateValue });
  };
  const countries = defaultCountries.filter((country) => {
    const { iso2 } = parseCountry(country);
    return ["gh"].includes(iso2);
  });
  const processedValue = value ? `+${value.prefix || "233"}${value.number}` : value;
  return (
    <div>
      {label && (
        <div className="my-1">
          <InputLabel id={id} required={isRequired || false} label={label} />
        </div>
      )}
      <PhoneInput
        defaultCountry="gh"
        value={processedValue}
        onChange={handleChange}
        countries={countries}
        inputClassName="!h-10 !w-full !border !border-1 !px-3 !py-2 !border-input"
        disabled={disabled}
        onBlur={onblur}
        inputProps={{ id }}
        name={name}
        placeholder={placeholder}
      />
      {errorMessage && <InputError message={errorMessage} />}
    </div>
  );
};

export default PhoneInputField;
