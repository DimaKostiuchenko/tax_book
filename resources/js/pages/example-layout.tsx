import { ExampleLayout } from '@/components/app-example-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function ExampleLayoutPage() {
  return (
    <ExampleLayout 
      title="Example Layout" 
      description="A modern layout pattern with sidebar navigation and content area"
    >
      <div className="space-y-6">
        {/* Overview Section */}
        <section id="overview">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Overview
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            This layout provides a modern, responsive design pattern commonly used in documentation sites and web applications. 
            It features a sticky header, sidebar navigation, main content area, and table of contents.
          </p>
        </section>

        <Separator />

        {/* Features Section */}
        <section id="features">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Features
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="secondary">Responsive</Badge>
                </CardTitle>
                <CardDescription>
                  Adapts to different screen sizes with mobile-first design
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  The layout automatically adjusts from mobile to desktop with proper breakpoints and navigation patterns.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="secondary">Sticky Navigation</Badge>
                </CardTitle>
                <CardDescription>
                  Header and sidebar remain accessible while scrolling
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  The header stays at the top and sidebar remains visible for easy navigation throughout the content.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="secondary">Table of Contents</Badge>
                </CardTitle>
                <CardDescription>
                  Automatic navigation for page sections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  On larger screens, a table of contents appears on the right side for quick section navigation.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Installation Section */}
        <section id="installation">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Installation
          </h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <pre className="text-sm">
                <code>npm install @your-org/example-layout</code>
              </pre>
            </div>
            <p className="text-sm text-muted-foreground">
              Import the component and use it to wrap your content:
            </p>
            <div className="rounded-lg bg-muted p-4">
              <pre className="text-sm">
                <code>{`import { ExampleLayout } from '@/components/app-example-layout'

export default function MyPage() {
  return (
    <ExampleLayout title="My Page" description="Page description">
      <p>Your content here...</p>
    </ExampleLayout>
  )
}`}</code>
              </pre>
            </div>
          </div>
        </section>

        <Separator />

        {/* Usage Section */}
        <section id="usage">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Usage
          </h2>
          <div className="mt-6 space-y-4">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Props
            </h3>
            <div className="rounded-lg border">
              <div className="p-4">
                <h4 className="font-medium">title</h4>
                <p className="text-sm text-muted-foreground">The main title of the page</p>
              </div>
              <Separator />
              <div className="p-4">
                <h4 className="font-medium">description</h4>
                <p className="text-sm text-muted-foreground">Optional description text</p>
              </div>
              <Separator />
              <div className="p-4">
                <h4 className="font-medium">children</h4>
                <p className="text-sm text-muted-foreground">The main content to display</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="flex justify-center mt-8">
          <Button size="lg">
            Get Started
          </Button>
        </div>
      </div>
    </ExampleLayout>
  )
}
