import { useState } from "react";
import set from "lodash/set";

export const useFormFieldUpdate = <T>(defaultData: T) => {
  const [formValues, setFormValues] = useState<T>(defaultData);

  const updateFormFieldValue = (key: string, value: any) => {
    setFormValues((prev) => {
      const updatedFormValues = { ...prev };
      set(updatedFormValues as Record<string, any>, key, value);
      return { ...updatedFormValues };
    });
  };
  return {
    formValues,
    updateFormFieldValue,
    setFormValues
  };
};
