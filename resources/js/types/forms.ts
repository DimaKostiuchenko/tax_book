/**
 * Shared types for forms across the application
 * Ensures type safety and consistency
 */

export type UserType = 'fop' | 'legal_entity';
export type TaxRegime = 'single_tax_1' | 'single_tax_2' | 'single_tax_3' | 'general_system';
export type ReportingPeriod = 'monthly' | 'quarterly' | 'yearly';
export type Language = 'uk' | 'en';
export type Theme = 'light' | 'dark' | 'system';

export interface FormOption<T = string | boolean | number> {
  value: T;
  label: string;
}

export interface User {
  name: string;
  email: string;
  user_type?: UserType;
  tin?: string;
  edrpou?: string;
  tax_regime?: TaxRegime;
  vat_payer?: boolean;
  vat_number?: string;
  reporting_period?: ReportingPeriod;
  phone?: string;
  telegram_connected?: boolean;
  telegram_chat_id?: string;
  viber_phone?: string;
  reminder_lead_time?: number[];
  language?: Language;
  theme?: Theme;
  timezone?: string;
}

