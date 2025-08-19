import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/toggle'
import { Label } from '@/components/ui/label'
import { YearGanttGrid } from './YearGanttGrid'
import { YearGanttBar } from './YearGanttBar'
import { YearGanttTooltip } from './YearGanttTooltip'
import { YearGanttDetailPanel } from './YearGanttDetailPanel'
import { useGanttData } from './hooks/useGanttData'
import { useGanttPositioning } from './hooks/useGanttPositioning'
import { type Event } from '@/types/events'

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
              <Switch
                id="show-payments"
                checked={showPayments}
                onCheckedChange={setShowPayments}
              />
              <Label htmlFor="show-payments">Payments</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="show-reports"
                checked={showReports}
                onCheckedChange={setShowReports}
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
            <div className="relative mt-4 h-64">
              {stackedEvents.map((event, index) => (
                <YearGanttBar
                  key={event.id}
                  event={event}
                  index={index}
                  x={getXPosition(event.start_date)}
                  width={getWidth(event.start_date, event.end_date)}
                  onClick={() => handleEventClick(event)}
                />
              ))}
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
