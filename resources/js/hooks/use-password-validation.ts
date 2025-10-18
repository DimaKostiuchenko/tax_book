import { useMemo } from 'react';

export interface PasswordRequirement {
  text: string;
  isValid: boolean;
}

export function usePasswordValidation(password: string) {
  const requirements = useMemo((): PasswordRequirement[] => {
    return [
      {
        text: 'Мінімум 8 символів',
        isValid: password.length >= 8
      },
      {
        text: 'Містить літери та цифри',
        isValid: /^(?=.*[A-Za-z])(?=.*\d)/.test(password)
      },
      {
        text: 'Містить спеціальні символи (!@#$%^&*)',
        isValid: /[!@#$%^&*(),.?":{}|<>]/.test(password)
      }
    ];
  }, [password]);

  const isValid = requirements.every(req => req.isValid);

  return {
    requirements,
    isValid,
    hasRequirements: password.length > 0
  };
}
