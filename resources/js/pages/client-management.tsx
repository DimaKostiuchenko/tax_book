import React, {useEffect, useRef} from 'react'
import {
    ChevronLeft,
    ChevronRight,
} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {IconRight} from '@/components/icons/icon-right';
import ClientManagementLayout from '@/layouts/client-management-layout'
import QuarterCircle from "@/components/decorators/quarter-circle";
import {cn} from "@/lib/utils";
import { EventCard } from '@/components/clean-dashboard/event-card'

// Donut Chart Component
const DonutChart = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size with DPI scaling
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';

        ctx.scale(dpr, dpr);

        // Chart data
        const data = [
            {label: 'Ліміт', value: 65, color: '#f97316'}, // Orange
            {label: 'Залишок', value: 35, color: '#3b82f6'} // Blue
        ];

        const total = data.reduce((sum, item) => sum + item.value, 0);

        // Chart dimensions
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const radius = Math.min(centerX, centerY) - 20;
        const innerRadius = radius * 0.6; // Donut hole
        const startAngle = -Math.PI / 2; // Start from top

        // Draw donut chart
        let currentAngle = startAngle;

        data.forEach((item, index) => {
            const sliceAngle = (item.value / total) * 2 * Math.PI;

            // Draw outer arc
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
            ctx.closePath();

            // Fill with color
            ctx.fillStyle = item.color;
            ctx.fill();

            // // Add subtle shadow
            // ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
            // ctx.shadowBlur = 4;
            // ctx.shadowOffsetX = 2;
            // ctx.shadowOffsetY = 2;
            // ctx.fill();

            // // Reset shadow
            // ctx.shadowColor = 'transparent';
            // ctx.shadowBlur = 0;
            // ctx.shadowOffsetX = 0;
            // ctx.shadowOffsetY = 0;

            currentAngle += sliceAngle;
        });

        // Draw center circle (donut hole)
        ctx.beginPath();
        ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // Add center text
        ctx.fillStyle = '#374151';
        ctx.font = 'bold 16px "Roboto", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Всього', centerX, centerY - 10);

        ctx.fillStyle = '#6b7280';
        ctx.font = '12px "Roboto", sans-serif';
        ctx.fillText(`${total}%`, centerX, centerY + 10);

    }, []);

    return (
        <div className="space-y-4">
            <div className="text-center">
                <canvas
                    ref={canvasRef}
                    className="w-full h-48 mx-auto"
                    style={{maxWidth: '200px'}}
                />
            </div>

            {/* Legend */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span className="text-sm text-gray-600">Ліміт суми</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">65%</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm text-gray-600">Залишок суми</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">35%</span>
                </div>
            </div>
        </div>
    );
};

export default function ClientManagement() {
    const months = ['Січень', 'Лютий', 'Березень']
    const kvartals = [1,2,3,4];
    const days = Array.from({length: 31}, (_, i) => i + 1)

    // ESV events data
    const taxEvents = [
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

    return (
        <ClientManagementLayout activeNavItem="events">
            {/* Client Header */}
            <div className="p-6">
                <div className="flex flex-col ">
                    <div className="flex flex-col space-y-3">

                        <div className="flex space-x-2  items-center">
                            <span>
                                <a href="/">Кабінет</a>
                            </span>
                            <span className="text-xs"><IconRight size="sm"/></span>
                            <span className="text-gray-400">Події</span>
                        </div>

                        <div>
                            <div className="p-4 bg-white">
                                <h1 className="text-2xl font-semibold mt-3 text-gray-900">Події</h1>
                                <p className="text-gray-400 pb-3">Податкові події ФОП 3 групи, Костюченка Дмитра</p>
                            </div>
                            <QuarterCircle size="sm" className="bg-gray-50"/>
                        </div>


                    </div>
                </div>
            </div>

            {/* Timeline Content */}
            <div className="px-6">
                {/* Daily Task List */}
                <div className="bg-white">
                    {/* Sub-tabs */}
                    <div className="flex h-16 space-x-6 p-6 border-b border-b-gray-200 items-center">
                        <button className="text-blue-900  font-semibold text-lg">Календар</button>
                        <button className="text-gray-500 hover:text-gray-700 text-lg">Графік</button>
                    </div>



                    <div className="justify-center h-16 border-b border-b-gray-200 grid grid-cols-4 items-stretch">
                        {kvartals.map((kvartal) => (
                            <div
                                key={kvartal}
                                className="px-6 bg-[#344CB7] text-white font-medium transition-colors border-r border-r-gray-100 flex items-center"
                            >
                                {kvartal} квартал
                            </div>
                        ))}
                    </div>


                    {/* Year/Month Navigation */}
                    <div className="flex items-center h-16 border-b border-b-gray-200 px-6">
                        {/*<div className="flex items-center space-x-3 border-r border-r-slate-200 pr-6">*/}
                        {/*    <span>2025</span>*/}
                        {/*</div>*/}

                        {/* <div className="flex space-x-2 pl-6">
                            {months.map((month) => (
                                <button
                                    key={month}
                                    className={`px-4 py-1 rounded-sm font-medium transition-colors ${
                                        month === 'May'
                                            ? 'bg-teal-500 text-white'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    {month}
                                </button>
                            ))}
                        </div> */}
                    </div>




                    {/* Day Grid */}
                    {/* <div className="grid grid-cols-30 gap-1 px-6 py-4 border-b border-b-gray-200">
                        {days.slice(0, 30).map((day) => (
                            <button
                                key={day}
                                className={`flex items-center justify-center aspect-square font-medium transition-colors ${
                                    day === 23
                                        ? 'bg-gray-200'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <span className="px-3 inline-block py-0">{String(day).padStart(2, "0")}</span>
                            </button>
                        ))}
                    </div> */}

                    <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Податкові події</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {taxEvents.map((event) => (
                                <EventCard
                                    key={event.id}
                                    {...event}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Sidebar */}
            <aside className="w-80 p-4">
                <div className="space-y-6 bg-white p-4">
                    <DonutChart/>
                </div>
            </aside>
        </ClientManagementLayout>
    )
}
