import React, { useEffect, useRef } from 'react'

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

interface ChartData {
  year: number
  group: string
  events: TaxEvent[]
}

export function TaxEventsTimeline() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Chart data for Ukrainian tax events
  const chartData: ChartData = {
    year: 2025,
    group: "FOP-3",
    events: [
      {
        id: "decl-q1-2025",
        type: "DECLARATION",
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
        type: "TAX",
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
        type: "ESV",
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
        type: "DECLARATION",
        quarter: "Q2",
        title: "Декларація • Q2",
        period: { start: "2025-04-01", end: "2025-06-30" },
        deadline: "2025-08-09",
        window: { start: "2025-07-01", end: "2025-08-09" },
        status: "Очікується"
      },
      {
        id: "tax-q2-2025",
        type: "TAX",
        quarter: "Q2",
        title: "Єдиний податок • Q2",
        period: { start: "2025-04-01", end: "2025-06-30" },
        deadline: "2025-08-19",
        window: { start: "2025-07-01", end: "2025-08-19" },
        status: "Очікується"
      },
      {
        id: "esv-q2-2025",
        type: "ESV",
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
        type: "DECLARATION",
        quarter: "Q3",
        title: "Декларація • Q3",
        period: { start: "2025-07-01", end: "2025-09-30" },
        deadline: "2025-11-09",
        window: { start: "2025-10-01", end: "2025-11-09" },
        status: "Очікується"
      },
      {
        id: "tax-q3-2025",
        type: "TAX",
        quarter: "Q3",
        title: "Єдиний податок • Q3",
        period: { start: "2025-07-01", end: "2025-09-30" },
        deadline: "2025-11-19",
        window: { start: "2025-10-01", end: "2025-11-19" },
        status: "Очікується"
      },
      {
        id: "esv-q3-2025",
        type: "ESV",
        quarter: "Q3",
        title: "ЄСВ • Q3",
        period: { start: "2025-07-01", end: "2025-09-30" },
        deadline: "2025-10-20",
        window: { start: "2025-10-01", end: "2025-10-20" },
        status: "Очікується",
        amount: { currency: "UAH", value: 1562 }
      },
      {
        id: "decl-q4-2025",
        type: "DECLARATION",
        quarter: "Q4",
        title: "Декларація • Q4",
        period: { start: "2025-10-01", end: "2025-12-31" },
        deadline: "2026-02-09",
        window: { start: "2026-01-01", end: "2026-02-09" },
        status: "Очікується"
      },
      {
        id: "tax-q4-2025",
        type: "TAX",
        quarter: "Q4",
        title: "Єдиний податок • Q4",
        period: { start: "2025-10-01", end: "2025-12-31" },
        deadline: "2026-02-19",
        window: { start: "2026-01-01", end: "2026-02-19" },
        status: "Очікується"
      },
      {
        id: "esv-q4-2025",
        type: "ESV",
        quarter: "Q4",
        title: "ЄСВ • Q4",
        period: { start: "2025-10-01", end: "2025-12-31" },
        deadline: "2026-01-20",
        window: { start: "2026-01-01", end: "2026-01-20" },
        status: "Очікується",
        amount: { currency: "UAH", value: 1562 }
      }
    ]
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Map month abbreviations to an index
    const months = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень']
    const monthMap = new Map(months.map((month, index) => [month, index]))

    // Helper function to get month index from date
    function getMonthIndex(dateString: string): number {
      const date = new Date(dateString)
      return date.getMonth()
    }

    // Helper function to get color for event type
    function getEventColor(type: string): string {
      switch (type) {
        case 'DECLARATION':
          return '#8b5cf6' // Purple
        case 'TAX':
          return '#10b981' // Green
        case 'ESV':
          return '#3b82f6' // Blue
        default:
          return '#6b7280' // Gray
      }
    }

    // Group events by type
    const eventGroups = {
      DECLARATION: chartData.events.filter(event => event.type === 'DECLARATION'),
      TAX: chartData.events.filter(event => event.type === 'TAX'),
      ESV: chartData.events.filter(event => event.type === 'ESV')
    }

    // Constants for drawing
    const margin = 20
    const barHeight = 60
    const rowSpacing = 80 // More space between different event types
    const timelineHeight = Object.keys(eventGroups).length * rowSpacing + margin * 2

    // Calculate dynamic width to ensure all months are visible
    const minMonthWidth = 80 // Minimum width per month for readability
    const totalMonthWidth = months.length * minMonthWidth
    const timelineWidth = Math.max(totalMonthWidth + margin * 2, 1000) // At least 1000px wide

    // Function to resize canvas
    function resizeCanvas() {
      if (!canvas || !ctx) return
      const dpr = window.devicePixelRatio || 1

      // Set canvas size to maintain aspect ratio
      canvas.width = timelineWidth * dpr
      canvas.height = timelineHeight * dpr

      // Set canvas CSS size to fit container while maintaining aspect ratio
      const container = canvas.parentElement
      if (container) {
        const containerWidth = container.clientWidth
        const aspectRatio = timelineWidth / timelineHeight
        const maxHeight = 600 // Maximum height in pixels

        let canvasWidth = containerWidth
        let canvasHeight = containerWidth / aspectRatio

        // If height exceeds max, scale down proportionally
        if (canvasHeight > maxHeight) {
          canvasHeight = maxHeight
          canvasWidth = maxHeight * aspectRatio
        }

        // Ensure minimum width for all months to be visible
        const minCanvasWidth = timelineWidth * 0.9 // At least 90% of timeline width
        if (canvasWidth < minCanvasWidth) {
          canvasWidth = minCanvasWidth
          canvasHeight = minCanvasWidth / aspectRatio
        }

        canvas.style.width = `${canvasWidth}px`
        canvas.style.height = `${canvasHeight}px`
      }

      // Scale for high DPI displays AFTER setting CSS size
      ctx.scale(dpr, dpr)

      // Enable image smoothing for crisp rendering
    //   ctx.imageSmoothingEnabled = true
    //   ctx.imageSmoothingQuality = 'high'
    }

    // Function to draw the chart
    function drawChart() {
      if (!canvas || !ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Reset shadow for background
      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 0
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0

      // Set styles
      ctx.fillStyle = '#262626'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw month scale
      const monthWidth = timelineWidth / months.length
      ctx.font = '12px "Roboto", ui-sans-serif, system-ui, sans-serif'
      ctx.textAlign = 'center'
      //ctx.textBaseline = 'middle'
      ctx.fillStyle = 'white' // zinc-400
    //   ctx.strokeStyle = '#374151' // gray-700

      months.forEach((month, index) => {
        const x = margin + index * monthWidth + monthWidth / 2
        ctx.fillText(month, x, margin + 15)
        ctx.beginPath()
        ctx.moveTo(x, margin + 30)
        ctx.lineTo(x, timelineHeight - margin)
        ctx.stroke()
      })

      // Event type labels removed - cleaner look

      // Draw bars for each event type
      let rowIndex = 0
      Object.entries(eventGroups).forEach(([eventType, events]) => {
        const y = margin + rowIndex * rowSpacing

        events.forEach((event: TaxEvent) => {
          const startMonthIndex = getMonthIndex(event.window.start)
          const endMonthIndex = getMonthIndex(event.window.end)

          const x = margin + startMonthIndex * monthWidth
          const width = (endMonthIndex - startMonthIndex + 1) * monthWidth

                  // Draw the bar
        ctx.fillStyle = getEventColor(event.type)
        ctx.beginPath()
        ctx.roundRect(x, y, width, barHeight, 0)
        ctx.fill()

        // Add subtle shadow for better visual separation
        ctx.shadowColor = 'rgba(0, 0, 0, 0.1)'
        ctx.shadowBlur = 2
        ctx.shadowOffsetX = 1
        ctx.shadowOffsetY = 1
        })

        rowIndex++
      })
    }

    // Initialize
    resizeCanvas()
    drawChart()

    // Handle resize
    const handleResize = () => {
      resizeCanvas()
      drawChart()
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="bg-[#1a1a1a] p-6 rounded-3xl shadow-lg flex-1">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-white mb-2">Tax Events Timeline</h3>
        <p className="text-zinc-400 mb-4">Track your tax-related activities and deadlines</p>
      </div>

      <div className="w-full relative overflow-x-auto pb-4 flex justify-center items-center">
        <canvas
          ref={canvasRef}
          className="bg-[#262626] rounded-xl shadow-lg"
          style={{
            display: 'block',
            borderRadius: '12px',

            minWidth: '1000px' // Ensure minimum width for all months
          }}
        />
      </div>
    </div>
  )
}
