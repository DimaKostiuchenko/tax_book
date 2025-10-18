import { ChangeEvent } from 'react';
import { Input } from './input';
import { LabelWithTooltip } from './label-with-tooltip';

interface AppInputProps {
  label: string;
  tooltip?: string;
  description?: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  type?: string;
  maxLength?: number;
  className?: string;
}

export function AppInput({
  label,
  tooltip,
  description,
  value,
  onChange,
  error,
  id,
  required = false,
  disabled = false,
  placeholder,
  type = 'text',
  maxLength,
  className
}: AppInputProps) {
  return (
    <div className={`space-y-4 ${className || ''}`}>
      <LabelWithTooltip
        htmlFor={id || ''}
        label={label}
        tooltip={tooltip || ''}
      />
      <div className="relative">
        <Input
          label=""
          type={type}
          value={value}
          onChange={onChange || (() => {})}
          error=""
          className={error ? "border-red-100 focus:border-red-200" : ""}
          id={id}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          maxLength={maxLength}
        />
      </div>
      {error && <p className="text-red-600 font-medium text-sm">{error}</p>}
    </div>
  );
}
