import { Card, CardContent } from '@/components/ui/card'

interface WelcomeCardProps {
  userName: string
}

export function WelcomeCard({ userName }: WelcomeCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Hi {userName}, Welcome back!
            </h2>
            <p className="text-gray-600 mt-2">
              This page is designed to give some important information about the application. Let's make something together!
            </p>
          </div>
          
          {/* Illustration */}
          <div className="flex items-center justify-center mt-6">
            <div className="relative w-48 h-32">
              {/* Person */}
              <div className="absolute left-4 top-8 w-8 h-12 bg-blue-500 rounded-full"></div>
              <div className="absolute left-6 top-6 w-4 h-4 bg-purple-500 rounded-full"></div>
              
              {/* Laptop */}
              <div className="absolute left-8 top-16 w-6 h-4 bg-gray-300 rounded-sm"></div>
              
              {/* Whiteboard */}
              <div className="absolute right-8 top-4 w-16 h-12 bg-white border-2 border-gray-300 rounded-sm">
                <div className="absolute top-1 left-1 w-3 h-2 bg-blue-400 rounded-sm"></div>
                <div className="absolute top-4 left-1 w-2 h-2 bg-green-400 rounded-sm"></div>
                <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-sm"></div>
              </div>
              
              {/* Plant */}
              <div className="absolute bottom-2 left-2 w-2 h-3 bg-green-600 rounded-full"></div>
              <div className="absolute bottom-1 left-1 w-1 h-1 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


