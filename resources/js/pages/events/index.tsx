import { Link, usePage } from '@inertiajs/react'
import { Card } from '@/components/ui/card'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type EventRow = {
  id: number
  title: string
  event_type: 'payment' | 'report'
  start_date: string
  end_date: string
  status: 'pending' | 'completed' | 'overdue'
}

interface PageProps {
  events: {
    data: EventRow[]
    current_page: number
    last_page: number
    links: { url: string | null; label: string; active: boolean }[]
  }
  selectedEvent?: EventRow & { description?: string }
}

export default function EventsIndex() {
  const page = usePage<PageProps>()
  const { events, selectedEvent } = page.props

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-4">
      <h1 className="text-2xl font-semibold">Events</h1>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm">
            <thead className="text-left">
              <tr className="border-b">
                <th className="p-3">Title</th>
                <th className="p-3">Type</th>
                <th className="p-3">Start</th>
                <th className="p-3">End</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {events.data.map((e) => (
                <tr key={e.id} className="cursor-pointer border-b hover:bg-accent/40">
                  <td className="p-3">
                    <Link href={`/events/${e.id}`} prefetch className="text-primary">
                      {e.title}
                    </Link>
                  </td>
                  <td className="p-3 capitalize">{e.event_type}</td>
                  <td className="p-3">{new Date(e.start_date).toLocaleString()}</td>
                  <td className="p-3">{new Date(e.end_date).toLocaleString()}</td>
                  <td className="p-3">
                    <Badge
                      className={cn(
                        e.status === 'pending' && 'bg-amber-500',
                        e.status === 'completed' && 'bg-emerald-600',
                        e.status === 'overdue' && 'bg-rose-600'
                      )}
                    >
                      {e.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {events.links.length > 0 && (
          <div className="flex items-center gap-2 p-3">
            {events.links.map((l, i) => (
              <Link
                key={`${l.label}-${i}`}
                href={l.url ?? '#'}
                className={cn(
                  'rounded px-2 py-1 text-sm',
                  l.active ? 'bg-primary text-primary-foreground' : 'text-neutral-600'
                )}
                preserveScroll
                preserveState
              >
                {l.label.replace('&laquo; Previous', 'Prev').replace('Next &raquo;', 'Next')}
              </Link>
            ))}
          </div>
        )}
      </Card>

      <Sheet open={!!selectedEvent}>
        <SheetContent side="right" className="w-[480px]">
          {selectedEvent && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedEvent.title}</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-2 text-sm">
                <div>
                  <span className="text-neutral-500">Type:</span> {selectedEvent.event_type}
                </div>
                <div>
                  <span className="text-neutral-500">Start:</span> {new Date(selectedEvent.start_date).toLocaleString()}
                </div>
                <div>
                  <span className="text-neutral-500">End:</span> {new Date(selectedEvent.end_date).toLocaleString()}
                </div>
                <div>
                  <span className="text-neutral-500">Status:</span> {selectedEvent.status}
                </div>
                {selectedEvent.description && (
                  <div className="pt-2 text-neutral-600">{selectedEvent.description}</div>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}


