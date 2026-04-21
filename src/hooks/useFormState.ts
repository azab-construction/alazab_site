import { useCallback, useState } from 'react';

interface FormState {
  [key: string]: string | number | boolean;
}

export const useFormState = <T extends FormState>(initialState: T) => {
  const [formState, setFormState] = useState<T>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const updateField = useCallback((field: keyof T, value: T[keyof T]) => {
    setFormState(prev => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  }, [errors]);

  const setFieldError = useCallback((field: keyof T, error: string) => {
    setErrors(prev => ({
      ...prev,
      [field]: error,
    }));
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const reset = useCallback(() => {
    setFormState(initialState);
    setErrors({});
  }, [initialState]);

  return {
    formState,
    errors,
    updateField,
    setFieldError,
    clearErrors,
    reset,
  };
};
