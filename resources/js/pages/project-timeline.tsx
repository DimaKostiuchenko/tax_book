import React, { useEffect, useRef } from 'react'
import {
    Grid,
    Users,
    Folder,
    FileText,
    MessageCircle,
    Settings,
    Headphones,
    Search,
    Bell,
    MoreHorizontal,
    ChevronDown,
    Filter,
    Plus,
    Calendar,
    List,
    Table
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Dark theme styles
const darkTheme = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontStyle: 'normal',
}

interface Task {
    id: string
    title: string
    description: string
    startDate: string
    endDate: string
    color: string
    assignees: string[]
    status: 'in-progress' | 'completed' | 'pending'
}

export default function ProjectTimeline() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const tasks: Task[] = [
        {
            id: '1',
            title: 'UI Prototyping',
            description: 'Develop interactive prototypes based on HiFi',
            startDate: '2025-01-06',
            endDate: '2025-01-15',
            color: '#ef4444', // Red
            assignees: ['JD', 'MK'],
            status: 'in-progress'
        },
        {
            id: '2',
            title: 'UI Wireframing',
            description: 'Create wireframes for the crypto app UI.',
            startDate: '2025-01-08',
            endDate: '2025-01-15',
            color: '#10b981', // Green
            assignees: ['AB', 'CD'],
            status: 'in-progress'
        },
        {
            id: '3',
            title: 'Icon Design',
            description: 'Design icons for app features.',
            startDate: '2025-01-09',
            endDate: '2025-01-15',
            color: '#f59e0b', // Yellow
            assignees: ['EF'],
            status: 'in-progress'
        },
        {
            id: '4',
            title: 'User Testing',
            description: 'Conduct usability testing with target users to gather feedback and iterate on designs.',
            startDate: '2025-01-11',
            endDate: '2025-01-14',
            color: '#ef4444', // Red
            assignees: ['GH', 'IJ'],
            status: 'pending'
        },
        {
            id: '5',
            title: 'Home Screen UI',
            description: 'Design the home screen UI layout.',
            startDate: '2025-01-11',
            endDate: '2025-01-15',
            color: '#f59e0b', // Yellow
            assignees: ['KL'],
            status: 'pending'
        },
        {
            id: '6',
            title: 'Settings Page',
            description: 'Design UI for the settings page.',
            startDate: '2025-01-15',
            endDate: '2025-01-19',
            color: '#8b5cf6', // Purple
            assignees: ['MN'],
            status: 'pending'
        },
        {
            id: '7',
            title: 'Transaction Page',
            description: 'Design UI for the transaction page.',
            startDate: '2025-01-18',
            endDate: '2025-01-22',
            color: '#f59e0b', // Yellow
            assignees: ['OP'],
            status: 'pending'
        },
        {
            id: '8',
            title: 'Portfolio Page',
            description: 'Design UI for the portfolio page.',
            startDate: '2025-01-18',
            endDate: '2025-01-20',
            color: '#8b5cf6', // Purple
            assignees: ['QR'],
            status: 'pending'
        }
    ]

    const dates = [
        { day: 'Wed', date: '06' },
        { day: 'Thu', date: '07' },
        { day: 'Fri', date: '08' },
        { day: 'Sat', date: '09' },
        { day: 'Sun', date: '10' },
        { day: 'Mon', date: '11', current: true },
        { day: 'Tue', date: '12' },
        { day: 'Wed', date: '13' },
        { day: 'Thu', date: '14' },
        { day: 'Fri', date: '15' },
        { day: 'Sat', date: '16' },
        { day: 'Sun', date: '17' },
        { day: 'Mon', date: '18' },
        { day: 'Tue', date: '19' },
        { day: 'Wed', date: '20' }
    ]

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Set canvas size
        const dpr = window.devicePixelRatio || 1
        const rect = canvas.getBoundingClientRect()
        
        canvas.width = rect.width * dpr
        canvas.height = rect.height * dpr
        canvas.style.width = rect.width + 'px'
        canvas.style.height = rect.height + 'px'
        
        ctx.scale(dpr, dpr)

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw timeline
        drawTimeline(ctx, rect.width, rect.height)
    }, [])

    const drawTimeline = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        const headerHeight = 60
        const rowHeight = 80
        const dateWidth = width / dates.length
        const currentDateIndex = dates.findIndex(d => d.current) || 5

        // Draw date headers
        ctx.fillStyle = '#1f2937'
        ctx.fillRect(0, 0, width, headerHeight)

        dates.forEach((date, index) => {
            const x = index * dateWidth
            
            // Draw date text
            ctx.fillStyle = date.current ? '#8b5cf6' : '#9ca3af'
            ctx.font = '12px Inter'
            ctx.textAlign = 'center'
            ctx.fillText(date.day, x + dateWidth / 2, 20)
            ctx.fillText(date.date, x + dateWidth / 2, 35)

            // Draw current date indicator
            if (date.current) {
                ctx.strokeStyle = '#8b5cf6'
                ctx.lineWidth = 2
                ctx.beginPath()
                ctx.moveTo(x + dateWidth / 2, headerHeight)
                ctx.lineTo(x + dateWidth / 2, height)
                ctx.stroke()
            }

            // Draw vertical grid lines
            ctx.strokeStyle = '#374151'
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(x, 0)
            ctx.lineTo(x, height)
            ctx.stroke()
        })

        // Draw task bars
        tasks.forEach((task, taskIndex) => {
            const y = headerHeight + taskIndex * rowHeight + 10
            const startIndex = dates.findIndex(d => d.date === task.startDate.split('-')[2])
            const endIndex = dates.findIndex(d => d.date === task.endDate.split('-')[2])
            
            if (startIndex === -1 || endIndex === -1) return

            const startX = startIndex * dateWidth + 10
            const endX = (endIndex + 1) * dateWidth - 10
            const barWidth = endX - startX
            const barHeight = 40

            // Draw task bar
            ctx.fillStyle = task.color
            ctx.beginPath()
            ctx.roundRect(startX, y, barWidth, barHeight, 8)
            ctx.fill()

            // Draw color indicator
            ctx.fillStyle = task.color
            ctx.fillRect(startX - 5, y, 3, barHeight)

            // Draw task title
            ctx.fillStyle = '#ffffff'
            ctx.font = 'bold 14px Inter'
            ctx.textAlign = 'left'
            ctx.fillText(task.title, startX + 10, y + 15)

            // Draw task description
            ctx.fillStyle = '#9ca3af'
            ctx.font = '12px Inter'
            ctx.fillText(task.description, startX + 10, y + 30)

            // Draw assignee avatars
            task.assignees.forEach((assignee, assigneeIndex) => {
                const avatarX = startX + barWidth - 60 - assigneeIndex * 25
                const avatarY = y + 8
                
                // Avatar background
                ctx.fillStyle = '#4b5563'
                ctx.beginPath()
                ctx.arc(avatarX + 10, avatarY + 10, 10, 0, 2 * Math.PI)
                ctx.fill()

                // Avatar text
                ctx.fillStyle = '#ffffff'
                ctx.font = 'bold 10px Inter'
                ctx.textAlign = 'center'
                ctx.fillText(assignee, avatarX + 10, avatarY + 14)
            })
        })
    }

    return (
        <>
            {/* Google Fonts - Inter */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

            <div className="min-h-screen bg-gray-900 flex" style={darkTheme}>
                {/* Left Sidebar */}
                <aside className="w-16 bg-gray-800 flex flex-col items-center py-6 space-y-6">
                    {/* Logo */}
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                        <div className="w-6 h-6 bg-white rounded-sm"></div>
                    </div>

                    {/* Navigation Icons */}
                    <nav className="flex flex-col space-y-4">
                        <button className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                            <Grid className="w-5 h-5" />
                        </button>
                        <button className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                            <Users className="w-5 h-5" />
                        </button>
                        <button className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                            <Folder className="w-5 h-5" />
                        </button>
                        <button className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                            <FileText className="w-5 h-5" />
                        </button>
                        <button className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                            <MessageCircle className="w-5 h-5" />
                        </button>
                        <button className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                            <Settings className="w-5 h-5" />
                        </button>
                        <button className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                            <Headphones className="w-5 h-5" />
                        </button>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col">
                    {/* Top Header */}
                    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
                        <div className="flex items-center justify-between">
                            {/* Breadcrumbs */}
                            <div className="flex items-center space-x-2 text-gray-300">
                                <span>Project Management</span>
                                <span>/</span>
                                <span>Project</span>
                                <span>/</span>
                                <span className="text-white font-medium">Crypto - Mobile App</span>
                            </div>

                            {/* Right side controls */}
                            <div className="flex items-center space-x-4">
                                {/* Search */}
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-purple-500"
                                    />
                                </div>

                                {/* Notifications */}
                                <button className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                                    <Bell className="w-4 h-4" />
                                </button>

                                {/* Messages */}
                                <button className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                                    <MessageCircle className="w-4 h-4" />
                                </button>

                                {/* User Avatar */}
                                <div className="relative">
                                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                                        JD
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Project Header */}
                    <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-white">Crypto - Mobile App</h1>
                            <div className="flex items-center space-x-3">
                                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                                    Export
                                </Button>
                                <Button variant="ghost" size="icon" className="text-gray-300 hover:bg-gray-700">
                                    <MoreHorizontal className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* View Navigation */}
                    <div className="bg-gray-800 px-6 py-3 border-b border-gray-700">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-6">
                                <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                                    <Grid className="w-4 h-4" />
                                    <span>Board</span>
                                </button>
                                <button className="flex items-center space-x-2 text-purple-400 border-b-2 border-purple-400 pb-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>Timeline</span>
                                </button>
                                <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                                    <List className="w-4 h-4" />
                                    <span>List</span>
                                </button>
                                <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                                    <Table className="w-4 h-4" />
                                    <span>Table</span>
                                </button>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                                    <ChevronDown className="w-4 h-4 mr-2" />
                                    Sort
                                </Button>
                                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                                    <Filter className="w-4 h-4 mr-2" />
                                    More filters
                                </Button>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Task
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Timeline Chart */}
                    <div className="flex-1 p-6">
                        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                            <canvas
                                ref={canvasRef}
                                className="w-full h-full"
                                style={{ minHeight: '600px' }}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
