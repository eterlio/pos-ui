import { FC } from "react";
import InputField from "../input/InputField";
import SelectField from "../Select/Select";
import { HandlerProps } from "../type";


interface AddressBoxProps {
  values: Record<string, any>;
  fieldKey: string;
  onChange: (data: { key: string; value: any }) => void;
}
const AddressBox: FC<AddressBoxProps> = ({ values, fieldKey, onChange }) => {
  const handleFormInputChange = ({ key, value }: HandlerProps) => {
    onChange({ key, value });
  };
  const handleSelectFieldChange = (data: HandlerProps) => {
    onChange(data);
  };
  const formValues: Record<string, any> = {};
  for (const key in values) {
    formValues[`${fieldKey}.${key}`] = values[key];
  }
  
  const getValue = (fieldName: string) => {
    return formValues[fieldName];
  };
  return (
    <div className="mt-10">
      <h1 className="text-xl">Address Details</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 my-4 gap-x-5 gap-y-2">
        <InputField
          placeholder="P.O Box"
          name={`${fieldKey}.poBox`}
          handleInputChange={handleFormInputChange}
          label="P.O box"
          value={getValue("poBox")}
        />
        <InputField
          placeholder="GPS Address"
          name={`${fieldKey}.gpsAddress`}
          label="GPS Address"
          value={getValue("gpsAddress")}
          handleInputChange={handleFormInputChange}
        />
        <SelectField
        fieldKey="country"
          options={[
            { label: "Ghana", value: "GH" },
            { label: "Nigeria", value: "NG" },
          ]}
          label="Country"
          selectValue={getValue("country")}
          isSearchable
          placeholder="Select country"
          closeOnSelect
          onChange={(selectedValue: any) =>
            handleSelectFieldChange({
              key: `${fieldKey}.country`,
              value: selectedValue,
            })
          }
        />
        <InputField
          placeholder="City"
          name={`${fieldKey}.city`}
          handleInputChange={handleFormInputChange}
          label="City"
          value={getValue("city")}
        />
        <InputField
          placeholder="State"
          name={`${fieldKey}.state`}
          handleInputChange={handleFormInputChange}
          label="State"
          value={getValue("state")}
        />
      </div>
    </div>
  );
};
export default AddressBox;
