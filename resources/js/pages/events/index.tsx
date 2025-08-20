import { usePage, router } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { YearGantt } from '@/components/year-gantt'
import { EventsGrid } from '@/components/app-events-grid'
import { Pagination } from '@/components/app-pagination'
import { EventDetailSheet } from '@/components/app-event-detail-sheet'
import { type BreadcrumbItem } from '@/types'

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
  [key: string]: any
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Events',
    href: '/events',
  },
]

export default function EventsIndex() {
  const page = usePage<PageProps>()
  const { events, selectedEvent } = page.props

  const handleCloseDetailSheet = () => {
    router.visit('/events', { preserveScroll: true, preserveState: true })
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="mx-auto w-full space-y-6 p-4">
        <h1 className="text-2xl font-semibold">Events</h1>

        <YearGantt events={events.data} year={2025} />

        <EventsGrid events={events.data} />

        <Pagination links={events.links} className="pt-4" />

        <EventDetailSheet
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={handleCloseDetailSheet}
        />
      </div>
    </AppLayout>
  )
}


