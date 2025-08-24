import { Filter, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TaxEventCard } from './tax-event-card'

export function TaxEventsWidget() {
  const taxEvents = [
    {
      platform: 'payment' as const,
      title: 'VAT Payment Q1',
      date: '15.01.2024',
      time: '2:30 PM',
      views: 8040,
      likes: 1735,
      status: 'pending' as const
    },
    {
      platform: 'report' as const,
      title: 'Income Tax Report',
      date: '20.01.2024',
      time: '4:25 PM',
      views: 13250,
      likes: 1994,
      shares: 99,
      status: 'upcoming' as const
    },
    {
      platform: 'deadline' as const,
      title: 'Annual Declaration',
      date: '31.01.2024',
      time: '3:40 PM',
      views: 10347,
      likes: 1200,
      shares: 45,
      status: 'overdue' as const
    },
    {
      platform: 'reminder' as const,
      title: 'Tax Calendar Update',
      date: '05.02.2024',
      time: '1:15 PM',
      views: 5678,
      likes: 890,
      status: 'completed' as const
    },
    {
      platform: 'payment' as const,
      title: 'Social Security Payment',
      date: '10.02.2024',
      time: '9:45 AM',
      views: 7234,
      likes: 1456,
      status: 'pending' as const
    },
    {
      platform: 'report' as const,
      title: 'Quarterly VAT Report',
      date: '15.02.2024',
      time: '11:20 AM',
      views: 9876,
      likes: 2100,
      shares: 67,
      status: 'upcoming' as const
    },
    {
      platform: 'deadline' as const,
      title: 'Property Tax Deadline',
      date: '25.02.2024',
      time: '5:30 PM',
      views: 6543,
      likes: 987,
      status: 'overdue' as const
    },
    {
      platform: 'reminder' as const,
      title: 'Tax Audit Preparation',
      date: '01.03.2024',
      time: '8:00 AM',
      views: 4567,
      likes: 678,
      shares: 23,
      status: 'completed' as const
    }
  ]

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg">
      {/* Header with Title and Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tax Events</h2>
          <p className="text-gray-600 mt-1">Manage your tax-related activities and deadlines</p>
        </div>
        
        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Search events..." 
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {taxEvents.map((event, index) => (
          <TaxEventCard
            key={index}
            platform={event.platform}
            title={event.title}
            date={event.date}
            time={event.time}
            views={event.views}
            likes={event.likes}
            shares={event.shares}
            status={event.status}
          />
        ))}
      </div>
    </div>
  )
}
