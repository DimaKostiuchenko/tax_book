import { format } from 'date-fns'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { type Event } from '@/types/events'

interface YearGanttDetailPanelProps {
  event: Event | null
  onClose: () => void
}

export function YearGanttDetailPanel({ event, onClose }: YearGanttDetailPanelProps) {
  if (!event) return null

  const getStatusColor = () => {
    if (event.status === 'completed') return 'bg-emerald-500'
    if (event.status === 'overdue') return 'bg-rose-500'
    return 'bg-amber-500'
  }

  return (
    <Sheet open={!!event} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-[480px]">
        <SheetHeader>
          <SheetTitle>{event.title}</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-500">Type</span>
            <Badge variant="outline" className="capitalize">
              {event.event_type}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-500">Status</span>
            <Badge className={cn('text-white', getStatusColor())}>
              {event.status}
            </Badge>
          </div>
          
          <div>
            <span className="text-sm font-medium text-neutral-500">Start Date</span>
            <div className="mt-1 text-sm">
              {format(new Date(event.start_date), 'EEEE, MMMM dd, yyyy')}
            </div>
          </div>
          
          <div>
            <span className="text-sm font-medium text-neutral-500">End Date</span>
            <div className="mt-1 text-sm">
              {format(new Date(event.end_date), 'EEEE, MMMM dd, yyyy')}
            </div>
          </div>
          
          {event.description && (
            <div>
              <span className="text-sm font-medium text-neutral-500">Description</span>
              <div className="mt-1 text-sm text-neutral-600">
                {event.description}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
