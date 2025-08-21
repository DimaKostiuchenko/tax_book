import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { 
  Mail, 
  FileText, 
  Send, 
  Ban, 
  Trash2, 
  Users, 
  AlertCircle, 
  MoreHorizontal, 
  ShoppingCart, 
  Folder,
  Search,
  Archive,
  Clock,
  ArrowLeft,
  ArrowRight,
  MoreVertical
} from 'lucide-react'

interface InboxLayoutProps {
  children?: React.ReactNode
  className?: string
}

interface EmailItem {
  id: string
  sender: string
  subject: string
  preview: string
  timestamp: string
  tags: string[]
  isSelected?: boolean
  isRead?: boolean
}

interface EmailDetail {
  sender: string
  subject: string
  email: string
  timestamp: string
  content: string
  avatar: string
}

const navigationItems = [
  { icon: Mail, label: 'Inbox', active: true },
  { icon: FileText, label: 'Drafts' },
  { icon: Send, label: 'Sent' },
  { icon: Ban, label: 'Spam' },
  { icon: Trash2, label: 'Trash' },
  { icon: Users, label: 'Contacts' },
  { icon: AlertCircle, label: 'Important' },
  { icon: MoreHorizontal, label: 'More' },
  { icon: ShoppingCart, label: 'Purchases' },
  { icon: Folder, label: 'Categories' },
]

const sampleEmails: EmailItem[] = [
  {
    id: '1',
    sender: 'William Smith',
    subject: 'Meeting Tomorrow',
    preview: 'Hi, let\'s have a meeting tomorrow to discuss the project. I\'ve been reviewing the project details and have some...',
    timestamp: 'almost 2 years ago',
    tags: ['meeting', 'work', 'important'],
    isSelected: true,
  },
  {
    id: '2',
    sender: 'Alice Smith',
    subject: 'Re: Project Update',
    preview: 'Thank you for the project update. It looks great! I\'ve gone through the report, and the progress is impressiv...',
    timestamp: 'almost 2 years ago',
    tags: ['work', 'important'],
  },
  {
    id: '3',
    sender: 'Bob Johnson',
    subject: 'Weekend Plans',
    preview: 'Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It\'s been a while since...',
    timestamp: 'over 2 years ago',
    tags: ['personal'],
  },
]

const selectedEmail: EmailDetail = {
  sender: 'William Smith',
  subject: 'Meeting Tomorrow',
  email: 'williamsmith@example.com',
  timestamp: 'Oct 22, 2023, 9:00:00 AM',
  content: 'Hi, let\'s have a meeting tomorrow to discuss the project. I\'ve been reviewing the project details and have some ideas I\'d like to share. It\'s crucial that we align on our next steps to ensure the project\'s success. Please come prepared with any questions or insights you may have. Looking forward to our meeting!\n\nBest regards,\nWilliam',
  avatar: 'WS',
}

export function InboxLayout({ children, className }: InboxLayoutProps) {
  const [selectedEmailId, setSelectedEmailId] = useState('1')

  return (
    <div className={cn("h-screen bg-background flex flex-col", className)}>
      {/* Top Bar */}
      <div className="h-14 border-b bg-background flex items-center px-4 gap-4">
        {/* Logo */}
        <div className="w-8 h-8 bg-neutral-800 rounded flex items-center justify-center">
          <span className="text-white font-semibold text-sm">M</span>
        </div>
        
        {/* Title and Tabs */}
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">Inbox</h1>
          <div className="flex gap-1">
            <Button variant="default" size="sm" className="h-8 px-3 bg-purple-100 text-purple-700 hover:bg-purple-200">
              All mail
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-3">
              Unread
            </Button>
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2 ml-auto">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Archive className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Clock className="h-4 w-4" />
          </Button>
        </div>

        {/* Email Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Sidebar */}
        <div className="w-16 bg-background border-r flex flex-col items-center py-4 gap-2">
          {navigationItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className={cn(
                "h-10 w-10 p-0 rounded-lg",
                item.active && "bg-purple-100 text-purple-700"
              )}
              title={item.label}
            >
              <item.icon className="h-5 w-5" />
            </Button>
          ))}
        </div>

        {/* Middle Panel - Email List */}
        <div className="w-80 border-r flex flex-col">
          {/* Search */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search"
                className="pl-10"
              />
            </div>
          </div>

          {/* Email List */}
          <div className="flex-1 overflow-y-auto">
            {sampleEmails.map((email) => (
              <div
                key={email.id}
                className={cn(
                  "p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors",
                  email.isSelected && "bg-purple-50 border-purple-200"
                )}
                onClick={() => setSelectedEmailId(email.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="font-medium text-sm">{email.sender}</span>
                  <span className="text-xs text-muted-foreground">{email.timestamp}</span>
                </div>
                <h3 className="font-medium text-sm mb-1">{email.subject}</h3>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {email.preview}
                </p>
                <div className="flex flex-wrap gap-1">
                  {email.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className={cn(
                        "text-xs px-2 py-0.5",
                        tag === 'personal' ? "bg-gray-100 text-gray-700" : "bg-purple-100 text-purple-700"
                      )}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Email Detail */}
        <div className="flex-1 flex flex-col">
          {selectedEmail && (
            <>
              {/* Email Header */}
              <div className="p-6 border-b">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {selectedEmail.avatar}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">{selectedEmail.sender}</h2>
                      <p className="text-sm text-muted-foreground">{selectedEmail.subject}</p>
                      <p className="text-sm text-muted-foreground">
                        Reply-To: {selectedEmail.email}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {selectedEmail.timestamp}
                  </div>
                </div>
              </div>

              {/* Email Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-line leading-relaxed">
                    {selectedEmail.content}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
