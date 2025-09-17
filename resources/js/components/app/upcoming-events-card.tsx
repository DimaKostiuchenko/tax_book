import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { type UpcomingEvent } from '@/types/dashboard';

export interface UpcomingEventsCardProps {
  events: UpcomingEvent[];
  onViewDetails?: (event: UpcomingEvent) => void;
  onViewAll?: () => void;
}

const UpcomingEventsCard = React.forwardRef<HTMLDivElement, UpcomingEventsCardProps>(
  ({ events, onViewDetails, onViewAll, ...props }, ref) => {
    return (
      <Card ref={ref} className="lg:col-span-2" {...props}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">🔔 Наступні події</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {events.map((event) => (
              <div 
                key={`${event.title}-${event.date}`} 
                className="flex items-center justify-between border p-3"
                role="listitem"
              >
                <div>
                  <div className="text-sm text-muted-foreground">{event.title}</div>
                  <div className="text-lg font-semibold">{event.date}</div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onViewDetails?.(event)}
                  aria-label={`View details for ${event.title}`}
                >
                  Деталі
                </Button>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <Button 
              variant="ghost" 
              onClick={onViewAll}
              aria-label="View all upcoming events"
            >
              Переглянути всі
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
);

UpcomingEventsCard.displayName = 'UpcomingEventsCard';

export { UpcomingEventsCard };
