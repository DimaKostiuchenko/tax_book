import {useState} from 'react'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import MyGantt from '@/components/my-gantt'
import {Button} from '@/components/ui/button'
import {Badge} from '@/components/ui/badge'
import {Separator} from '@/components/ui/separator'
import {cn} from '@/lib/utils'
import {YearGantt} from '@/components/year-gantt'
import {LanguageSwitcher} from '@/components/app-language-switcher'
import {useTranslation} from '@/hooks/useTranslation'
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

export function InboxLayout({children, className}: InboxLayoutProps) {
    const {t, locale} = useTranslation()
    const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(sampleEvents[0])

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-700'
            case 'overdue':
                return 'bg-red-100 text-red-700'
            default:
                return 'bg-yellow-100 text-yellow-700'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="h-4 w-4"/>
            case 'overdue':
                return <AlertCircle className="h-4 w-4"/>
            default:
                return <Clock className="h-4 w-4"/>
        }
    }

    return (
        <div className={cn("h-screen bg-background flex flex-col", className)}>
            {/* Unified Header */}
            <div className="h-14 border-b bg-background flex items-center px-6">
                <div className="flex items-center gap-4">
                    <Calendar className="h-6 w-6 text-purple-600"/>
                    <h1 className="text-xl font-semibold">{t('tax_events_dashboard')}</h1>
                </div>
                <div className="ml-auto">
                    <LanguageSwitcher currentLocale={locale}/>
                </div>
            </div>

            {/* Main Content */}
          <MyGantt/>


        </div>
    )
}
