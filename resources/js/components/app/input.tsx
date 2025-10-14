import React from 'react';
import { cn } from '@/lib/utils';
import { Input as RadixInput } from '@/components/ui/input';
import { Label } from './label';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  required?: boolean;
  error?: string;
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    description, 
    required = false, 
    error, 
    containerClassName,
    className,
    id,
    ...props 
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
      <div className={cn("space-y-3", containerClassName)}>
        {(label || description) && (
          <div className="flex items-center gap-3 mb-4">
            <div>
              {label && (
                <Label htmlFor={inputId} required={required}>
                  {label}
                </Label>
              )}
              {description && (
                <p className="text-gray-500 mt-1">{description}</p>
              )}
            </div>
          </div>
        )}
        
        <RadixInput
          ref={ref}
          id={inputId}
          className={cn(
            "h-12 border border-gray-300 text-gray-700 bg-white py-5 px-3 rounded-sm shadow-none transition-colors focus:border-gray-200 focus:shadow-none",
            error && "border-red-100 focus:border-red-200",
            className
          )}
          {...props}
        />
        
        {error && <p className="text-red-600 font-medium">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
