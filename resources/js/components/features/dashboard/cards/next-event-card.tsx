import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BadgePill } from '../components/badge-pill';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { type TaxEvent } from '@/types/dashboard';

export interface NextEventCardProps {
  event: TaxEvent;
  onMarkAsPaid?: () => void;
  onViewCalendar?: () => void;
}

const NextEventCard = React.forwardRef<HTMLDivElement, NextEventCardProps>(
  ({ event, onMarkAsPaid, onViewCalendar, ...props }, ref) => {
    const getStatusTone = (status: TaxEvent['status']) => {
      switch (status) {
        case 'Очікує':
          return 'warn' as const;
        case 'Виконано':
          return 'success' as const;
        case 'Прострочено':
          return 'danger' as const;
        default:
          return 'default' as const;
      }
    };

    return (
      <Card ref={ref} className="bg-white rounded-none border-0 shadow-none lg:col-span-1" {...props}>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold text-gray-900">⏳ Найближча подія</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-gray-400">{event.title}</div>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-semibold text-gray-900">Дедлайн: {event.due}</div>
            <BadgePill tone={getStatusTone(event.status)}>
              {event.status}
            </BadgePill>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              className="bg-[#344CB7] text-white rounded-full px-6 py-2"
              onClick={onMarkAsPaid}
              aria-label={`Mark ${event.title} as paid`}
            >
              <CheckCircle2 className="h-4 w-4 mr-1" aria-hidden="true" />
              Відзначити як сплачено
            </Button>
            <Button 
              className="border border-gray-300 text-gray-700 rounded-full px-6 py-2"
              onClick={onViewCalendar}
              aria-label="View calendar"
            >
              <Calendar className="h-4 w-4 mr-1" aria-hidden="true" />
              Календар
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
);

NextEventCard.displayName = 'NextEventCard';

export { NextEventCard };
