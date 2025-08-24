import React from 'react';

const GanttChart = () => {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const types = ['Type 1', 'Type 2', 'Type 3', 'Type 4'];

    const bars = [
        { type: 'Type 1', startMonth: 0, duration: 20, label: 'Bar 1' },
        { type: 'Type 1', startMonth: 4, duration: 50, label: 'Bar 2' },
        { type: 'Type 2', startMonth: 1, duration: 20, label: 'Bar 3' },
        { type: 'Type 2', startMonth: 6, duration: 50, label: 'Bar 4' },
        { type: 'Type 2', startMonth: 9, duration: 20, label: 'Bar 5' },
        { type: 'Type 3', startMonth: 2, duration: 20, label: 'Bar 6' },
        { type: 'Type 3', startMonth: 5, duration: 50, label: 'Bar 7' },
        { type: 'Type 4', startMonth: 7, duration: 20, label: 'Bar 8' },
        { type: 'Type 4', startMonth: 10, duration: 50, label: 'Bar 9' },
        { type: 'Type 4', startMonth: 11, duration: 20, label: 'Bar 10' },
        
    ];

    const monthWidth = 100 / months.length;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">📅 Gantt Chart</h1>

            <div className="border border-gray-300 bg-white rounded-lg overflow-x-auto">
                {/* Header */}
                <div className="flex">
                    <div className="w-24 bg-gray-300 text-center font-semibold">Type</div>
                    <div className="flex-1 relative h-10 bg-gray-200 grid grid-cols-12 text-sm font-semibold text-center">
                        {months.map((month, idx) => (
                            <div key={idx} className="border-l border-gray-400">{month}</div>
                        ))}
                        {/* Vertical lines */}
                        {months.map((_, idx) => (
                            <div
                                key={`line-${idx}`}
                                className="absolute top-0 bottom-0 border-l border-gray-400"
                                style={{ left: `${monthWidth * idx}%` }}
                            />
                        ))}
                    </div>
                </div>

                {/* Rows */}
                <div className="space-y-2 mt-2">
                    {types.map((type, typeIdx) => (
                        <div key={typeIdx} className="flex items-center">
                            <div className="w-24 text-sm font-medium text-gray-700">{type}</div>
                            <div className="flex-1 relative h-10 bg-gray-50">
                                {bars
                                    .filter(bar => bar.type === type)
                                    .map((bar, barIdx) => {
                                        const left = monthWidth * bar.startMonth;
                                        const width = bar.duration <= 20 ? monthWidth * 0.6 : monthWidth * 1.2;
                                        const color = [
                                            'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500'
                                        ][typeIdx % 4];

                                        return (
                                            <div
                                                key={barIdx}
                                                className={`absolute h-6 text-xs text-white text-center rounded ${color}`}
                                                style={{
                                                    left: `${left}%`,
                                                    width: `${width}%`,
                                                    top: `${barIdx * 8}px`
                                                }}
                                            >
                                                {bar.label}
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GanttChart;
