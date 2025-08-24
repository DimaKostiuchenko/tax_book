import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'

interface CongratulationsCardProps {
  userName: string
  progress: number
}

export function CongratulationsCard({ userName, progress }: CongratulationsCardProps) {
  return (
    <Card className="h-full bg-blue-600 text-white">
      <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <Star className="w-6 h-6 text-white" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-bold">
            Congratulations {userName}
          </h3>
          <p className="text-blue-100">
            You have completed {progress}% of your profile. Your current progress is great.
          </p>
        </div>
        
        <Button variant="secondary" className="mt-4">
          View Profile
        </Button>
      </CardContent>
    </Card>
  )
}


