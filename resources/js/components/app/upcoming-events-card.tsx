import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { type UpcomingEvent } from '@/types/dashboard';

// Helper function to get current month events
const getCurrentMonthEvents = (events: UpcomingEvent[]): UpcomingEvent[] => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return events
    .filter(event => {
      const deadlineDate = new Date(event.deadline);
      return deadlineDate.getMonth() === currentMonth &&
             deadlineDate.getFullYear() === currentYear &&
             event.status === 'Очікується';
    })
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 2); // Show only 2 upcoming events
};

export interface UpcomingEventsCardProps {
  events: UpcomingEvent[];
  onViewDetails?: (event: UpcomingEvent) => void;
  onViewAll?: () => void;
}

// Helper functions from event-card.tsx
const getStatusType = (status: string): 'pending' | 'completed' | 'overdue' | 'upcoming' => {
  switch (status) {
    case 'Очікується':
      return 'upcoming'
    case 'Завершено':
      return 'completed'
    case 'Прострочено':
      return 'overdue'
    default:
      return 'pending'
  }
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const formatCurrency = (value: number, currency: string): string => {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: currency === 'UAH' ? 'UAH' : currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

const getStatusColor = (status: string) => {
  const statusType = getStatusType(status)
  switch (statusType) {
    case 'completed':
      return 'bg-green-500 text-white'
    case 'overdue':
      return 'bg-red-500 text-white'
    case 'upcoming':
      return 'bg-[#577BC1] text-white'
    default:
      return 'bg-gray-500 text-white'
  }
}


// Enhanced Event Item Component with improved design
const EventItem = React.memo(({
  event,
  onViewDetails
}: {
  event: UpcomingEvent;
  onViewDetails?: (event: UpcomingEvent) => void;
}) => {
  const statusType = getStatusType(event.status || 'Очікується')
  const isOverdue = statusType === 'overdue'
  const isUpcoming = useMemo(() => statusType === 'upcoming', [statusType])

  const itemClasses = cn(
    "transition-all duration-200 border border-gray-200  flex flex-row hover:bg-gray-50 hover:border-gray-300 ",
    {
      "bg-red-50 border-red-200 hover:bg-red-100": isOverdue,
      "bg-blue-100 border-blue-200 hover:bg-blue-200": isUpcoming,
      "bg-white border-gray-200": !isOverdue && !isUpcoming,
    }
  )

  // Compact tile styling optimized for multiple columns
  const Container = 'div'
  const Header = 'div'
  const Content = 'div'
  const headerClassName = "p-3 pb-2"
  const contentClassName = "flex-1 px-3 space-y-3"

  return (
    <Container className={itemClasses}>
      <Header className={headerClassName}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 pr-2">
            <h3 className="font-semibold text-base text-gray-900 leading-tight">
              {event.title}
            </h3>
          </div>
          {event.status && (
            <Badge className={getStatusColor(event.status)}>
              {event.status}
            </Badge>
          )}
        </div>
      </Header>
      <Content className={contentClassName}>
        {/* Deadline */}
        <div className="flex items-center space-x-2 text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" color="#000000"
               fill="none">
            <circle cx="12" cy="12" r="10" stroke="#141B34" strokeWidth="1.5"/>
            <path d="M12 8V12L14 14" stroke="#141B34" strokeWidth="1.5" strokeLinecap="round"
                  strokeLinejoin="round"/>
          </svg>
          <span className="text-xs">До {formatDate(event.deadline)}</span>
        </div>

        {/* Amount */}
        {event.amount && (
          <div className="bg-gray-50 p-2 rounded">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-700">Сума:</span>
              <span className="font-semibold text-xs text-gray-900">
                {event.amount.value.toLocaleString()} {event.amount.currency}
              </span>
            </div>
            {event.amount.description && (
              <p className="text-xs text-gray-500 mt-1">{event.amount.description}</p>
            )}
          </div>
        )}

        {/* Details */}
        {event.details && (
          <div className="text-gray-900">
            <p className="text-xs line-clamp-2 leading-relaxed">{event.details.description}</p>
          </div>
        )}
      </Content>
      {event.actions && (
        <div className="px-3 pb-2">
          <div className="flex justify-center space-x-1">
            {event.actions.submitUrl && (
              <Button size="sm" variant="outline" className="px-3 py-1 rounded-full text-xs">
                Подати
              </Button>
            )}
            {event.actions.payOnlineUrl && (
              <Button size="sm" className="px-3 py-1 text-xs bg-[#344CB7] text-white rounded-full">
                Сплатити
              </Button>
            )}
          </div>
        </div>
      )}
    </Container>
  )
})

EventItem.displayName = 'EventItem'

const UpcomingEventsCard = React.forwardRef<HTMLDivElement, UpcomingEventsCardProps>(
  ({ events, onViewDetails, onViewAll, ...props }, ref) => {
    // Filter events for current month and show only 2 upcoming events
    const currentMonthEvents = useMemo(() => getCurrentMonthEvents(events), [events]);

    return (
      <div ref={ref} className="bg-white w-full" {...props}>
        {/* Header */}
        <div className="p-4 pb-3 border-b ">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h3 className="text-xl font-semibold text-gray-900">Наступні події</h3>
              <Badge variant="secondary" className="text-xs">
                {new Date().toLocaleDateString('uk-UA', { month: 'long', year: 'numeric' })}
              </Badge>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {currentMonthEvents.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Немає подій на цей місяць</h3>
              <p className="text-gray-500">У поточному місяці немає запланованих подій</p>
            </div>
          ) : (
            <>
              {/* Events Grid with optimized layout */}
              <div className="grid grid-cols-1 gap-4 mb-6">
                {currentMonthEvents.map((event) => (
                  <EventItem
                    key={`${event.id}-${event.deadline}`}
                    event={event}
                    onViewDetails={onViewDetails}
                  />
                ))}
              </div>
            </>
          )}

          {currentMonthEvents.length > 0 && (
            <div className="flex justify-center pt-6 border-t border-gray-100 mt-4">
              <Button
                className="text-[#344CB7] hover:text-[#2A3A9A] hover:bg-[#344CB7]/5 rounded-full px-8 py-3 font-medium transition-all duration-200"
                variant="ghost"
                onClick={onViewAll}
                aria-label="View all upcoming events"
              >
                Переглянути всі події
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

UpcomingEventsCard.displayName = 'UpcomingEventsCard';

export { UpcomingEventsCard };
