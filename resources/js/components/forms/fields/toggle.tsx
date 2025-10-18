import React from 'react';
import { cn } from '@/lib/utils';
import { LabelWithTooltip } from './label-with-tooltip';

interface ToggleProps {
  label?: string;
  tooltip?: string;
  description?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  ({ 
    label, 
    tooltip,
    description,
    checked = false, 
    onChange,
    disabled = false,
    className,
    id,
    ...props 
  }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.checked);
    };

    return (
      <div className={cn("space-y-3", className)}>
        {label && (
          <LabelWithTooltip
            htmlFor={id || 'toggle'}
            label={label}
            tooltip={tooltip || ''}
          />
        )}
        {description && (
          <p className="text-gray-500 text-sm">{description}</p>
        )}
        
        <label className="inline-flex items-center cursor-pointer">
          <input
            ref={ref}
            type="checkbox"
            id={id || 'toggle'}
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            className="sr-only peer"
            {...props}
          />
          <div className={cn(
            "relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600",
            disabled && "opacity-50 cursor-not-allowed"
          )} />
        </label>
      </div>
    );
  }
);

Toggle.displayName = "Toggle";

export type { ToggleProps };
