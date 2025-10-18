/**
 * Form options constants for dropdowns, radio groups, and select inputs
 * Centralized for consistency and easy updates
 */

export const USER_TYPE_OPTIONS = [
  { value: 'fop', label: 'ФОП (Фізична особа-підприємець)' },
  { value: 'legal_entity', label: 'Юридична особа' }
] as const;

export const TAX_REGIME_OPTIONS = [
  { value: 'single_tax_1', label: 'Єдиний податок 1 група' },
  { value: 'single_tax_2', label: 'Єдиний податок 2 група' },
  { value: 'single_tax_3', label: 'Єдиний податок 3 група' },
  { value: 'general_system', label: 'Загальна система' }
] as const;

export const REPORTING_PERIOD_OPTIONS = [
  { value: 'monthly', label: 'Щомісячно' },
  { value: 'quarterly', label: 'Щоквартально' },
  { value: 'yearly', label: 'Щорічно' }
] as const;

export const LANGUAGE_OPTIONS = [
  { value: 'uk', label: '🇺🇦 Українська' },
  { value: 'en', label: '🇬🇧 English' }
] as const;

export const THEME_OPTIONS = [
  { value: 'light', label: 'Світла', icon: 'sun' },
  { value: 'dark', label: 'Темна', icon: 'moon' },
  { value: 'system', label: 'Системна', icon: 'monitor' }
] as const;

export const TIMEZONE_OPTIONS = [
  { value: 'Europe/Kyiv', label: '🇺🇦 Київ (UTC+2/+3)' },
  { value: 'Europe/London', label: '🇬🇧 Лондон (UTC+0/+1)' },
  { value: 'Europe/Paris', label: '🇫🇷 Париж (UTC+1/+2)' },
  { value: 'America/New_York', label: '🇺🇸 Нью-Йорк (UTC-5/-4)' },
  { value: 'America/Los_Angeles', label: '🇺🇸 Лос-Анджелес (UTC-8/-7)' },
  { value: 'Asia/Tokyo', label: '🇯🇵 Токіо (UTC+9)' },
  { value: 'Australia/Sydney', label: '🇦🇺 Сідней (UTC+10/+11)' }
] as const;

export const YES_NO_OPTIONS = [
  { value: true, label: 'Так' },
  { value: false, label: 'Ні' }
] as const;

export const REMINDER_DAYS_OPTIONS = [
  { value: 7, label: '7 днів перед подією' },
  { value: 3, label: '3 дні перед подією' },
  { value: 1, label: '1 день перед подією' }
] as const;

export const PASSWORD_REQUIREMENTS = [
  'Мінімум 8 символів',
  'Рекомендується використовувати літери, цифри та спеціальні символи',
  'Уникайте використання особистої інформації'
] as const;

