import React, { useEffect, useRef } from 'react'
import {
    ArrowLeft,
    MoreVertical,
    Play,
    ChevronLeft,
    ChevronRight,
    Settings,
    Bell,
    User,
    Archive,
    Database,
    GitBranch,
    Grid
} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Badge} from '@/components/ui/badge'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {IconHome} from '@/components/icons/icon-home';
import {IconEvents} from '@/components/icons/icon-events';

// Add Roboto font from Google Fonts
const robotoFont = {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 400,
    fontStyle: 'normal',
}

interface NavItem {
    icon: React.ReactNode
    label: string
    active?: boolean
}

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
            { label: 'New Visitors', value: 65, color: '#f97316' }, // Orange
            { label: 'Returning Visitors', value: 35, color: '#3b82f6' } // Blue
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

            // Add subtle shadow
            ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
            ctx.shadowBlur = 4;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            ctx.fill();

            // Reset shadow
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            currentAngle += sliceAngle;
        });

        // Draw center circle (donut hole)
        ctx.beginPath();
        ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // Add center text
        ctx.fillStyle = '#374151';
        ctx.font = 'bold 16px Roboto';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Today', centerX, centerY - 10);

        ctx.fillStyle = '#6b7280';
        ctx.font = '12px Roboto';
        ctx.fillText(`${total}%`, centerX, centerY + 10);

    }, []);

    return (
        <div className="space-y-4">
            <div className="text-center">
                <canvas
                    ref={canvasRef}
                    className="w-full h-48 mx-auto"
                    style={{ maxWidth: '200px' }}
                />
            </div>

            {/* Legend */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span className="text-sm text-gray-600">New Visitors</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">65%</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm text-gray-600">Returning Visitors</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">35%</span>
                </div>
            </div>
        </div>
    );
};

export default function ClientManagement() {
    const navItems: NavItem[] = [
        {icon: <IconHome className="w-5 h-5"/>, label: "Кабінет"},
        {icon: <IconEvents className="w-5 h-5"/>, label: "Події", active: true},
        // {icon: <GitBranch className="w-5 h-5"/>, label: "Робочі процеси"},
        // {icon: <Database className="w-5 h-5"/>, label: "Шаблони"},
        // {icon: <Settings className="w-5 h-5"/>, label: "Налаштування"},
        // {icon: <Archive className="w-5 h-5"/>, label: "Архів"},
        // {icon: <Bell className="w-5 h-5"/>, label: "Сповіщення"},
        // {icon: <User className="w-5 h-5"/>, label: "Обліковий запис"},
    ]

    const months = ['Січ.', 'Лют.', 'Бер.', 'Кві.', 'Тра.', 'Чер.', 'Лип.', 'Сер.', 'Вер.', 'Жов.', 'Груд.']
    const days = Array.from({length: 31}, (_, i) => i + 1)

    const tasks = [
        {time: "09:23", type: "Головне завдання", subject: "Accounts and tax", active: true},
        {time: "10:20", type: "Допоміжне завдання", subject: "Business plans"},
        {time: "11:35", type: "Додаткове завдання", subject: "Risk analysis"},
        {time: "12:00", type: "Щоденне завдання", subject: "Preparing budget forecasts"},
    ]

    return (
        <>
            {/* Google Fonts - Roboto */}
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
            <link
                href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
                rel="stylesheet"/>

            <div className="min-h-screen bg-gradient-to-b from-slate-200 to-gray-100 flex" style={robotoFont}>
                {/* Left Sidebar - Navigation */}
                <aside className="w-64 bg-white">
                    <div className="p-6">
                        {/* Logo */}
                        <div className="flex items-center space-x-2 mb-8 rounded-full">
                            <img className="photo rounded-full"  width="48" height="48"
                                 src="https://cdn.dribbble.com/users/16210634/avatars/normal/3887fa4eefec745603aa5a22ff0ececf.png?1684165676"/>
                        </div>

                        {/* Navigation Menu */}
                        <nav className="space-y-2">
                            {navItems.map((item, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                                        item.active
                                            ? ' font-bold'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    <div className={item.active ? 'text-teal-600' : 'text-gray-500'}>
                                        {item.icon}
                                    </div>
                                    <span className="font-medium">{item.label}</span>
                                </a>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 flex flex-col">
                    {/* Client Header */}
                    <div className="p-6">
                        <div className="flex flex-col ">

                            <div className="flex flex-col space-y-2">


                                {/*<Button variant="ghost" className="bg-gray-100">*/}
                                {/*    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">*/}
                                {/*        <path d="M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>*/}
                                {/*    </svg>*/}
                                {/*</Button>*/}

                                <h1 className="text-2xl font-semibold mt-3 text-gray-900">Події</h1>
                                <p className="text-gray-400 pb-3">Податкові події ФОП 3 групи, Костюченка Дмитра</p>

                                <div className="flex space-x-2 items-center">
                                    <IconHome className="w-5 h-5"/>
                                    <span>

                                        <a href="/">Кабінет</a>
                                    </span>
                                    <span className="text-xs">/</span>
                                    <span className="text-gray-400">Події</span>
                                </div>
                            </div>


                            {/*<div className="flex space-x-4">*/}
                            {/*    /!* Tabs *!/*/}
                            {/*    <div className="flex space-x-6">*/}
                            {/*        <button className="text-gray-500 hover:text-gray-700">Інформація</button>*/}
                            {/*        <button className="text-teal-600 border-b-2 border-teal-600 pb-1">Часові рамки*/}
                            {/*        </button>*/}
                            {/*        <button className="text-gray-500 hover:text-gray-700">Нотатки</button>*/}
                            {/*        <button className="text-gray-500 hover:text-gray-700">Інтеграції</button>*/}
                            {/*        <button className="text-gray-500 hover:text-gray-700">Бюджет</button>*/}
                            {/*    </div>*/}

                            {/*    /!* Time Tracking *!/*/}
                            {/*    <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-lg">*/}
                            {/*        <span className="text-sm font-medium text-gray-700">00:12:32</span>*/}
                            {/*        <Button size="icon" className="w-8 h-8 bg-teal-500 hover:bg-teal-600">*/}
                            {/*            <Play className="w-4 h-4 text-white"/>*/}
                            {/*        </Button>*/}
                            {/*    </div>*/}

                            {/*    <Button variant="ghost" size="icon">*/}
                            {/*        <MoreVertical className="w-5 h-5"/>*/}
                            {/*    </Button>*/}
                            {/*</div>*/}


                        </div>
                    </div>

                    {/* Timeline Content */}
                    <div className="px-6">

                        {/* Daily Task List */}
                        <div className="bg-white">

                            {/* Sub-tabs */}
                            <div className="flex h-16 space-x-6 p-6 border-b border-b-gray-200 items-center">
                                <button className="text-teal-600">Календар</button>
                                <button className="text-gray-500 hover:text-gray-700">Графік</button>
                            </div>

                            {/* Year/Month Navigation */}
                            <div className="flex items-center h-16 border-b border-b-gray-200 px-6">
                                <div className="flex items-center space-x-3 border-r border-r-slate-200 pr-6">
                                    <span>2025</span>
                                    {/*<Button variant="ghost" size="icon" className="rounded-full">*/}
                                    {/*    <ChevronLeft className="w-4 h-4" />*/}
                                    {/*</Button>*/}
                                    {/*<Button variant="ghost" size="icon" className="rounded-full">*/}
                                    {/*    <ChevronRight className="w-4 h-4" />*/}
                                    {/*</Button>*/}
                                </div>

                                <div className="flex space-x-2 pl-6">
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
                                </div>
                            </div>

                            {/* Day Grid */}
                            <div className="grid grid-cols-30 gap-1 px-6 py-4 border-b border-b-gray-200">
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
                            </div>



                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Понеділок 23-го</h3>
                                <div className="space-y-4">
                                    {tasks.map((task, index) => (
                                        <div key={index} className="flex items-start space-x-4">
                                            {/* Timeline */}
                                            <div className="flex flex-col items-center space-y-2">
                                                <div className={`w-3 h-3 rounded-full ${
                                                    task.active ? 'bg-blue-500' : 'bg-gray-300'
                                                }`}/>
                                                <span className="text-xs text-gray-500">{task.time}</span>
                                            </div>

                                            {/* Task Card */}
                                            <div className={`flex-1 p-6 rounded-lg border ${
                                                task.active ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'
                                            }`}>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="flex items-center space-x-2 mb-1">
                                                            <span className="text-sm font-medium text-gray-900">
                                                            {task.time} - {task.type}
                                                            </span>
                                                            {task.active && (
                                                                <div className="w-2 h-2 bg-blue-500 rounded-full"/>
                                                            )}
                                                        </div>
                                                        <p className="text-gray-600">{task.subject}</p>
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        Тип • Тема
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>


                        </div>
                    </div>
                </main>

                {/* Right Sidebar */}
                <aside className="w-80 p-4">
                    <div className="space-y-6 bg-white p-4">
                        <DonutChart />
                        {/* Visitor Statistics Card */}
                        {/*<Card>*/}
                        {/*    <CardHeader>*/}
                        {/*        <CardTitle className="text-lg">Відвідувачі</CardTitle>*/}
                        {/*    </CardHeader>*/}
                        {/*    <CardContent>*/}
                        {/*        <DonutChart />*/}
                        {/*    </CardContent>*/}
                        {/*</Card>*/}



                        {/*/!* Additional Sections *!/*/}
                        {/*<div className="space-y-3">*/}
                        {/*    <div*/}
                        {/*        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">*/}
                        {/*        <span className="font-medium">Липень 2021 Спринт</span>*/}
                        {/*        <ChevronRight className="w-4 h-4 text-gray-500"/>*/}
                        {/*    </div>*/}
                        {/*    <div*/}
                        {/*        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">*/}
                        {/*        <span className="font-medium">Шаблон бухгалтерії</span>*/}
                        {/*        <ChevronRight className="w-4 h-4 text-gray-500"/>*/}
                        {/*    </div>*/}
                        {/*    <div*/}
                        {/*        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">*/}
                        {/*        <span className="font-medium">Робочий процес податків</span>*/}
                        {/*        <ChevronRight className="w-4 h-4 text-gray-500"/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </aside>
            </div>
        </>
    )
}
