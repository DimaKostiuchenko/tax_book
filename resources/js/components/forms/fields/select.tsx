import React from 'react';
import { cn } from '@/lib/utils';
import { Select as RadixSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LabelWithTooltip } from './label-with-tooltip';
import { Sun, Moon, Monitor } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
  icon?: string;
}

// Helper function to get icon component
const getIconComponent = (iconName?: string) => {
  switch (iconName) {
    case 'sun':
      return <Sun className="w-4 h-4" />;
    case 'moon':
      return <Moon className="w-4 h-4" />;
    case 'monitor':
      return <Monitor className="w-4 h-4" />;
    default:
      return null;
  }
};

interface SelectProps {
  label?: string;
  tooltip?: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
  options: readonly SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  error?: string;
  className?: string;
  disabled?: boolean;
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({ 
    label, 
    tooltip,
    placeholder, 
    required = false, 
    description, 
    options, 
    value, 
    onValueChange, 
    error,
    className,
    disabled = false,
    ...props 
  }, ref) => {
    return (
      <div className={cn("space-y-3", className)}>
        {label && (
          <LabelWithTooltip
            htmlFor="select"
            label={label}
            tooltip={tooltip || ''}
          />
        )}
        {description && (
          <p className="text-gray-500 mt-1">{description}</p>
        )}
        
        <RadixSelect
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
        >
          <SelectTrigger 
            ref={ref}
            className={cn(
      
              "h-12 border border-gray-300 text-gray-700 bg-white py-5 px-3 rounded-sm shadow-none focus:border-gray-400 focus:shadow-none transition-colors", 
              error && "border-red-300 focus:border-red-400"
            )}
          >
            <SelectValue placeholder={placeholder}>
              {value && (() => {
                const selectedOption = options.find(option => option.value === value);
                return selectedOption ? (
                  <div className="flex items-center gap-2">
                    {getIconComponent(selectedOption.icon)}
                    <span>{selectedOption.label}</span>
                  </div>
                ) : null;
              })()}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {options.map((option) => (
              <SelectItem 
                key={option.value} 
                value={option.value} 
                className="py-3"
              >
                <div className="flex items-center gap-2">
                  {getIconComponent(option.icon)}
                  <span>{option.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </RadixSelect>
        
        {error && <p className="text-red-600 font-medium">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
export type { SelectOption };
