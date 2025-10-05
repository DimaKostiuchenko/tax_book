import { router } from '@inertiajs/react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'

export interface EventDetail {
  id: number
  title: string
  event_type: 'payment' | 'report'
  description?: string
  start_date: string
  end_date: string
  status: 'pending' | 'completed' | 'overdue'
}

export interface EventDetailSheetProps {
  event?: EventDetail
  isOpen: boolean
  onClose: () => void
}

export function EventDetailSheet({ event, isOpen, onClose }: EventDetailSheetProps) {
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent side="right" className="w-[480px]">
        {event && (
          <>
            <SheetHeader>
              <SheetTitle>{event.title}</SheetTitle>
            </SheetHeader>
            <div className="mt-4 space-y-2 text-base">
              <div>
                <span className="text-neutral-500">Type:</span> {event.event_type}
              </div>
              <div>
                <span className="text-neutral-500">Start:</span> {formatDateTime(event.start_date)}
              </div>
              <div>
                <span className="text-neutral-500">End:</span> {formatDateTime(event.end_date)}
              </div>
              <div>
                <span className="text-neutral-500">Status:</span> {event.status}
              </div>
              {event.description && (
                <div className="pt-2 text-neutral-600">{event.description}</div>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
