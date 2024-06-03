import { FC } from "react";
import InputField from "../input/InputField";
import SelectField from "../Select/Select";
import { HandlerProps } from "../type";
import { AddressProps } from "@/interfaces";

interface AddressBoxProps {
  values: AddressProps;
  fieldKey: string;
  onChange: (data: { key: string; value: any }) => void;
  errors?: { [key in keyof AddressProps]: string };
}
const AddressBox: FC<AddressBoxProps> = ({ values, fieldKey, onChange, errors }) => {
  const handleFormInputChange = ({ key, value }: HandlerProps) => {
    onChange({ key, value });
  };
  const handleSelectFieldChange = (data: HandlerProps) => {
    onChange(data);
  };

  const getValue = (fieldName: string) => {
    return (values as Record<string, any>)[fieldName];
  };
  return (
    <div className="mt-10">
      <h1 className="text-xl">Address Details</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 mt-4 gap-x-5 gap-y-2">
        <InputField
          placeholder="P.O Box"
          fieldKey={`${fieldKey}.poBox`}
          handleInputChange={handleFormInputChange}
          label="P.O box"
          value={getValue("poBox")}
          errorMessage={errors?.poBox}
          isRequired
        />
        <InputField
          placeholder="GPS Address"
          fieldKey={`${fieldKey}.gpsAddress`}
          label="GPS Address"
          value={getValue("gpsAddress")}
          handleInputChange={handleFormInputChange}
          errorMessage={errors?.gpsAddress}
          isRequired
        />
        <SelectField
          fieldKey="country"
          options={[
            { label: "Ghana", value: "GH" }
            // { label: "Nigeria", value: "NG" }
          ]}
          label="Country"
          selectValue={getValue("country")}
          isSearchable
          placeholder="Select country"
          closeOnSelect
          onChange={(selectedValue: any) =>
            handleSelectFieldChange({
              key: `${fieldKey}.country`,
              value: selectedValue
            })
          }
          errorMessage={errors?.country}
          isRequired
        />
        <InputField
          placeholder="City"
          fieldKey={`${fieldKey}.city`}
          handleInputChange={handleFormInputChange}
          label="City"
          value={getValue("city")}
          errorMessage={errors?.city}
          isRequired
        />
        <InputField
          placeholder="State"
          fieldKey={`${fieldKey}.state`}
          handleInputChange={handleFormInputChange}
          label="State"
          value={getValue("state")}
          errorMessage={errors?.state}
          isRequired
        />
      </div>
    </div>
  );
};
export default AddressBox;
