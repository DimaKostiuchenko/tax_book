import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

/**
 * Custom hook to manage password visibility state
 * Returns visibility state, toggle function, input type, and icon component
 */
export function usePasswordVisibility() {
  const [visible, setVisible] = useState(false);
  
  const toggle = () => setVisible(!visible);
  const type = visible ? 'text' : 'password';
  const Icon = visible ? EyeOff : Eye;
  
  return { 
    visible, 
    toggle, 
    type, 
    Icon 
  };
}

