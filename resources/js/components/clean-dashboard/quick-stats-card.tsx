import { Card, CardContent } from '@/components/ui/card'
import { ThumbsUp, Heart, Smile, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react'

interface StatItem {
  icon: React.ComponentType<{ className?: string }>
  value: string
  label: string
  trend: 'up' | 'down' | 'neutral'
  color: string
}

interface QuickStatsCardProps {
  stats: StatItem[]
}

export function QuickStatsCard({ stats }: QuickStatsCardProps) {
  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3 text-green-500" />
      case 'down':
        return <TrendingDown className="w-3 h-3 text-red-500" />
      case 'neutral':
        return <ArrowRight className="w-3 h-3 text-gray-400" />
    }
  }

  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <div className="space-y-3">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
              {getTrendIcon(stat.trend)}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


