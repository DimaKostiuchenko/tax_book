import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface FormAlertProps {
  type: 'success' | 'error';
  message: string;
}

export function FormAlert({ type, message }: FormAlertProps) {
  if (type === 'success') {
    return (
      <Alert className="border-green-200 bg-green-50 text-green-800 rounded-lg">
        <CheckCircle className="h-5 w-5 text-green-600" />
        <AlertDescription className="font-medium">{message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert variant="destructive" className="rounded-lg">
      <AlertCircle className="h-5 w-5" />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}

