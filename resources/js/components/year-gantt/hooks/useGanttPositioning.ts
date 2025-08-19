import { useMemo } from 'react'

export function useGanttPositioning(year: number) {
  const yearStart = useMemo(() => new Date(year, 0, 1), [year])
  const yearEnd = useMemo(() => new Date(year, 11, 31), [year])
  const yearDuration = useMemo(() => yearEnd.getTime() - yearStart.getTime(), [yearEnd, yearStart])

  const getXPosition = (date: string) => {
    const eventDate = new Date(date)
    const timeFromStart = eventDate.getTime() - yearStart.getTime()
    return Math.max(0, Math.min(100, (timeFromStart / yearDuration) * 100))
  }

  const getWidth = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const duration = end.getTime() - start.getTime()
    return Math.max(1, (duration / yearDuration) * 100)
  }

  return {
    getXPosition,
    getWidth,
    yearStart,
    yearEnd,
  }
}
