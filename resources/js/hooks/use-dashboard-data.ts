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
        {
          id: "esv-q1",
          type: "ESV" as const,
          quarter: "1",
          title: "Сплата ЄСВ за 1-й квартал",
          period: { start: "2025-01-01", end: "2025-03-31" },
          deadline: new Date().getFullYear() + "-" + String(new Date().getMonth() + 1).padStart(2, '0') + "-20",
          window: { start: "2025-04-01", end: "2025-04-20" },
          status: "Очікується" as const,
          amount: {
            currency: "UAH",
            value: 4686,
            description: "1562 грн × 3 місяці"
          },
          details: {
            description: "Період з 01.01.2025 по 31.03.2025. Сплата єдиного соціального внеску для ФОП 3 групи.",
            legalReference: "Закон України про ЄСВ, ст. 9"
          },
          actions: {
            submitUrl: "https://cabinet.tax.gov.ua/submit",
            payOnlineUrl: "https://cabinet.tax.gov.ua/payment",
            instructionUrl: "https://tax.gov.ua/esv-instruction"
          }
        },
        {
          id: "esv-q2",
          type: "ESV" as const,
          quarter: "2",
          title: "Сплата ЄСВ за 2-й квартал",
          period: { start: "2025-04-01", end: "2025-06-30" },
          deadline: new Date().getFullYear() + "-" + String(new Date().getMonth() + 1).padStart(2, '0') + "-25",
          window: { start: "2025-07-01", end: "2025-07-20" },
          status: "Очікується" as const,
          amount: {
            currency: "UAH",
            value: 4686,
            description: "1562 грн × 3 місяці"
          },
          details: {
            description: "Період з 01.04.2025 по 30.06.2025. Сплата єдиного соціального внеску для ФОП 3 групи.",
            legalReference: "Закон України про ЄСВ, ст. 9"
          },
          actions: {
            submitUrl: "https://cabinet.tax.gov.ua/submit",
            payOnlineUrl: "https://cabinet.tax.gov.ua/payment",
            instructionUrl: "https://tax.gov.ua/esv-instruction"
          }
        },
        {
          id: "tax-report",
          type: "REPORT" as const,
          title: "Подача декларації з податку на доходи",
          period: { start: "2025-01-01", end: "2025-03-31" },
          deadline: "2025-05-02",
          window: { start: "2025-04-01", end: "2025-05-02" },
          status: "Очікується" as const,
          details: {
            description: "Подача декларації за 1-й квартал 2025 року для ФОП 2 групи.",
            legalReference: "Податковий кодекс України, ст. 292"
          }
        }
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
      { title: "Новий закон про ПДВ", description: "Новий закон про ПДВ буде вступити в силу 1 січня 2026 року." },
      { title: "Зміни для ФОП 2 групи", description: "Зміни для ФОП 2 групи будуть вступити в силу 1 січня 2026 року." },
      { title: "Оновлені ставки ЄСВ", description: "Оновлені ставки ЄСВ будуть вступити в силу 1 січня 2026 року." },
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
