import { format } from 'date-fns'

interface YearGanttGridProps {
  year: number
}

export function YearGanttGrid({ year }: YearGanttGridProps) {
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(year, i, 1)
    return {
      month: i,
      label: format(date, 'MMM'),
      fullLabel: format(date, 'MMMM'),
    }
  })

  return (
    <div className="grid grid-cols-12 gap-0 border-b border-neutral-200">
      {months.map(({ month, label, fullLabel }) => (
        <div
          key={month}
          className="flex h-8 items-center justify-center border-r border-neutral-200 bg-neutral-50 px-2 text-xs font-medium text-neutral-600 last:border-r-0"
          title={fullLabel}
        >
          {label}
        </div>
      ))}
    </div>
  )
}
