import { Button } from '@/components/ui/button';
import { FORM_STYLES } from '@/lib/constants/theme';

interface SubmitButtonProps {
  processing: boolean;
  children: React.ReactNode;
  className?: string;
}

export function SubmitButton({ processing, children, className = '' }: SubmitButtonProps) {
  return (
    <div className="flex justify-end pt-6">
      <Button 
        type="submit" 
        disabled={processing}
        className={`${FORM_STYLES.submitButton} ${className}`}
      >
        {children}
      </Button>
    </div>
  );
}

