import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, ArrowRight } from 'lucide-react'

interface Meeting {
  id: number
  name: string
  time: string
  avatar: string
}

interface MeetingsCardProps {
  meetings: Meeting[]
}

export function MeetingsCard({ meetings }: MeetingsCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Meetings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {meetings.map((meeting) => (
            <div key={meeting.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">
                    {meeting.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{meeting.name}</p>
                  <p className="text-sm text-gray-600">{meeting.time}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>
          ))}
        </div>
        
        <Button className="w-full" variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Add Meeting
        </Button>
      </CardContent>
    </Card>
  )
}


