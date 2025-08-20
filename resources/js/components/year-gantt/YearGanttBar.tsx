import { useState } from 'react'
import { cn } from '@/lib/utils'
import { YearGanttTooltip } from './YearGanttTooltip'
import { type Event } from '@/types/events'

interface YearGanttBarProps {
  event: Event & { lane?: number }
  x: number
  width: number
  onClick: () => void
  rowHeight?: number
}

export function YearGanttBar({ event, x, width, onClick, rowHeight = 24 }: YearGanttBarProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState<'top' | 'bottom'>('top')

  const getBarColor = () => {
    if (event.status === 'completed') return 'bg-emerald-500'
    if (event.status === 'overdue') return 'bg-rose-500'
    return 'bg-amber-500'
  }

  const getBarHeight = () => {
    const availableHeight = rowHeight - 8 // Leave 4px margin top and bottom
    return event.event_type === 'payment' ? Math.min(availableHeight, 12) : Math.min(availableHeight, 20)
  }

  return (
    <div
      className="absolute cursor-pointer transition-all hover:scale-105"
      style={{
        left: `${x}%`,
        width: `${width}%`,
        top: `${(event.lane || 0) * rowHeight + (rowHeight - getBarHeight()) / 2}px`,
      }}
      onMouseEnter={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const containerRect = e.currentTarget.closest('.relative')?.getBoundingClientRect()

        if (containerRect) {
          const spaceAbove = rect.top - containerRect.top
          const spaceBelow = containerRect.bottom - rect.bottom
          setTooltipPosition(spaceAbove > spaceBelow ? 'top' : 'bottom')
        }
        setShowTooltip(true)
      }}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={onClick}
    >
      <div
        className={cn(
          'rounded-sm border border-white/20 shadow-sm',
          getBarColor(),
          'flex items-center justify-center text-xs font-medium text-white'
        )}
        style={{ height: `${getBarHeight()}px` }}
        title={event.title}
      >

      </div>

      {showTooltip && (
        <YearGanttTooltip event={event} position={tooltipPosition} />
      )}
    </div>
  )
}
