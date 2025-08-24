import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface TargetItem {
  name: string
  progress: number
  color: string
}

interface TargetsCardProps {
  targets: TargetItem[]
}

export function TargetsCard({ targets }: TargetsCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Targets</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {targets.map((target, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">{target.name}</span>
              <span className="text-sm text-gray-500">{target.progress}%</span>
            </div>
            <Progress 
              value={target.progress} 
              className={`h-2 ${target.color}`}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}


