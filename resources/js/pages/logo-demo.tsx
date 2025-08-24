import { AppLogo } from '@/components/app-logo'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function LogoDemo() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Logo Component Demo</h1>

        {/* Different Sizes */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Logo Sizes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <AppLogo size="sm" />
                <span className="text-sm text-muted-foreground">Small (16px)</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <AppLogo size="md" />
                <span className="text-sm text-muted-foreground">Medium (24px)</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <AppLogo size="lg" />
                <span className="text-sm text-muted-foreground">Large (32px)</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <AppLogo size="xl" />
                <span className="text-sm text-muted-foreground">Extra Large (48px)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Header Examples */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Header Examples</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <AppLogo size="lg" />
              <h2 className="text-xl font-semibold">Tax Events Dashboard</h2>
            </div>
            
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <AppLogo size="md" />
              <h3 className="text-lg font-medium">Application Name</h3>
            </div>
            
            <div className="flex items-center gap-2 p-4 border rounded-lg">
              <AppLogo size="sm" />
              <span className="text-sm">Compact Header</span>
            </div>
          </CardContent>
        </Card>

        {/* Custom Styling */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Custom Styling</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <AppLogo size="md" className="text-blue-600" />
                </div>
                <span className="text-sm text-muted-foreground">Blue Theme</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <AppLogo size="md" className="text-purple-600" />
                </div>
                <span className="text-sm text-muted-foreground">Purple Theme</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <AppLogo size="md" className="text-green-600" />
                </div>
                <span className="text-sm text-muted-foreground">Green Theme</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <AppLogo size="md" className="text-gray-600" />
                </div>
                <span className="text-sm text-muted-foreground">Gray Theme</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Usage Examples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Basic Usage:</h4>
                <pre className="bg-muted p-3 rounded text-sm">
{`import { AppLogo } from '@/components/app-logo'

<AppLogo /> // Default medium size
<AppLogo size="lg" /> // Large size
<AppLogo className="text-blue-600" /> // Custom styling`}
                </pre>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Available Props:</h4>
                <ul className="space-y-1 text-sm">
                  <li><strong>size:</strong> 'sm' | 'md' | 'lg' | 'xl' (default: 'md')</li>
                  <li><strong>className:</strong> Additional CSS classes</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


