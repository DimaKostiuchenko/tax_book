import React from 'react'
import { ArrowLeft, MoreVertical, Play, ChevronLeft, ChevronRight, Settings, Bell, User, Archive, Database, GitBranch, Grid } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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

export default function ClientManagement() {
  const navItems: NavItem[] = [
    { icon: <Grid className="w-5 h-5" />, label: "Панель керування" },
    { icon: <User className="w-5 h-5" />, label: "Клієнти", active: true },
    { icon: <GitBranch className="w-5 h-5" />, label: "Робочі процеси" },
    { icon: <Database className="w-5 h-5" />, label: "Шаблони" },
    { icon: <Settings className="w-5 h-5" />, label: "Налаштування" },
    { icon: <Archive className="w-5 h-5" />, label: "Архів" },
    { icon: <Bell className="w-5 h-5" />, label: "Сповіщення" },
    { icon: <User className="w-5 h-5" />, label: "Обліковий запис" },
  ]

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const days = Array.from({ length: 31 }, (_, i) => i + 1)

  const tasks = [
    { time: "09:23", type: "Головне завдання", subject: "Accounts and tax", active: true },
    { time: "10:20", type: "Допоміжне завдання", subject: "Business plans" },
    { time: "11:35", type: "Додаткове завдання", subject: "Risk analysis" },
    { time: "12:00", type: "Щоденне завдання", subject: "Preparing budget forecasts" },
  ]

  return (
    <>
      {/* Google Fonts - Roboto */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
      
      <div className="min-h-screen bg-gray-50 flex" style={robotoFont}>
      {/* Left Sidebar - Navigation */}
      <aside className="w-64 bg-white shadow-sm border-r border-gray-200">
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold text-teal-600">Retasks</span>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-2">
            {navItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  item.active 
                    ? 'bg-teal-50 text-teal-600 border border-teal-200' 
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
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Іван Петренко</h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Tabs */}
              <div className="flex space-x-6">
                <button className="text-gray-500 hover:text-gray-700">Інформація</button>
                <button className="text-teal-600 border-b-2 border-teal-600 pb-1">Часові рамки</button>
                <button className="text-gray-500 hover:text-gray-700">Нотатки</button>
                <button className="text-gray-500 hover:text-gray-700">Інтеграції</button>
                <button className="text-gray-500 hover:text-gray-700">Бюджет</button>
              </div>

              {/* Time Tracking */}
              <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-lg">
                <span className="text-sm font-medium text-gray-700">00:12:32</span>
                <Button size="icon" className="w-8 h-8 bg-teal-500 hover:bg-teal-600">
                  <Play className="w-4 h-4 text-white" />
                </Button>
              </div>

              <Button variant="ghost" size="icon">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Timeline Content */}
        <div className="flex-1 p-6">
          {/* Sub-tabs */}
          <div className="flex space-x-6 mb-6">
            <button className="text-teal-600 border-b-2 border-teal-600 pb-1">Календар</button>
            <button className="text-gray-500 hover:text-gray-700">Часові рамки</button>
          </div>

          {/* Year/Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-lg font-semibold">2020</span>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex space-x-1">
                {months.map((month, index) => (
                  <button
                    key={month}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
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

            <Button variant="outline" size="sm">
              Читати все
            </Button>
          </div>

          {/* Day Grid */}
          <div className="flex space-x-1 mb-6">
            {days.slice(20, 30).map((day) => (
              <button
                key={day}
                className={`w-10 h-10 rounded-md text-sm font-medium transition-colors ${
                  day === 23 
                    ? 'bg-teal-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Daily Task List */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Понеділок 23-го</h3>
            
            <div className="space-y-4">
              {tasks.map((task, index) => (
                <div key={index} className="flex items-start space-x-4">
                  {/* Timeline */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className={`w-3 h-3 rounded-full ${
                      task.active ? 'bg-blue-500' : 'bg-gray-300'
                    }`} />
                    <span className="text-xs text-gray-500">{task.time}</span>
                  </div>

                  {/* Task Card */}
                  <div className={`flex-1 p-4 rounded-lg border ${
                    task.active ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">
                            {task.time} - {task.type}
                          </span>
                          {task.active && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
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
      </main>

      {/* Right Sidebar */}
      <aside className="w-80 bg-white shadow-sm border-l border-gray-200 p-6">
        <div className="space-y-6">
          {/* Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Статус</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start bg-teal-50 border-teal-200 text-teal-700 hover:bg-teal-100"
              >
                <span className="w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">
                  А
                </span>
                Активний
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <span className="text-gray-500 mr-2">*</span>
                Заморожений
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Archive className="w-4 h-4 mr-2" />
                Архів
              </Button>
            </CardContent>
          </Card>

          {/* Services Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Послуги</CardTitle>
              <Settings className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                Обробка
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Бухгалтерія
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Аналіз даних
              </Button>
            </CardContent>
          </Card>

          {/* Additional Sections */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
              <span className="font-medium">Липень 2021 Спринт</span>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
              <span className="font-medium">Шаблон бухгалтерії</span>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
              <span className="font-medium">Робочий процес податків</span>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>
      </aside>
    </div>
    </>
  )
}
