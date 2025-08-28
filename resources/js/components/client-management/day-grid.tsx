import React from 'react'

interface DayGridProps {
    days: number[]
    selectedDay?: number
    onDaySelect: (day: number) => void
}

export const DayGrid: React.FC<DayGridProps> = ({ 
    days, 
    selectedDay, 
    onDaySelect 
}) => {
    return (
        <div className="grid grid-cols-30 gap-1 px-6 py-4 border-b border-b-gray-200">
            {days.map((day) => (
                <button
                    key={day}
                    onClick={() => onDaySelect(day)}
                    className={`flex items-center justify-center aspect-square font-medium transition-colors ${
                        day === selectedDay
                            ? 'bg-gray-200'
                            : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                    <span className="px-3 inline-block py-0">
                        {String(day).padStart(2, "0")}
                    </span>
                </button>
            ))}
        </div>
    )
}
