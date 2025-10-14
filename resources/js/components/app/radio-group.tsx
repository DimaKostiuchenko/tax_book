import { Label } from '@/components/ui/label';
import { FORM_STYLES } from '@/lib/constants/theme';

interface RadioGroupProps {
  label: string;
  name: string;
  options: ReadonlyArray<{ value: string | boolean; label: string }>;
  value: string | boolean;
  onChange: (value: any) => void;
  orientation?: 'horizontal' | 'vertical';
}

export function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
  orientation = 'vertical'
}: RadioGroupProps) {
  const containerClass = orientation === 'horizontal' 
    ? 'grid grid-cols-2 gap-4' 
    : 'flex flex-col gap-4';

  return (
    <div className="grid gap-2">
      <Label className="text-base font-semibold text-gray-900">{label}</Label>
      <div className={containerClass}>
        {options.map((option, index) => {
          const optionId = `${name}_${index}`;
          const isChecked = value === option.value;
          
          return (
            <div key={index} className="flex items-center space-x-3">
              <input
                type="radio"
                id={optionId}
                name={name}
                checked={isChecked}
                onChange={() => onChange(option.value)}
                className={FORM_STYLES.radio}
              />
              <Label htmlFor={optionId} className="text-base text-gray-900 cursor-pointer">
                {option.label}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

