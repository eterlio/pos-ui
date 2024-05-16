import { useState } from "react";

export const useError = <T>() => {
  const [errors, setError] = useState<T | null>(null);

  const resetError = () => {
    setError(null);
  };
  const addErrors = (errors: T) => {
    setError(errors);
  };
  return {
    resetError,
    errors,
    addErrors
  };
};
