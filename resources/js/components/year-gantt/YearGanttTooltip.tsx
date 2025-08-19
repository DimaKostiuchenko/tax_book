import { format } from 'date-fns'
import { type Event } from '@/types/events'

interface YearGanttTooltipProps {
  event: Event
}

export function YearGanttTooltip({ event }: YearGanttTooltipProps) {
  return (
    <div className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 rounded-md bg-neutral-900 px-3 py-2 text-xs text-white shadow-lg">
      <div className="font-medium">{event.title}</div>
      <div className="text-neutral-300">
        {format(new Date(event.start_date), 'MMM dd, yyyy')}
        {event.start_date !== event.end_date && (
          <>
            {' - '}
            {format(new Date(event.end_date), 'MMM dd, yyyy')}
          </>
        )}
      </div>
      <div className="text-neutral-300 capitalize">
        {event.event_type} • {event.status}
      </div>
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-900" />
    </div>
  )
}
