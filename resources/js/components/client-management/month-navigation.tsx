import React from 'react'

interface MonthNavigationProps {
    year: string
    months: string[]
    selectedMonth?: string
    onMonthSelect: (month: string) => void
}

export const MonthNavigation: React.FC<MonthNavigationProps> = ({ 
    year, 
    months, 
    selectedMonth, 
    onMonthSelect 
}) => {
    return (
        <div className="flex items-center h-16 border-b border-b-gray-200 px-6">
            <div className="flex items-center space-x-3 border-r border-r-slate-200 pr-6">
                <span>{year}</span>
            </div>

            <div className="flex space-x-2 pl-6">
                {months.map((month) => (
                    <button
                        key={month}
                        onClick={() => onMonthSelect(month)}
                        className={`px-4 py-1 rounded-sm font-medium transition-colors ${
                            month === selectedMonth
                                ? 'bg-teal-500 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        {month}
                    </button>
                ))}
            </div>
        </div>
    )
}
