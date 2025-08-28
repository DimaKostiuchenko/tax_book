import React from 'react'

interface Task {
    id: string
    time: string
    type: string
    subject: string
    active?: boolean
}

interface TaskItemProps {
    task: Task
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    return (
        <div className="flex items-start space-x-4">
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
    )
}
