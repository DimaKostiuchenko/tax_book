import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { YearGantt } from '@/components/year-gantt'
import { LanguageSwitcher } from '@/components/app-language-switcher'
import { useTranslation } from '@/hooks/useTranslation'
import {
  Calendar,
  CreditCard,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

interface InboxLayoutProps {
  children?: React.ReactNode
  className?: string
}

interface EventItem {
  id: number
  title: string
  event_type: 'payment' | 'report'
  description?: string
  start_date: string
  end_date: string
  status: 'pending' | 'completed' | 'overdue'
  amount?: number
  file_path?: string
}

const sampleEvents: EventItem[] = [
  {
    id: 1,
    title: 'Q1 Tax Payment',
    event_type: 'payment',
    description: 'First quarter tax payment for 2025',
    start_date: '2025-01-15',
    end_date: '2025-01-31',
    status: 'pending',
    amount: 15000,
  },
  {
    id: 2,
    title: 'Annual Report Submission',
    event_type: 'report',
    description: 'Annual business activity report for 2024',
    start_date: '2025-02-01',
    end_date: '2025-02-28',
    status: 'pending',
    file_path: '/reports/annual-2024.pdf',
  },
  {
    id: 3,
    title: 'Q2 Tax Payment',
    event_type: 'payment',
    description: 'Second quarter tax payment for 2025',
    start_date: '2025-04-15',
    end_date: '2025-04-30',
    status: 'overdue',
    amount: 18000,
  },
  {
    id: 4,
    title: 'VAT Report',
    event_type: 'report',
    description: 'VAT declaration for Q1 2025',
    start_date: '2025-03-01',
    end_date: '2025-03-31',
    status: 'completed',
    file_path: '/reports/vat-q1-2025.pdf',
  },
]

export function InboxLayout({ children, className }: InboxLayoutProps) {
  const { t, locale } = useTranslation()
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(sampleEvents[0])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700'
      case 'overdue': return 'bg-red-100 text-red-700'
      default: return 'bg-yellow-100 text-yellow-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'overdue': return <AlertCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className={cn("h-screen bg-background flex flex-col", className)}>
      {/* Unified Header */}
      <div className="h-14 border-b bg-background flex items-center px-6">
        <div className="flex items-center gap-4">
          <Calendar className="h-6 w-6 text-purple-600" />
          <h1 className="text-xl font-semibold">{t('tax_events_dashboard')}</h1>
        </div>
        <div className="ml-auto">
          <LanguageSwitcher currentLocale={locale} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Column */}
        <div className="flex-1 flex flex-col">
          {/* Gantt Chart */}
          <div className="p-6 border-b">
            <YearGantt events={sampleEvents} year={2025} />
          </div>

          {/* Event Cards */}
          <div className="flex-1 p-6">
            <h2 className="text-lg font-semibold mb-4">{t('upcoming_events')}</h2>
            <div className="grid gap-4">
              {sampleEvents.map((event) => (
                <Card 
                  key={event.id}
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-md",
                    selectedEvent?.id === event.id && "ring-2 ring-purple-500"
                  )}
                  onClick={() => setSelectedEvent(event)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {event.event_type === 'payment' ? (
                            <CreditCard className="h-4 w-4 text-blue-600" />
                          ) : (
                            <FileText className="h-4 w-4 text-green-600" />
                          )}
                          <h3 className="font-medium">{event.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {event.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{t('start_date')}: {new Date(event.start_date).toLocaleDateString()}</span>
                          <span>{t('end_date')}: {new Date(event.end_date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(event.status)}>
                        {t(event.status)}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Event Details */}
        <div className="w-96 border-l flex flex-col">
          {selectedEvent ? (
            <>
              {/* Event Header */}
              <div className="p-6 border-b">
                <div className="flex items-center gap-3 mb-4">
                  {selectedEvent.event_type === 'payment' ? (
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  ) : (
                    <FileText className="h-6 w-6 text-green-600" />
                  )}
                  <div>
                    <h2 className="text-lg font-semibold">{selectedEvent.title}</h2>
                    <p className="text-sm text-muted-foreground capitalize">
                      {t(selectedEvent.event_type + '_event')}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(selectedEvent.status)}
                    <Badge className={getStatusColor(selectedEvent.status)}>
                      {t(selectedEvent.status)}
                    </Badge>
                  </div>
                  
                  {selectedEvent.amount && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{t('amount')}:</span>
                      <span className="text-lg font-semibold text-green-600">
                        ${selectedEvent.amount.toLocaleString()}
                      </span>
                    </div>
                  )}
                  
                  {selectedEvent.file_path && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{t('file')}:</span>
                      <span className="text-sm text-muted-foreground">
                        {selectedEvent.file_path.split('/').pop()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Event Details */}
              <div className="flex-1 p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">{t('event_description')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedEvent.description}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">{t('timeline')}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t('start_date')}:</span>
                        <span>{new Date(selectedEvent.start_date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t('end_date')}:</span>
                        <span>{new Date(selectedEvent.end_date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 border-t">
                {selectedEvent.event_type === 'payment' ? (
                  <Button className="w-full" size="lg">
                    <CreditCard className="h-4 w-4 mr-2" />
                    {t('pay_now')}
                  </Button>
                ) : (
                  <Button className="w-full" size="lg">
                    <FileText className="h-4 w-4 mr-2" />
                    {t('submit_report')}
                  </Button>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <p>{t('no_data')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
