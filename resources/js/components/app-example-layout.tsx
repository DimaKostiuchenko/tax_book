import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface ExampleLayoutProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function ExampleLayout({ title, description, children, className }: ExampleLayoutProps) {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="mr-4 hidden md:flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold sm:inline-block">
                {title}
              </span>
            </a>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <a className="transition-colors hover:text-foreground/80" href="/docs">
                Documentation
              </a>
              <a className="transition-colors hover:text-foreground/80" href="/examples">
                Examples
              </a>
              <a className="transition-colors hover:text-foreground/80" href="/components">
                Components
              </a>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
            </div>
            <nav className="flex items-center">
              <Button variant="ghost" size="sm">
                GitHub
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        {/* Sidebar */}
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <div className="py-6 pr-2 lg:py-8">
            <div className="space-y-2">
              <h4 className="px-2 text-sm font-medium">Getting Started</h4>
              <nav className="grid grid-flow-row auto-rows-max text-sm">
                <a className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline" href="/docs">
                  Introduction
                </a>
                <a className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline" href="/docs/installation">
                  Installation
                </a>
                <a className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline" href="/docs/components">
                  Components
                </a>
              </nav>
            </div>
            <Separator className="my-4" />
            <div className="space-y-2">
              <h4 className="px-2 text-sm font-medium">Components</h4>
              <nav className="grid grid-flow-row auto-rows-max text-sm">
                <a className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline" href="/docs/components/accordion">
                  Accordion
                </a>
                <a className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline" href="/docs/components/alert-dialog">
                  Alert Dialog
                </a>
                <a className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline" href="/docs/components/button">
                  Button
                </a>
              </nav>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
          <div className="mx-auto w-full min-w-0">
            <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
              <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                <a className="hover:underline" href="/docs">
                  Documentation
                </a>
              </div>
              <span>/</span>
              <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                {title}
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
                {title}
              </h1>
              {description && (
                <p className="text-xl text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
            <Separator className="my-4" />
            <div className="mdx">
              {children}
            </div>
          </div>
          
          {/* Table of Contents */}
          <div className="hidden text-sm xl:block">
            <div className="sticky top-6 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
              <div className="space-y-2">
                <p className="font-medium">On This Page</p>
                <nav className="grid grid-flow-row auto-rows-max text-sm">
                  <a className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline" href="#overview">
                    Overview
                  </a>
                  <a className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline" href="#installation">
                    Installation
                  </a>
                  <a className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline" href="#usage">
                    Usage
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
