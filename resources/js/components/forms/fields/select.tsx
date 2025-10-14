import React from 'react';
import { cn } from '@/lib/utils';
import { Select as RadixSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from './label';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
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
        {(label || description) && (
          <div className="flex items-center gap-3 mb-4">
            <div>
              {label && (
                <Label htmlFor="select" required={required}>
                  {label}
                </Label>
              )}
              {description && (
                <p className="text-gray-500 mt-1">{description}</p>
              )}
            </div>
          </div>
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
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {options.map((option) => (
              <SelectItem 
                key={option.value} 
                value={option.value} 
                className="py-3"
              >
                {option.label}
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
