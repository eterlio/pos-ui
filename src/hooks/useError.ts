import { useState } from "react";

export const useError = <T>() => {
  const [errors, setError] = useState<Partial<{ [key in keyof T]: string }> | null>(null);

  const resetError = () => {
    setError(null);
  };
  const addErrors = (errors: Partial<{ [key in keyof T]: string }>) => {
    setError(errors);
  };
  return {
    resetError,
    errors,
    addErrors
  };
};
