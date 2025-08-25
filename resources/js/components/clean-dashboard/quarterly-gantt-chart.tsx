import React, { useEffect, useRef, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface MonthData {
  name: string
  value: number
  color?: string
}

interface QuarterData {
  label: string
  months: MonthData[]
}

interface MainBarData {
  startMonth: string
  endMonth: string
  color: string
  height: number
}

export function QuarterlyGanttChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [clickedBar, setClickedBar] = useState<{ type: string; data: any } | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Data for the chart
    // Each quarter object contains a label and an array of months
    const chartData: QuarterData[] = [
      {
        label: 'I квартал',
        months: [
          { name: 'СІЧЕНЬ', value: 100, color: '#00c3a5' },
          { name: 'ЛЮТИЙ', value: 0 },
          { name: 'БЕРЕЗЕНЬ', value: 0 },
          { name: 'КВІТЕНЬ', value: 100, color: '#00c3a5' }
        ]
      },
      {
        label: 'II квартал',
        months: [
          { name: 'ТРАВЕНЬ', value: 0 },
          { name: 'ЧЕРВЕНЬ', value: 0 },
          { name: 'ЛИПЕНЬ', value: 100, color: '#00c3a5' },
          { name: 'СЕРПЕНЬ', value: 0 }
        ]
      },
      {
        label: 'III квартал',
        months: [
          { name: 'ВЕРЕСЕНЬ', value: 0 },
          { name: 'ЖОВТЕНЬ', value: 100, color: '#00c3a5' },
          { name: 'ЛИСТОПАД', value: 0 },
          { name: 'ГРУДЕНЬ', value: 0 }
        ]
      },
      {
        label: 'IV квартал',
        months: []
      }
    ]

    // Primary data bar for the top of the chart
    const mainBarData: MainBarData[] = [
      { startMonth: 'СІЧЕНЬ', endMonth: 'КВІТЕНЬ', color: '#4dc3ff', height: 40 }
    ]

    // Function to draw the entire chart
    function drawChart() {
      // Set canvas dimensions to be responsive
      const container = canvas.parentElement
      if (!container) return

      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const totalMonths = 12
      const monthWidth = canvas.width / totalMonths
      const topPadding = 50
      const bottomPadding = 30

      // Draw month labels and vertical grid lines
      const allMonths = chartData.flatMap(q => q.months.map(m => m.name))
      allMonths.push('ЛИСТОПАД', 'ГРУДЕНЬ') // Add the last two months as placeholders

      allMonths.forEach((month, index) => {
        const x = index * monthWidth + monthWidth / 2

        // Draw vertical grid lines
        ctx.beginPath()
        ctx.strokeStyle = '#e0e0e0'
        ctx.lineWidth = 1
        ctx.moveTo(index * monthWidth, topPadding)
        ctx.lineTo(index * monthWidth, canvas.height - bottomPadding)
        ctx.stroke()

        // Draw month labels
        ctx.fillStyle = '#666'
        ctx.textAlign = 'center'
        ctx.font = '12px Arial'
        ctx.fillText(month, x, canvas.height - 10)
      })

      // Draw the top bar
      mainBarData.forEach(bar => {
        const startIndex = allMonths.indexOf(bar.startMonth)
        const endIndex = allMonths.indexOf(bar.endMonth)
        if (startIndex !== -1 && endIndex !== -1) {
          const startX = startIndex * monthWidth
          const width = (endIndex - startIndex + 1) * monthWidth

          // Draw the main rectangle with rounded corners
          ctx.fillStyle = bar.color
          ctx.beginPath()
          ctx.roundRect(startX, topPadding + 20, width, bar.height, 8)
          ctx.fill()
        }
      })

      // Draw quarter labels
      const quarterMonthCounts = chartData.map(q => q.months.length)
      let currentMonthIndex = 0
      chartData.forEach((quarter, index) => {
        const quarterWidth = quarter.months.length * monthWidth
        const x = currentMonthIndex * monthWidth + quarterWidth / 2

        ctx.fillStyle = '#333'
        ctx.textAlign = 'center'
        ctx.font = '16px Arial'
        ctx.fillText(quarter.label, x, topPadding)

        currentMonthIndex += quarter.months.length
      })

      // Draw the smaller green bars
      currentMonthIndex = 0
      chartData.forEach(quarter => {
        quarter.months.forEach(month => {
          if (month.value > 0) {
            const x = currentMonthIndex * monthWidth + (monthWidth / 4)
            const y = canvas.height - bottomPadding - 60
            const width = monthWidth / 2
            const height = 40

            // Draw the green rectangle with rounded corners
            ctx.fillStyle = month.color || '#00c3a5'
            ctx.beginPath()
            ctx.roundRect(x, y, width, height, 8)
            ctx.fill()
          }
          currentMonthIndex++
        })
      })
    }

    // Draw on load and resize
    drawChart()
    
    const handleResize = () => drawChart()
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Handle canvas click
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const totalMonths = 12
    const monthWidth = canvas.width / totalMonths
    const topPadding = 50
    const bottomPadding = 30

    // Check if click is on the top bar
    const topBarY = topPadding + 20
    const topBarHeight = 40
    if (y >= topBarY && y <= topBarY + topBarHeight) {
      const monthIndex = Math.floor(x / monthWidth)
      const allMonths = ['СІЧЕНЬ', 'ЛЮТИЙ', 'БЕРЕЗЕНЬ', 'КВІТЕНЬ', 'ТРАВЕНЬ', 'ЧЕРВЕНЬ', 'ЛИПЕНЬ', 'СЕРПЕНЬ', 'ВЕРЕСЕНЬ', 'ЖОВТЕНЬ', 'ЛИСТОПАД', 'ГРУДЕНЬ']
      const clickedMonth = allMonths[monthIndex]
      
      setClickedBar({
        type: 'main',
        data: {
          title: 'Main Progress Bar',
          period: 'January - April 2024',
          description: 'Primary quarterly progress indicator',
          month: clickedMonth
        }
      })
      setIsModalOpen(true)
      return
    }

    // Check if click is on green bars
    const greenBarY = canvas.height - bottomPadding - 60
    const greenBarHeight = 40
    if (y >= greenBarY && y <= greenBarY + greenBarHeight) {
      const monthIndex = Math.floor(x / monthWidth)
      const allMonths = ['СІЧЕНЬ', 'ЛЮТИЙ', 'БЕРЕЗЕНЬ', 'КВІТЕНЬ', 'ТРАВЕНЬ', 'ЧЕРВЕНЬ', 'ЛИПЕНЬ', 'СЕРПЕНЬ', 'ВЕРЕСЕНЬ', 'ЖОВТЕНЬ', 'ЛИСТОПАД', 'ГРУДЕНЬ']
      const clickedMonth = allMonths[monthIndex]
      
      // Check if this month has a green bar
      const chartData = [
        { name: 'СІЧЕНЬ', value: 100 },
        { name: 'КВІТЕНЬ', value: 100 },
        { name: 'ЛИПЕНЬ', value: 100 },
        { name: 'ЖОВТЕНЬ', value: 100 }
      ]
      
      const hasGreenBar = chartData.some(month => month.name === clickedMonth && month.value > 0)
      
      if (hasGreenBar) {
        setClickedBar({
          type: 'green',
          data: {
            title: 'Monthly Progress',
            period: `${clickedMonth} 2024`,
            description: 'Individual month progress indicator',
            month: clickedMonth,
            value: 100
          }
        })
        setIsModalOpen(true)
      }
    }
  }

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Quarterly Gantt Chart</h3>
        <p className="text-sm text-gray-600 mt-1">Track quarterly progress and milestones</p>
      </div>
      
      <div className="chart-container" style={{ height: '300px', width: '100%' }}>
        <canvas 
          ref={canvasRef}
          style={{ width: '100%', height: '100%', cursor: 'pointer' }}
          onClick={handleCanvasClick}
        />
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {clickedBar?.data.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">Period:</span>
              <span className="text-sm text-gray-900">{clickedBar?.data.period}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">Month:</span>
              <span className="text-sm text-gray-900">{clickedBar?.data.month}</span>
            </div>
            {clickedBar?.type === 'green' && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Progress:</span>
                <span className="text-sm text-gray-900">{clickedBar?.data.value}%</span>
              </div>
            )}
            <div className="pt-2">
              <p className="text-sm text-gray-600">{clickedBar?.data.description}</p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <div 
                className={`w-4 h-4 rounded-full ${
                  clickedBar?.type === 'main' ? 'bg-blue-400' : 'bg-green-500'
                }`}
              />
              <span className="text-sm text-gray-600">
                {clickedBar?.type === 'main' ? 'Main Progress Bar' : 'Monthly Indicator'}
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
