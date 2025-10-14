/**
 * Theme constants for consistent styling across the application
 * Single source of truth for colors, common styles, and UI patterns
 */

export const COLORS = {
  primary: '#344CB7',
  success: 'green',
  error: 'red',
  gray: {
    50: 'gray-50',
    100: 'gray-100',
    200: 'gray-200',
    300: 'gray-300',
    400: 'gray-400',
    500: 'gray-500',
    600: 'gray-600',
    700: 'gray-700',
    800: 'gray-800',
    900: 'gray-900',
  },
  border: {
    default: '#e7e7e7',
    light: '#ededed',
  },
} as const;

export const FORM_STYLES = {
  radio: 'h-4 w-4 border-gray-300 text-[#344CB7] focus:ring-[#344CB7]',
  submitButton: 'bg-[#344CB7] text-white rounded-lg px-6 py-2 h-10 font-medium',
  input: 'h-12 border border-[#e7e7e7] bg-[#ededed] rounded-sm shadow-none transition-colors',
  inputFocus: 'focus:border-gray-400 focus:shadow-none',
  inputError: 'border-red-300 focus:border-red-400 focus:shadow-none',
  label: 'text-base font-medium text-gray-700',
  labelSemibold: 'text-base font-semibold text-gray-900',
} as const;

export const SPACING = {
  section: 'space-y-8',
  field: 'space-y-4',
  button: 'pt-6',
} as const;

