import { useState } from 'react'
import { cn } from '@/lib/utils'
import { YearGanttTooltip } from './YearGanttTooltip'
import { type Event } from '@/types/events'

interface YearGanttBarProps {
  event: Event
  index: number
  x: number
  width: number
  onClick: () => void
}

export function YearGanttBar({ event, index, x, width, onClick }: YearGanttBarProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  const getBarColor = () => {
    if (event.status === 'completed') return 'bg-emerald-500'
    if (event.status === 'overdue') return 'bg-rose-500'
    return 'bg-amber-500'
  }

  const getBarHeight = () => {
    return event.event_type === 'payment' ? 'h-2' : 'h-4'
  }

  return (
    <div
      className="absolute cursor-pointer transition-all hover:scale-105"
      style={{
        left: `${x}%`,
        width: `${width}%`,
        top: `${index * 24}px`,
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={onClick}
    >
      <div
        className={cn(
          'rounded-sm border border-white/20 shadow-sm',
          getBarColor(),
          getBarHeight(),
          'flex items-center justify-center text-xs font-medium text-white'
        )}
        title={event.title}
      >
        {event.event_type === 'payment' ? '●' : '▬'}
      </div>
      
      {showTooltip && (
        <YearGanttTooltip event={event} />
      )}
    </div>
  )
}
