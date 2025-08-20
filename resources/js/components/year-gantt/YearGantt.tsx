import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { YearGanttGrid } from './YearGanttGrid'
import { YearGanttBar } from './YearGanttBar'
import { YearGanttTooltip } from './YearGanttTooltip'
import { YearGanttDetailPanel } from './YearGanttDetailPanel'
import { useGanttData } from './hooks/useGanttData'
import { useGanttPositioning } from './hooks/useGanttPositioning'
import { type Event, type StackedEvent } from '@/types/events'

interface YearGanttProps {
  events: Event[]
  year?: number
}

export function YearGantt({ events, year = new Date().getFullYear() }: YearGanttProps) {
  const [showPayments, setShowPayments] = useState(true)
  const [showReports, setShowReports] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const { filteredEvents, stackedEvents } = useGanttData(events, {
    showPayments,
    showReports,
    year,
  })

  const { getXPosition, getWidth } = useGanttPositioning(year)

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event)
  }

  const handleCloseDetail = () => {
    setSelectedEvent(null)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Tax Calendar {year}</span>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="show-payments"
                checked={showPayments}
                onCheckedChange={(checked) => setShowPayments(checked === true)}
              />
              <Label htmlFor="show-payments">Payments</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="show-reports"
                checked={showReports}
                onCheckedChange={(checked) => setShowReports(checked === true)}
              />
              <Label htmlFor="show-reports">Reports</Label>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[1200px]">
            <YearGanttGrid year={year} />
            <div className="relative mt-4 h-64 overflow-visible">
              {/* Vertical Grid Lines */}
              <div className="absolute inset-0 grid grid-cols-12 pointer-events-none">
                {Array.from({ length: 12 }, (_, i) => (
                  <div
                    key={i}
                    className="border-r border-neutral-200 last:border-r-0"
                  />
                ))}
              </div>
              
              {/* Payments Row */}
              <div className="absolute top-0 left-0 right-0 h-1/2 border-b border-neutral-200">
                <div className="text-xs text-neutral-500 px-2 py-1">Payments</div>
                {stackedEvents
                  .filter(event => event.event_type === 'payment')
                  .map((event) => (
                    <YearGanttBar
                      key={event.id}
                      event={event}
                      x={getXPosition(event.start_date)}
                      width={getWidth(event.start_date, event.end_date)}
                      onClick={() => handleEventClick(event)}
                      rowHeight={32} // Half of 64px
                    />
                  ))}
              </div>
              
              {/* Reports Row */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2">
                <div className="text-xs text-neutral-500 px-2 py-1">Reports</div>
                {stackedEvents
                  .filter(event => event.event_type === 'report')
                  .map((event) => (
                    <YearGanttBar
                      key={event.id}
                      event={event}
                      x={getXPosition(event.start_date)}
                      width={getWidth(event.start_date, event.end_date)}
                      onClick={() => handleEventClick(event)}
                      rowHeight={32} // Half of 64px
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <YearGanttDetailPanel
        event={selectedEvent}
        onClose={handleCloseDetail}
      />
    </Card>
  )
}
