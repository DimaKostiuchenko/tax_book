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
          icon: '💰',
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
        return 'text-yellow-300'
      case 'completed':
        return 'text-green-300'
      case 'overdue':
        return 'text-red-300'
      case 'upcoming':
        return 'text-blue-300'
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
      <div className="space-y-2">
        {views && (
          <div className="flex items-center gap-2 text-sm">
            <Eye className="w-4 h-4" />
            <span>{views.toLocaleString()} views</span>
          </div>
        )}
        {likes && (
          <div className="flex items-center gap-2 text-sm">
            <Heart className="w-4 h-4" />
            <span>{likes.toLocaleString()} likes</span>
          </div>
        )}
        {shares && (
          <div className="flex items-center gap-2 text-sm">
            <Share2 className="w-4 h-4" />
            <span>{shares} shares</span>
          </div>
        )}
      </div>
    </div>
  )
}
