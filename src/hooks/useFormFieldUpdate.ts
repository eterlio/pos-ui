import { useState } from "react";

export const useFormFieldUpdate = <T>(defaultData: T) => {
  const [formValues, setFormValues] = useState<T>(defaultData);

  const updateFormFieldValue = (key: string, value: any) => {
    setFormValues((prev) => {
      return { ...prev, [key]: value };
    });
  };
  return {
    formValues,
    updateFormFieldValue,
    setFormValues
  };
};
