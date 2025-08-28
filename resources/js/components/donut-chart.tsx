import React, { useEffect, useRef, useCallback, useMemo } from 'react'

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

// Helper function to calculate total
const calculateTotal = (data: ChartData[]): number => {
    return data.reduce((sum, item) => sum + item.value, 0)
}

// Helper function to draw chart slice
const drawChartSlice = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number,
    innerRadius: number,
    startAngle: number,
    endAngle: number,
    color: string
): void => {
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, startAngle, endAngle)
    ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true)
    ctx.closePath()
    ctx.fillStyle = color
    ctx.fill()
}

// Helper function to draw center text
const drawCenterText = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    title: string,
    total: number
): void => {
    // Draw center circle (donut hole)
    ctx.beginPath()
    ctx.arc(centerX, centerY, centerX * 0.6, 0, 2 * Math.PI)
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
}

// Extracted Legend component
const ChartLegend = React.memo(({ data }: { data: ChartData[] }) => {
    const total = useMemo(() => calculateTotal(data), [data])
    
    return (
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
                    <span className="text-sm font-medium text-gray-900">
                        {Math.round((item.value / total) * 100)}%
                    </span>
                </div>
            ))}
        </div>
    )
})

export const DonutChart: React.FC<DonutChartProps> = React.memo(({
    data,
    title = 'Today',
    className = ''
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const total = useMemo(() => calculateTotal(data), [data])

    const drawChart = useCallback(() => {
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
            const endAngle = currentAngle + sliceAngle

            drawChartSlice(ctx, centerX, centerY, radius, innerRadius, currentAngle, endAngle, item.color)
            currentAngle = endAngle
        })

        drawCenterText(ctx, centerX, centerY, title, total)
    }, [data, title, total])

    useEffect(() => {
        drawChart()
    }, [drawChart])

    return (
        <div className={`space-y-4 ${className}`}>
            <div className="text-center">
                <canvas
                    ref={canvasRef}
                    className="w-full h-48 mx-auto"
                    style={{maxWidth: '200px'}}
                />
            </div>

            <ChartLegend data={data} />
        </div>
    )
})
