import { ExternalLink, Eye, Heart, Share2 } from 'lucide-react'

interface TaxEventCardProps {
  platform: 'payment' | 'report' | 'deadline' | 'reminder'
  title: string
  date: string
  time: string
  views?: number
  likes?: number
  shares?: number
  status: 'pending' | 'completed' | 'overdue' | 'upcoming'
}

export function TaxEventCard({
  platform,
  title,
  date,
  time,
  views,
  likes,
  shares,
  status
}: TaxEventCardProps) {
  const getPlatformConfig = () => {
    switch (platform) {
      case 'payment':
        return {
          name: 'Payment',
          bgColor: 'bg-orange-500',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">\n' +
              '    <ellipse cx="15.5" cy="11" rx="6.5" ry="2" stroke="#141B34" stroke-width="1.5" />\n' +
              '    <path d="M22 15.5C22 16.6046 19.0899 17.5 15.5 17.5C11.9101 17.5 9 16.6046 9 15.5" stroke="#141B34" stroke-width="1.5" />\n' +
              '    <path d="M22 11V19.8C22 21.015 19.0899 22 15.5 22C11.9101 22 9 21.015 9 19.8V11" stroke="#141B34" stroke-width="1.5" />\n' +
              '    <ellipse cx="8.5" cy="4" rx="6.5" ry="2" stroke="#141B34" stroke-width="1.5" />\n' +
              '    <path d="M6 11C4.10819 10.7698 2.36991 10.1745 2 9M6 16C4.10819 15.7698 2.36991 15.1745 2 14" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" />\n' +
              '    <path d="M6 21C4.10819 20.7698 2.36991 20.1745 2 19L2 4" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" />\n' +
              '    <path d="M15 6V4" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" />\n' +
              '</svg>',
          badgeColor: 'bg-orange-100 text-orange-800'
        }
      case 'report':
        return {
          name: 'Report',
          bgColor: 'bg-purple-600',
          icon: '📊',
          badgeColor: 'bg-purple-100 text-purple-800'
        }
      case 'deadline':
        return {
          name: 'Deadline',
          bgColor: 'bg-red-600',
          icon: '⏰',
          badgeColor: 'bg-red-100 text-red-800'
        }
      case 'reminder':
        return {
          name: 'Reminder',
          bgColor: 'bg-blue-600',
          icon: '🔔',
          badgeColor: 'bg-blue-100 text-blue-800'
        }
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return 'text-yellow-200'
      case 'completed':
        return 'text-green-200'
      case 'overdue':
        return 'text-red-200'
      case 'upcoming':
        return 'text-blue-200'
    }
  }

  const config = getPlatformConfig()

  return (
    <div className={`${config.bgColor} rounded-xl p-4 text-white relative overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer`}>
      {/* Background Icon */}
      <div className={`absolute bottom-2 right-2 text-6xl opacity-20 ${getStatusColor()}`}>
        {config.icon}
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.badgeColor}`}>
          {config.name}
        </span>
        <ExternalLink className="w-4 h-4 opacity-70" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold mb-2">{title}</h3>

      {/* Date & Time */}
      <p className="text-sm opacity-90 mb-4">{date} {time}</p>

      {/* Statistics */}
      {/*<div className="space-y-2">*/}
      {/*  {views && (*/}
      {/*    <div className="flex items-center gap-2 text-sm">*/}
      {/*      <Eye className="w-4 h-4" />*/}
      {/*      <span>{views.toLocaleString()} views</span>*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*  {likes && (*/}
      {/*    <div className="flex items-center gap-2 text-sm">*/}
      {/*      <Heart className="w-4 h-4" />*/}
      {/*      <span>{likes.toLocaleString()} likes</span>*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*  {shares && (*/}
      {/*    <div className="flex items-center gap-2 text-sm">*/}
      {/*      <Share2 className="w-4 h-4" />*/}
      {/*      <span>{shares} shares</span>*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*</div>*/}
    </div>
  )
}
