import { Calendar, Clock, AlertCircle, CheckCircle, FileText, CreditCard, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface EventCardProps {
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
  variant?: 'card' | 'tile'
}

export function EventCard({
  id,
  type,
  quarter,
  title,
  period,
  deadline,
  window,
  status,
  amount,
  actions,
  details,
  variant = 'card'
}: EventCardProps) {
  // Helper function to get status
  function getStatus(status: string): 'pending' | 'completed' | 'overdue' | 'upcoming' {
    switch (status) {
      case 'Очікується':
        return 'upcoming'
      case 'Завершено':
        return 'completed'
      case 'Прострочено':
        return 'overdue'
      default:
        return 'pending'
    }
  }

  // Helper function to format date
  function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  // Helper function to get type icon
  function getTypeIcon(type: string) {
    switch (type) {
      case 'DECLARATION':
        return <FileText className="w-4 h-4" />
      case 'TAX':
        return <CreditCard className="w-4 h-4" />
      case 'ESV':
        return <Users className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  // Helper function to get status icon
  function getStatusIcon(status: string) {
    const statusType = getStatus(status)
    switch (statusType) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'overdue':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case 'upcoming':
        return <Clock className="w-4 h-4 text-blue-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-900" />
    }
  }

  // Helper function to get status color
  function getStatusColor(status: string) {
    const statusType = getStatus(status)
    switch (statusType) {
      case 'completed':
        return 'bg-green-500 text-white'
      case 'overdue':
        return 'bg-red-500 text-white'
      case 'upcoming':
        return 'bg-[#577BC1] text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  const statusType = getStatus(status)
  const isOverdue = statusType === 'overdue'
  const isUpcoming = statusType === 'upcoming'

    const cardClasses = variant === 'card'
        ? `transition-all duration-200 rounded-none border-0 shadow-none flex flex-col ${
            isOverdue ? 'bg-red-50' :
                isUpcoming ? 'bg-blue-100' :
                    'bg-white'
        }`
        : `transition-all duration-200 hover:bg-gray-50 shadow-none flex flex-col ${
            isOverdue ? 'bg-red-50' :
                isUpcoming ? 'bg-blue-100' :
                    'bg-white'
        }`

  const Container = variant === 'card' ? Card : 'div'

  const Header = variant === 'card' ? CardHeader : 'div'
  const Content = variant === 'card' ? CardContent : 'div'
  const Footer = 'div'

  return (
    <Container className={cardClasses}>
      <Header className={variant === 'card' ? "py-3" : "p-4 pb-3"}>
        <div className="flex items-start ">
          <div className="flex items-center space-x-2">
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
            </div>
          </div>
          <Badge className={getStatusColor(status)}>
            {status}
          </Badge>
        </div>
      </Header>

              <Content className={`flex-1 ${variant === 'card' ? "space-y-8" : "px-4 space-y-8"}`}>
          {/* Period and Deadline */}
          <div className="space-y-2">

            <div className="flex items-center space-x-2 text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#141B34" stroke-width="1.5" />
                    <path d="M12 8V12L14 14" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              <span>Дедлайн до {formatDate(deadline)}</span>
            </div>
          </div>

          {/* Amount if available */}
          {amount && (
            <div className="bg-white p-4 ">
              <div className="flex items-center justify-between">
                <span className=" text-gray-900">Сума:</span>
                <span className="font-semibold text-gray-900">
                  {amount.value.toLocaleString()} {amount.currency}
                </span>
              </div>
              {amount.description && (
                <p className="text-sm text-gray-900 mt-1">{amount.description}</p>
              )}
            </div>
          )}

          {/* Description if available */}
          {details && (
            <div className=" text-gray-900">
              <p>{details.description}</p>
              <p className="text-sm text-gray-900 mt-3">{details.legalReference}</p>
            </div>
          )}
        </Content>

        {/* Footer with Actions */}
        {actions && (
          <Footer className={`${variant === 'card' ? "p-6" : "px-4 pb-4"} `}>
            <div className="flex justify-center space-x-2">
              {actions.submitUrl && (
                <Button size="sm" variant="outline" className="px-6 py-2 rounded-full">
                  Подати
                </Button>
              )}
              {actions.payOnlineUrl && (
                <Button size="md" className="px-6 py-2 text-md bg-[#344CB7] text-white rounded-full">
                  Сплатити
                </Button>
              )}
              {/*{actions.instructionUrl && (*/}
              {/*  <Button size="sm" variant="ghost" className="px-6 py-2 rounded-full">*/}
              {/*    Інструкція*/}
              {/*  </Button>*/}
              {/*)}*/}
            </div>
          </Footer>
        )}
    </Container>
  )
}
