import { ChangeEvent } from 'react';
import { Input } from './input';
import { LabelWithTooltip } from './label-with-tooltip';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  label: string;
  tooltip?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  id?: string;
  showVisibilityToggle?: boolean;
  visible?: boolean;
  onToggleVisibility?: () => void;
}

export function PasswordInput({
  label,
  tooltip,
  value,
  onChange,
  error,
  id,
  showVisibilityToggle = true,
  visible = false,
  onToggleVisibility
}: PasswordInputProps) {
  return (
    <div className="space-y-4">
      <LabelWithTooltip
        htmlFor={id || ''}
        label={label}
        tooltip={tooltip || ''}
      />
      <div className="relative">
        <Input
          label=""
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          error=""
          className={error ? "pr-12 border-red-100 focus:border-red-200" : "pr-12"}
          id={id}
        />
        {showVisibilityToggle && onToggleVisibility && (
          <button
            type="button"
            onClick={onToggleVisibility}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {visible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </div>
      {error && <p className="text-red-600 font-medium text-sm">{error}</p>}
    </div>
  );
}

