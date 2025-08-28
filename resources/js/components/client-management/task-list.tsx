import React from 'react'
import { TaskItem } from './task-item'

interface Task {
    id: string
    time: string
    type: string
    subject: string
    active?: boolean
}

interface TaskListProps {
    tasks: Task[]
    date: string
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, date }) => {
    return (
        <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{date}</h3>
            <div className="space-y-4">
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </div>
        </div>
    )
}
