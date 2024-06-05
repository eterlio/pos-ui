import { useState } from "react";

export const useError = <T>() => {
  const [errors, setError] = useState<Partial<{ [key in keyof T]: string }>>({});

  const resetError = () => {
    setError({});
  };
  const addErrors = (errors: Partial<{ [key in keyof T]: any }>) => {
    setError(errors);
  };
  return {
    resetError,
    errors,
    addErrors
  };
};
