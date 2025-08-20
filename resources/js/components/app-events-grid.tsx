import { EventCard, type EventCardProps } from './app-event-card'

export interface EventsGridProps {
  events: EventCardProps['event'][]
  className?: string
}

export function EventsGrid({ events, className }: EventsGridProps) {
  if (events.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-neutral-500">
        <p>No events found.</p>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ${className || ''}`}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}
