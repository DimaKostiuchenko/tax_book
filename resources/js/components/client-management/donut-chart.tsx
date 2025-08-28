import React, { useEffect, useRef } from 'react'

interface ChartData {
    label: string
    value: number
    color: string
}

interface DonutChartProps {
    data: ChartData[]
    title?: string
    className?: string
}

export const DonutChart: React.FC<DonutChartProps> = ({ 
    data, 
    title = 'Today',
    className = ''
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Set canvas size with DPI scaling
        const dpr = window.devicePixelRatio || 1
        const rect = canvas.getBoundingClientRect()

        canvas.width = rect.width * dpr
        canvas.height = rect.height * dpr
        canvas.style.width = rect.width + 'px'
        canvas.style.height = rect.height + 'px'

        ctx.scale(dpr, dpr)

        const total = data.reduce((sum, item) => sum + item.value, 0)

        // Chart dimensions
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const radius = Math.min(centerX, centerY) - 20
        const innerRadius = radius * 0.6 // Donut hole
        const startAngle = -Math.PI / 2 // Start from top

        // Draw donut chart
        let currentAngle = startAngle

        data.forEach((item) => {
            const sliceAngle = (item.value / total) * 2 * Math.PI

            // Draw outer arc
            ctx.beginPath()
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
            ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true)
            ctx.closePath()

            // Fill with color
            ctx.fillStyle = item.color
            ctx.fill()

            // Add subtle shadow
            ctx.shadowColor = 'rgba(0, 0, 0, 0.1)'
            ctx.shadowBlur = 4
            ctx.shadowOffsetX = 2
            ctx.shadowOffsetY = 2
            ctx.fill()

            // Reset shadow
            ctx.shadowColor = 'transparent'
            ctx.shadowBlur = 0
            ctx.shadowOffsetX = 0
            ctx.shadowOffsetY = 0

            currentAngle += sliceAngle
        })

        // Draw center circle (donut hole)
        ctx.beginPath()
        ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI)
        ctx.fillStyle = '#ffffff'
        ctx.fill()

        // Add center text
        ctx.fillStyle = '#374151'
        ctx.font = 'bold 16px Roboto'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(title, centerX, centerY - 10)

        ctx.fillStyle = '#6b7280'
        ctx.font = '12px Roboto'
        ctx.fillText(`${total}%`, centerX, centerY + 10)
    }, [data, title])

    return (
        <div className={`space-y-4 ${className}`}>
            <div className="text-center">
                <canvas
                    ref={canvasRef}
                    className="w-full h-48 mx-auto"
                    style={{ maxWidth: '200px' }}
                />
            </div>

            {/* Legend */}
            <div className="space-y-2">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="text-sm text-gray-600">{item.label}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{item.value}%</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
