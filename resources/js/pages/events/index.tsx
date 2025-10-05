import React, { useMemo } from 'react'
import { IconRight } from '@/components/icons/icon-right'
import ClientManagementLayout from '@/layouts/client-management-layout'
import QuarterCircle from "@/components/decorators/quarter-circle"
import { EventCard } from '@/components/event-card'
import { DonutChart } from '@/components/donut-chart'

// Extracted constants
const QUARTERS = [1, 2, 3, 4]

type Status = "Очікується" | "Завершено" | "Прострочено" | string
type Actions = {
    submitUrl?: string
    payOnlineUrl?: string
    instructionUrl?: string
}

// ESV events data
const ESV_EVENTS_DATA = [
    {
        id: "esv-q1",
        type: "ESV" as const,
        quarter: "1",
        title: "Сплата ЄСВ за 1-й квартал",
        period: { start: "2025-01-01", end: "2025-03-31" },
        deadline: " до 2025-04-20",
        window: { start: "2025-04-01", end: "2025-04-20" },
        status: "Очікується",
        amount: {
            currency: "UAH",
            value: 4686,
            description: "1562 грн × 3 місяці"
        },
        details: {
            description: "Період з 01.01.2025 по 31.03.2025. Сплата єдиного соціального внеску для ФОП 3 групи.",
            legalReference: "Закон України про ЄСВ, ст. 9"
        },
        actions: {
            payOnlineUrl: "https://cabinet.tax.gov.ua/payment",
            instructionUrl: "https://tax.gov.ua/esv-instruction"
        }
    },
    {
        id: "esv-q2",
        type: "ESV" as const,
        quarter: "2",
        title: "Сплата ЄСВ за 2-й квартал",
        period: { start: "2025-04-01", end: "2025-06-30" },
        deadline: "2025-07-20",
        window: { start: "2025-07-01", end: "2025-07-20" },
        status: "Очікується",
        amount: {
            currency: "UAH",
            value: 4686,
            description: "1562 грн × 3 місяці"
        },
        details: {
            description: "Період з 01.04.2025 по 30.06.2025. Сплата єдиного соціального внеску для ФОП 3 групи.",
            legalReference: "Закон України про ЄСВ, ст. 9"
        },
        actions: {
            payOnlineUrl: "https://cabinet.tax.gov.ua/payment",
            instructionUrl: "https://tax.gov.ua/esv-instruction"
        }
    },
    {
        id: "esv-q3",
        type: "ESV" as const,
        quarter: "3",
        title: "Сплата ЄСВ за 3-й квартал",
        period: { start: "2025-07-01", end: "2025-09-30" },
        deadline: "2025-10-20",
        window: { start: "2025-10-01", end: "2025-10-20" },
        status: "Очікується",
        amount: {
            currency: "UAH",
            value: 4686,
            description: "1562 грн × 3 місяці"
        },
        details: {
            description: "Період з 01.07.2025 по 30.09.2025. Сплата єдиного соціального внеску для ФОП 3 групи.",
            legalReference: "Закон України про ЄСВ, ст. 9"
        },
        actions: {
            payOnlineUrl: "https://cabinet.tax.gov.ua/payment",
            instructionUrl: "https://tax.gov.ua/esv-instruction"
        }
    },
    {
        id: "esv-q4",
        type: "ESV" as const,
        quarter: "Q4",
        title: "Сплата ЄСВ за 4-й квартал",
        period: { start: "2025-10-01", end: "2025-12-31" },
        deadline: "2026-01-20",
        window: { start: "2026-01-01", end: "2026-01-20" },
        status: "Очікується",
        amount: {
            currency: "UAH",
            value: 4686,
            description: "1562 ₴ × 3 місяці"
        },
        details: {
            description: "Період з 01.10.2025 по 31.12.2025. Сплата єдиного соціального внеску для ФОП 3 групи.",
            legalReference: "Закон України про ЄСВ, ст. 9"
        },
        actions: {
            payOnlineUrl: "https://cabinet.tax.gov.ua/payment",
            instructionUrl: "https://tax.gov.ua/esv-instruction"
        }
    }
]

// Extracted components
const Breadcrumb = React.memo(() => (
    <div className="flex space-x-2 items-center">
        <span>
            <a href="/">Кабінет</a>
        </span>
        <span className="text-xs"><IconRight size="sm"/></span>
        <span className="text-gray-400">Події</span>
    </div>
))

const PageHeader = React.memo(() => (
    <div>
        <div className="p-4 bg-white">
            <h1 className="text-2xl font-semibold mt-3 text-gray-900">Події</h1>
            <p className="text-gray-400 pb-3">Податкові події ФОП 3 групи, Костюченка Дмитра</p>
        </div>
        <QuarterCircle size="sm" className="bg-gray-50"/>
    </div>
))

const NavigationTabs = React.memo(() => (
    <div className="flex h-16 space-x-6 p-6 border-b border-b-gray-200 items-center">
        <button className="text-blue-900 font-semibold text-lg">Календар</button>
        <button className="text-gray-500 hover:text-gray-700 text-lg">Графік</button>
    </div>
))

const QuarterTabs = React.memo(() => (
    <div className="justify-center h-16 border-b border-b-gray-200 grid grid-cols-4 items-stretch">
        {QUARTERS.map((quarter) => (
            <div
                key={quarter}
                className="px-6 bg-[#344CB7] text-white font-medium transition-colors border-r border-r-gray-100 flex items-center"
            >
                {quarter} квартал
            </div>
        ))}
    </div>
))

const EventsGrid = React.memo(({ events }: { events: typeof ESV_EVENTS_DATA }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event) => (
            <EventCard
                key={event.id}
                {...event}
            />
        ))}
    </div>
))

const Sidebar = React.memo(() => {
    const chartData = useMemo(() => [
        { label: 'Ліміт', value: 300, color: "orange" },
        { label: 'Ліміт', value: 300, color: "blue" }
    ], [])

    return (
        <aside className="w-80 p-4">
            <div className="space-y-6 bg-white p-4">
                <DonutChart data={chartData} />
            </div>
        </aside>
    )
})

export default function ClientManagement() {
    const taxEvents = useMemo(() => ESV_EVENTS_DATA, [])

    return (
        <ClientManagementLayout activeNavItem="events">
            {/* Client Header */}
            <div className="p-6">
                <div className="flex flex-col">
                    <div className="flex flex-col space-y-3">
                        <Breadcrumb />
                        <PageHeader />
                    </div>
                </div>
            </div>

            {/* Timeline Content */}
            <div className="px-6">
                <div className="bg-white">
                    <NavigationTabs />
                    <QuarterTabs />

                    <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Податкові події</h3>
                        <EventsGrid events={taxEvents} />
                    </div>
                </div>
            </div>

            {/* <Sidebar /> */}
        </ClientManagementLayout>
    )
}
