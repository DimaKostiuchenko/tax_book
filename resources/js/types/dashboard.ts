import React from 'react';

export interface User {
  name: string;
  profile: UserProfile;
}

export interface UserProfile {
  type: string;
  group: string;
  system: string;
  edrpou: string;
  vat: boolean;
  period: string;
  completeness: number;
  updatedAt: string;
}

export interface TaxEvent {
  title: string;
  due: string;
  status: 'Очікує' | 'Виконано' | 'Прострочено';
}

export interface UpcomingEvent {
  id: string;
  type: 'ESV' | 'TAX' | 'REPORT';
  quarter?: string;
  title: string;
  period: { start: string; end: string };
  deadline: string;
  window: { start: string; end: string };
  status: 'Очікується' | 'Завершено' | 'Прострочено';
  amount?: {
    currency: string;
    value: number;
    description: string;
  };
  details?: {
    description: string;
    legalReference?: string;
  };
  actions?: {
    submitUrl?: string;
    payOnlineUrl?: string;
    instructionUrl?: string;
  };
}

export interface TaxLimits {
  label: string;
  limit: number;
  used: number;
}

export interface Integration {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  status: 'active' | 'inactive';
}

export interface StatItem {
  name: string;
  value: number;
}

export interface NewsItem {
  title: string;
  date?: string;
  excerpt?: string;
}

export interface QuickAction {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  onClick?: () => void;
}

export type BadgeTone = 'default' | 'success' | 'warn' | 'danger';

export interface DashboardData {
  user: User;
  events: {
    next: TaxEvent;
    upcoming: UpcomingEvent[];
  };
  stats: StatItem[];
  taxLimits: TaxLimits;
  integrations: Integration[];
  news: NewsItem[];
  quickActions: QuickAction[];
}
