import { Link } from '@inertiajs/react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export interface EventCardProps {
  event: {
    id: number
    title: string
    event_type: 'payment' | 'report'
    start_date: string
    end_date: string
    status: 'pending' | 'completed' | 'overdue'
  }
  className?: string
}

export function EventCard({ event, className }: EventCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getStatusBadgeClass = (status: string) => {
    return cn(
      'text-white',
      status === 'pending' && 'bg-amber-500',
      status === 'completed' && 'bg-emerald-600',
      status === 'overdue' && 'bg-rose-600'
    )
  }

  return (
    <Card className={cn("cursor-pointer transition-all hover:shadow-md", className)}>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Link 
              href={`/events/${event.id}`} 
              prefetch 
              className="text-lg font-semibold text-primary hover:underline"
            >
              {event.title}
            </Link>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="outline" className="capitalize">
                {event.event_type}
              </Badge>
              <Badge className={getStatusBadgeClass(event.status)}>
                {event.status}
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="mt-4 space-y-2 text-base text-neutral-600">
          <div className="flex items-center gap-2">
            <span className="font-medium">Start:</span>
            <span>{formatDate(event.start_date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">End:</span>
            <span>{formatDate(event.end_date)}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
