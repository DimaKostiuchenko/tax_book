import React from 'react'

interface TabItem {
    id: string
    label: string
    active?: boolean
}

interface CalendarTabsProps {
    tabs: TabItem[]
    onTabChange: (tabId: string) => void
}

export const CalendarTabs: React.FC<CalendarTabsProps> = ({ 
    tabs, 
    onTabChange 
}) => {
    return (
        <div className="flex h-16 space-x-6 p-6 border-b border-b-gray-200 items-center">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`transition-colors ${
                        tab.active 
                            ? 'text-teal-600' 
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    )
}
