import { useMemo } from 'react';

/**
 * Custom hook to standardize form alert handling
 * Returns alert configuration based on success/error states
 */
export function useFormAlert(recentlySuccessful: boolean, errors: Record<string, string>) {
  const alerts = useMemo(() => {
    const result: Array<{ type: 'success' | 'error'; message: string }> = [];
    
    if (recentlySuccessful) {
      result.push({
        type: 'success',
        message: 'Зміни успішно збережено'
      });
    }
    
    Object.entries(errors).forEach(([key, message]) => {
      if (message) {
        result.push({
          type: 'error',
          message
        });
      }
    });
    
    return result;
  }, [recentlySuccessful, errors]);
  
  return alerts;
}

