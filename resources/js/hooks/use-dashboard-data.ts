import { useMemo } from 'react';
import { Mail, Send, MessageSquare, Calendar, Bell, Settings, User2 } from 'lucide-react';
import { type DashboardData } from '@/types/dashboard';

export function useDashboardData(): DashboardData {
  return useMemo(() => {
    const user = {
      name: "Іван",
      profile: {
        type: "ФОП",
        group: "2 група",
        system: "Спрощена",
        edrpou: "1234567890",
        vat: false,
        period: "Квартал",
        completeness: 80,
        updatedAt: "05.09.2025",
      },
    };

    const events = {
      next: { title: "Єдиний податок", due: "10.09", status: "Очікує" as const },
      upcoming: [
        { date: "15.09", title: "ЄСВ" },
        { date: "20.09", title: "ПДВ" },
        { date: "30.09", title: "Декларація" },
      ],
    };

    const stats = [
      { name: "Виконано", value: 3 },
      { name: "Очікує", value: 2 },
      { name: "Прострочено", value: 1 },
    ];

    const taxLimits = {
      label: "Ліміт для групи 2",
      limit: 8000000,
      used: 6200000,
    };

    const integrations = [
      { key: "email", label: "Email", icon: Mail, status: "active" as const },
      { key: "telegram", label: "Telegram", icon: Send, status: "active" as const },
      { key: "viber", label: "Viber", icon: MessageSquare, status: "inactive" as const },
    ];

    const news = [
      { title: "Новий закон про ПДВ" },
      { title: "Зміни для ФОП 2 групи" },
      { title: "Оновлені ставки ЄСВ" },
    ];

    const quickActions = [
      { label: "Календар", icon: Calendar, href: "/calendar" },
      { label: "Профіль", icon: User2, href: "/profile" },
      { label: "Сповіщення", icon: Bell, href: "/notifications" },
      { label: "Налаштування", icon: Settings, href: "/settings" },
    ];

    return {
      user,
      events,
      stats,
      taxLimits,
      integrations,
      news,
      quickActions,
    };
  }, []);
}
