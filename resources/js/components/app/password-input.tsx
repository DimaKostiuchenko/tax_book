import { ChangeEvent } from 'react';
import { Input } from './input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import IconInfo from '@/components/icons/icon-info';
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
      <div className="mb-4 flex items-center gap-2">
        {tooltip && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" className="text-gray-900 hover:text-gray-600">
                <IconInfo size="md" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        )}
        <Label htmlFor={id} className="text-lg font-semibold text-gray-900">
          {label}
        </Label>
      </div>
      <div className="relative">
        <Input
          label=""
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          error={error}
          className="pr-12"
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
    </div>
  );
}

