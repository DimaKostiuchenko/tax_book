import React from 'react'

interface TaxEvent {
  id: string
  type: 'DECLARATION' | 'TAX' | 'ESV'
  quarter: string
  title: string
  period: {
    start: string
    end: string
  }
  deadline: string
  window: {
    start: string
    end: string
  }
  status: string
  amount?: {
    currency: string
    value: number
    description?: string
  }
  actions?: {
    submitUrl?: string
    payOnlineUrl?: string
    instructionUrl?: string
  }
  details?: {
    description: string
    legalReference: string
  }
}

interface GanttTimelineWidgetProps {
  events?: TaxEvent[]
  title?: string
}

export function GanttTimelineWidget({
  events = [],
  title = "Tax Events Timeline 2025"
}: GanttTimelineWidgetProps) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  // Helper function to calculate position and width based on dates
  const calculateBarStyle = (startDate: string, endDate: string, topPosition: number) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const yearStart = new Date(start.getFullYear(), 0, 1)

    const startDay = Math.floor((start.getTime() - yearStart.getTime()) / (1000 * 60 * 60 * 24))
    const endDay = Math.floor((end.getTime() - yearStart.getTime()) / (1000 * 60 * 60 * 24))
    const duration = endDay - startDay + 1

    const left = (startDay / 365) * 100
    const width = (duration / 365) * 100

    return {
      top: `${topPosition}px`,
      left: `calc(${left}%)`,
      width: `calc(${width}%)`
    }
  }

  // Chart data for Ukrainian tax events (from tax-events-widget.tsx)
  const chartData = {
    year: 2025,
    group: "FOP-3",
    events: [
      {
        id: "decl-q1-2025",
        type: "DECLARATION" as const,
        quarter: "Q1",
        title: "Декларація • Q1",
        period: { start: "2025-01-01", end: "2025-03-31" },
        deadline: "2025-05-10",
        window: { start: "2025-04-01", end: "2025-05-10" },
        status: "Очікується",
        actions: {
          submitUrl: "https://cabinet.tax.gov.ua",
          instructionUrl: "https://tax.gov.ua/declaration-instruction"
        },
        details: {
          description: "Подати квартальну декларацію з єдиного податку.",
          legalReference: "НКУ ст. 296"
        }
      },
      {
        id: "tax-q1-2025",
        type: "TAX" as const,
        quarter: "Q1",
        title: "Єдиний податок • Q1",
        period: { start: "2025-01-01", end: "2025-03-31" },
        deadline: "2025-05-20",
        window: { start: "2025-04-01", end: "2025-05-20" },
        status: "Очікується",
        actions: {
          payOnlineUrl: "https://cabinet.tax.gov.ua/payment",
          instructionUrl: "https://tax.gov.ua/ep-instruction"
        },
        details: {
          description: "Сплата єдиного податку за I квартал.",
          legalReference: "НКУ ст. 295"
        }
      },
      {
        id: "esv-q1-2025",
        type: "ESV" as const,
        quarter: "Q1",
        title: "ЄСВ • Q1",
        period: { start: "2025-01-01", end: "2025-03-31" },
        deadline: "2025-04-20",
        window: { start: "2025-04-01", end: "2025-04-20" },
        status: "Очікується",
        amount: { currency: "UAH", value: 1562, description: "мінімальний внесок" },
        actions: {
          payOnlineUrl: "https://cabinet.tax.gov.ua/payment",
          instructionUrl: "https://tax.gov.ua/esv-instruction"
        },
        details: {
          description: "Єдиний соціальний внесок за I квартал.",
          legalReference: "Закон про ЄСВ"
        }
      },
      {
        id: "decl-q2-2025",
        type: "DECLARATION" as const,
        quarter: "Q2",
        title: "Декларація • Q2",
        period: { start: "2025-04-01", end: "2025-06-30" },
        deadline: "2025-08-09",
        window: { start: "2025-07-01", end: "2025-08-09" },
        status: "Очікується"
      },
      {
        id: "tax-q2-2025",
        type: "TAX" as const,
        quarter: "Q2",
        title: "Єдиний податок • Q2",
        period: { start: "2025-04-01", end: "2025-06-30" },
        deadline: "2025-08-19",
        window: { start: "2025-07-01", end: "2025-08-19" },
        status: "Очікується"
      },
      {
        id: "esv-q2-2025",
        type: "ESV" as const,
        quarter: "Q2",
        title: "ЄСВ • Q2",
        period: { start: "2025-04-01", end: "2025-06-30" },
        deadline: "2025-07-20",
        window: { start: "2025-07-01", end: "2025-07-20" },
        status: "Очікується",
        amount: { currency: "UAH", value: 1562 }
      },
      {
        id: "decl-q3-2025",
        type: "DECLARATION" as const,
        quarter: "Q3",
        title: "Декларація • Q3",
        period: { start: "2025-07-01", end: "2025-09-30" },
        deadline: "2025-11-09",
        window: { start: "2025-10-01", end: "2025-11-09" },
        status: "Очікується"
      },
      {
        id: "tax-q3-2025",
        type: "TAX" as const,
        quarter: "Q3",
        title: "Єдиний податок • Q3",
        period: { start: "2025-07-01", end: "2025-09-30" },
        deadline: "2025-11-19",
        window: { start: "2025-10-01", end: "2025-11-19" },
        status: "Очікується"
      }
    ]
  }

  // Use provided events or chartData events
  const timelineEvents: TaxEvent[] = events.length > 0 ? events : chartData.events

  // Group events by type
  const eventsByType = timelineEvents.reduce((acc, event) => {
    if (!acc[event.type]) {
      acc[event.type] = []
    }
    acc[event.type].push(event)
    return acc
  }, {} as Record<string, TaxEvent[]>)

  return (
    <div className="bg-white  shadow-md p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600 mt-2">Track your project timeline and milestones</p>
      </div>

      <div className="relative w-full h-[500px] bg-gray-100 rounded-lg overflow-hidden">
        {/* X-Axis (Months) */}
        <div className="absolute top-0 left-0 w-full h-[50px] flex border-b border-gray-300 bg-white">
          {months.map((month, index) => (
            <div
              key={month}
              className="flex-1 text-center leading-[50px] text-sm text-gray-600 border-r border-gray-200 last:border-r-0"
            >
              {month}
            </div>
          ))}
        </div>

        {/* Month Gridlines */}
        <div className="absolute top-[50px] left-0 w-full h-[calc(100%-50px)]">
          {months.map((month, index) => (
            <div
              key={`gridline-${month}`}
              className="absolute top-0 bottom-0 w-px bg-gray-200"
              style={{ left: `${(index / months.length) * 100}%` }}
            />
          ))}
        </div>

        {/* Gantt Chart Bars */}
        <div className="absolute top-[50px] left-0 w-full h-[calc(100%-50px)] px-4">
          {Object.entries(eventsByType).map(([type, typeEvents], typeIndex) => {
            // Calculate proportional positioning with padding
            const chartHeight = 450 // Total chart height minus header
            const rowHeight = 80 // Height of each bar
            const padding = 20 // Padding from top and bottom of each row
            const availableHeight = rowHeight - (padding * 2) // Available height for bars
            const topPosition = typeIndex * 120 + padding // Add padding to center bars

            return typeEvents.map((event) => (
              <div
                key={event.id}
                className={`absolute rounded-r-md text-white flex items-center justify-center font-bold text-sm shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl cursor-pointer
                  ${type === 'DECLARATION' ? 'bg-blue-500' : ''}
                  ${type === 'TAX' ? 'bg-green-500' : ''}
                  ${type === 'ESV' ? 'bg-orange-500' : ''}
                `}
                style={{
                  ...calculateBarStyle(event.window.start, event.window.end, topPosition),
                  height: `${availableHeight}px`
                }}
                title={`${event.title}: ${new Date(event.window.start).toLocaleDateString()} - ${new Date(event.window.end).toLocaleDateString()}`}
              >
                {event.title}
              </div>
            ))
          })}
        </div>
      </div>
    </div>
  )
}
