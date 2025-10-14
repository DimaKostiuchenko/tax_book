import React, {useMemo} from 'react'
import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardHeader} from '@/components/ui/card'
import {cn} from '@/lib/utils'

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

const getStatusType = (status: string): 'pending' | 'completed' | 'overdue' | 'upcoming' => {
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

const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
}

const getStatusColor = (status: string) => {
    const statusType = getStatusType(status)
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

const EventHeader = React.memo(({title, status}: { title: string; status: string }) => (
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
))

const EventPeriod = React.memo(({deadline}: { deadline: string }) => (
    <div className="space-y-2">
        <div className="flex items-center space-x-2 text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000"
                 fill="none">
                <circle cx="12" cy="12" r="10" stroke="#141B34" strokeWidth="1.5"/>
                <path d="M12 8V12L14 14" stroke="#141B34" strokeWidth="1.5" strokeLinecap="round"
                      strokeLinejoin="round"/>
            </svg>
            <span>Дедлайн до {formatDate(deadline)}</span>
        </div>
    </div>
))

const EventAmount = React.memo(({amount}: { amount: { currency: string; value: number; description?: string } }) => (
    <div className="bg-white p-4 ">
        <div className="flex items-center justify-between">
            <span className=" text-gray-900">Сума:</span>
            <span className="font-semibold text-gray-900">
        {amount.value.toLocaleString()} {amount.currency}
      </span>
        </div>
        {amount.description && (
            <p className="text-base text-gray-900 mt-1">{amount.description}</p>
        )}
    </div>
))

const EventDetails = React.memo(({details}: { details: { description: string; legalReference: string } }) => (
    <div className=" text-gray-900">
        <p>{details.description}</p>
        <p className="text-base text-gray-900 mt-3">{details.legalReference}</p>
    </div>
))

const EventActions = React.memo(({actions, variant}: { actions: any; variant: string }) => (
    <div className={`${variant === 'card' ? "p-6" : "px-4 pb-4"} `}>
        <div className="flex justify-center space-x-2">
            {actions.submitUrl && (
                <Button size="sm" variant="outline" className="px-6 py-2 rounded-full">
                    Подати
                </Button>
            )}
            {actions.payOnlineUrl && (
                <Button size="lg" className="px-6 py-2 text-md bg-[#344CB7] text-white rounded-full">
                    Сплатити
                </Button>
            )}
        </div>
    </div>
))

export const EventCard = React.memo(({
                                         title,
                                         deadline,
                                         status,
                                         amount,
                                         actions,
                                         details,
                                         variant = 'card'
                                     }: EventCardProps) => {

    const statusType = getStatusType(status)
    const isOverdue = statusType === 'overdue'
    const isUpcoming = useMemo(() => statusType === 'upcoming', [statusType])


    const cardClasses = cn(
        "transition-all duration-200 rounded-none border-0 shadow-none flex flex-col",
        {
            "bg-red-50": isOverdue,
            "bg-blue-100": isUpcoming,
            "bg-white": !isOverdue && !isUpcoming,
            "hover:bg-gray-50": variant === "tile"
        }
    )

    const Container = variant === 'card' ? Card : 'div'
    const Header = variant === 'card' ? CardHeader : 'div'
    const Content = variant === 'card' ? CardContent : 'div'
    const headerClassName = variant === 'card' ? "py-3" : "p-4 pb-3"
    const contentClassName = `flex-1 ${variant === 'card' ? "space-y-8" : "px-4 space-y-8"}`

    return (
        <Container className={cardClasses}>
            <Header className={headerClassName}>
                <EventHeader title={title} status={status}/>
            </Header>
            <Content className={contentClassName}>
                <EventPeriod deadline={deadline}/>
                {amount && <EventAmount amount={amount}/>}
                {details && <EventDetails details={details}/>}
            </Content>
            {actions && (
                <div>
                    <EventActions actions={actions} variant={variant}/>
                </div>
            )}
        </Container>
    )
})
