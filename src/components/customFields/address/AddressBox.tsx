import { FC } from "react";
import InputField from "../input/InputField";
import SelectField from "../Select/SelectField";
import { HandlerProps } from "../type";
import { AddressProps } from "@/interfaces";
import { get } from "lodash";
import { address } from "@/defaults";
import CheckBoxField from "../combo/CheckBoxField";

interface AddressBoxProps {
  values?: AddressProps;
  fieldKey: string;
  onChange: (data: { key: string; value: any }) => void;
  errors?: { [key in `address.${keyof AddressProps}`]: string } | null;
  disabled?: boolean;
}
const AddressBox: FC<AddressBoxProps> = ({ values, fieldKey, onChange, errors, disabled }) => {
  const handleFormInputChange = ({ key, value }: HandlerProps) => {
    let fieldValues = {
      ...values
    };
    if (key === "isGpsAddress") {
      fieldValues = {
        ...address,
        [key]: value
      };
    } else {
      fieldValues = {
        ...values,
        [key]: value
      };
    }

    onChange({ key: fieldKey, value: fieldValues });
  };

  const getValue = (fieldName: string) => {
    return (values as Record<string, any>)?.[fieldName];
  };
  return (
    <div className="mt-10">
      <h1 className="text-xl">Address Details</h1>
      <div className="mt-5">
        <CheckBoxField
          fieldKey="isGpsAddress"
          value={getValue("isGpsAddress")}
          label={"Is address GPS address?"}
          handleFieldChange={handleFormInputChange}
          disabled={disabled}
        />
      </div>
      {!values?.isGpsAddress && (
        <>
          <div className="grid md:grid-cols-2 mt-4 gap-x-5 gap-y-2">
            <InputField
              placeholder="P.O Box"
              fieldKey={`poBox`}
              handleInputChange={handleFormInputChange}
              label="P.O box"
              value={getValue("poBox")}
              errorMessage={get(errors, `address.poBox`)}
              isRequired
              disabled={disabled}
            />
            {/* <InputField
              placeholder="GPS Address"
              fieldKey={`gpsAddress`}
              label="GPS Address"
              value={getValue("gpsAddress")}
              handleInputChange={handleFormInputChange}
              errorMessage={get(errors, `address.gpsAddress`)}
              disabled={disabled}
            /> */}
            <SelectField
              fieldKey="country"
              options={[{ label: "Ghana", value: "GH" }]}
              label="Country"
              selectValue={getValue("country")}
              isSearchable
              placeholder="Select country"
              closeOnSelect
              onChange={handleFormInputChange}
              errorMessage={get(errors, `address.country`)}
              isRequired
              isDisabled={disabled}
            />
          </div>
          <div className="grid gap-x-5 gap-y-2 md:grid-cols-2">
            <InputField
              placeholder="City"
              fieldKey={`city`}
              handleInputChange={handleFormInputChange}
              label="City"
              value={getValue("city")}
              errorMessage={get(errors, `address.city`)}
              isRequired
              disabled={disabled}
            />
            <InputField
              placeholder="State"
              fieldKey={`state`}
              handleInputChange={handleFormInputChange}
              label="State"
              value={getValue("state")}
              errorMessage={get(errors, `address.state`)}
              isRequired
              disabled={disabled}
            />
          </div>
        </>
      )}
      {values?.isGpsAddress && (
        <div>
          <InputField
            placeholder="GPS Address"
            fieldKey={`gpsAddress`}
            handleInputChange={handleFormInputChange}
            label="GPS Address"
            value={getValue("gpsAddress")}
            errorMessage={get(errors, `address.gpsAddress`)}
            isRequired
            disabled={disabled}
          />
        </div>
      )}
    </div>
  );
};
export default AddressBox;
