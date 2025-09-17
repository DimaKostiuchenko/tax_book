import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BadgePill } from './badge-pill';
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
      <Card ref={ref} className="lg:col-span-1" {...props}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">⏳ Найближча подія</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm text-muted-foreground">{event.title}</div>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-semibold">Дедлайн: {event.due}</div>
            <BadgePill tone={getStatusTone(event.status)}>
              {event.status}
            </BadgePill>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              onClick={onMarkAsPaid}
              aria-label={`Mark ${event.title} as paid`}
            >
              <CheckCircle2 className="h-4 w-4 mr-1" aria-hidden="true" />
              Відзначити як сплачено
            </Button>
            <Button 
              variant="outline" 
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
