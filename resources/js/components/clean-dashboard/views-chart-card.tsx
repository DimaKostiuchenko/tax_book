import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Grid, ArrowRight } from 'lucide-react'

interface ViewsChartCardProps {
  totalViews: string
  chartData: { month: string; value: number }[]
}

export function ViewsChartCard({ totalViews, chartData }: ViewsChartCardProps) {
  const maxValue = Math.max(...chartData.map(d => d.value))
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Views</CardTitle>
        <p className="text-2xl font-bold text-gray-900">{totalViews}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Simple Chart */}
        <div className="h-32 flex items-end justify-between gap-2">
          {chartData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-blue-500 rounded-t-sm transition-all duration-300 hover:bg-blue-600"
                style={{ 
                  height: `${(data.value / maxValue) * 100}%`,
                  minHeight: '8px'
                }}
              ></div>
              <span className="text-xs text-gray-500 mt-1">{data.month}</span>
            </div>
          ))}
        </div>
        
        <Button className="w-full" variant="outline">
          <Grid className="w-4 h-4 mr-2" />
          View Dashboard
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
}


