import { useState } from "react";

export const useError = <T>() => {
  const [errors, setError] = useState<Partial<T> | null>(null);

  const resetError = () => {
    setError(null);
  };
  const addErrors = (errors: Partial<T>) => {
    setError(errors);
  };
  return {
    resetError,
    errors,
    addErrors
  };
};
