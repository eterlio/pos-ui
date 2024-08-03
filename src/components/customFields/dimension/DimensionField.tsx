import { DimensionProps } from "@/interfaces/products";
import { FC } from "react";
import NumberField from "../input/NumberField";
import { HandlerProps } from "../type";

interface DimensionFieldProps {
  values: DimensionProps;
  fieldKey: string;
  onChange: (data: { key: string; value: any }) => void;
  errors?: { [key in `address.${keyof DimensionProps}`]: string } | null;
  disabled?: boolean;
}
const DimensionField: FC<DimensionFieldProps> = ({ fieldKey, onChange, values, disabled }) => {
  const handleFormInputChange = ({ key, value }: HandlerProps) => {
    const fieldValues = {
      ...values,
      [key]: value
    };
    onChange({ key: fieldKey, value: fieldValues });
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <NumberField
        fieldKey="length"
        handleInputChange={handleFormInputChange}
        label="Length"
        value={values?.length}
        min={0}
        disabled={disabled}
      />
      <NumberField
        fieldKey="width"
        handleInputChange={handleFormInputChange}
        label="Width"
        value={values?.width}
        min={0}
        disabled={disabled}
      />
      <NumberField
        fieldKey="height"
        handleInputChange={handleFormInputChange}
        label="Height"
        value={values?.height}
        min={0}
        disabled={disabled}
      />
    </div>
  );
};

export default DimensionField;
