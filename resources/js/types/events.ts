export interface Event {
  id: number
  title: string
  event_type: 'payment' | 'report'
  description?: string
  start_date: string
  end_date: string
  status: 'pending' | 'completed' | 'overdue'
}

export interface StackedEvent extends Event {
  lane: number
}
