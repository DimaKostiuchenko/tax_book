import { useMemo } from 'react'
import { type Event, type StackedEvent } from '@/types/events'

interface UseGanttDataOptions {
  showPayments: boolean
  showReports: boolean
  year: number
}

export function useGanttData(events: Event[], options: UseGanttDataOptions) {
  const { showPayments, showReports, year } = options

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const eventYear = new Date(event.start_date).getFullYear()
      if (eventYear !== year) return false
      
      if (event.event_type === 'payment' && !showPayments) return false
      if (event.event_type === 'report' && !showReports) return false
      
      return true
    }).sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
  }, [events, showPayments, showReports, year])

  const stackedEvents = useMemo(() => {
    const lanes: StackedEvent[][] = []
    
    filteredEvents.forEach(event => {
      let laneIndex = 0
      
      // Find the first lane where this event doesn't overlap
      while (laneIndex < lanes.length) {
        const lane = lanes[laneIndex]
        const hasOverlap = lane.some(existingEvent => {
          const eventStart = new Date(event.start_date)
          const eventEnd = new Date(event.end_date)
          const existingStart = new Date(existingEvent.start_date)
          const existingEnd = new Date(existingEvent.end_date)
          
          return eventStart < existingEnd && eventEnd > existingStart
        })
        
        if (!hasOverlap) break
        laneIndex++
      }
      
      // Create new lane if needed
      if (laneIndex >= lanes.length) {
        lanes.push([])
      }
      
      lanes[laneIndex].push({
        ...event,
        lane: laneIndex,
      })
    })
    
    return lanes.flat()
  }, [filteredEvents])

  return {
    filteredEvents,
    stackedEvents,
  }
}
