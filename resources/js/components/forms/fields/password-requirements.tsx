import { Check, X } from 'lucide-react';
import { usePasswordValidation, type PasswordRequirement } from '@/hooks/use-password-validation';

interface PasswordRequirementsProps {
  password: string;
  className?: string;
}

export function PasswordRequirements({ password, className = '' }: PasswordRequirementsProps) {
  const { requirements, hasRequirements } = usePasswordValidation(password);

  if (!hasRequirements) {
    return null;
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <h4 className="text-lg font-semibold text-gray-900">Вимоги до пароля:</h4>
      <ul className="space-y-2">
        {requirements.map((requirement: PasswordRequirement, index: number) => (
          <li key={index} className="flex items-center gap-3">
            <div className="flex-shrink-0">
              {requirement.isValid ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <X className="w-4 h-4 text-gray-400" />
              )}
            </div>
            <span className={`text-sm ${
              requirement.isValid ? 'text-green-700' : 'text-gray-600'
            }`}>
              {requirement.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
