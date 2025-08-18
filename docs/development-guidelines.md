# Development Guidelines

## Overview
This project uses Laravel 12 + Inertia.js + React with shadcn/ui components. Follow these guidelines for consistent development.

## Quick Reference
- **UI Components**: `@resources/js/components/ui/` - shadcn/ui components
- **Utils**: `@resources/js/lib/utils.ts` - `cn()` function for class merging
- **Code Style**: Laravel conventions for PHP, TypeScript for React

## UI Component Development with shadcn/ui

### Available UI Components
Your project has shadcn/ui components available in `@resources/js/components/ui/`:

#### Form Components
- `Button` - Multiple variants (default, destructive, outline, secondary, ghost, link)
- `Input` - Text input fields
- `Label` - Form labels
- `Select` - Dropdown selections
- `Checkbox` - Checkbox inputs
- `Textarea` - Multi-line text inputs

#### Layout Components
- `Card` - Content containers
- `Dialog` - Modal dialogs
- `Sheet` - Slide-out panels
- `Sidebar` - Navigation sidebar
- `Separator` - Visual dividers

#### Navigation Components
- `NavigationMenu` - Main navigation
- `Breadcrumb` - Page breadcrumbs
- `DropdownMenu` - Context menus

#### Feedback Components
- `Alert` - Status messages
- `Badge` - Status indicators
- `Skeleton` - Loading placeholders
- `Tooltip` - Hover information

#### Data Display
- `Avatar` - User avatars
- `Table` - Data tables
- `Collapsible` - Expandable content

### Using shadcn/ui Components

#### Basic Usage
```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <h2>Form Title</h2>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter text..." />
        <Button variant="default">Submit</Button>
      </CardContent>
    </Card>
  )
}
```

#### Component Variants
Most components support variants for different use cases:
```tsx
// Button variants
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Button sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon Only</Button>
```

### Creating New Components

#### 1. Reuse Existing Components First
Always try to compose new features using existing shadcn/ui components before creating custom ones.

#### 2. When Creating Custom Components
- Use the `cn()` utility for class merging
- Follow the existing component patterns
- Use TypeScript for type safety
- Include proper variants and props

#### 3. Component Template
```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-classes",
        secondary: "secondary-classes",
      },
      size: {
        default: "default-size",
        sm: "small-size",
        lg: "large-size",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  // Add custom props here
}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(componentVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Component.displayName = "Component"

export { Component, componentVariants }
```

### Adding New shadcn/ui Components

To add new shadcn/ui components:

1. **Install via CLI** (if you have shadcn/ui CLI):
   ```bash
   npx shadcn@latest add [component-name]
   ```

2. **Manual Installation**:
   - Copy component from [shadcn/ui website](https://ui.shadcn.com/docs/components)
   - Place in `/resources/js/components/ui/`
   - Install required dependencies

### Styling Guidelines

#### Using the `cn()` Utility
```tsx
import { cn } from "@/lib/utils"

// Merge classes safely
<div className={cn(
  "base-classes",
  variant === "active" && "active-classes",
  className // Allow custom classes from props
)} />
```

#### Tailwind CSS Classes
- Use Tailwind CSS for styling
- Follow the design system colors and spacing
- Use CSS variables for theming support

## Code Style

### PHP (Laravel)
- Follow Laravel conventions for PHP code
- Use proper namespacing and autoloading
- Follow PSR-12 coding standards
- Use Laravel's built-in features (Eloquent, Blade, etc.)

### TypeScript (React)
- Use TypeScript for React components
- Follow the existing file structure and naming conventions
- Use proper type definitions
- Prefer functional components with hooks

## Development Workflow
- Use Inertia.js for seamless Laravel + React integration
- Test components and features thoroughly
- Follow the established authentication patterns
- Use Git for version control with meaningful commit messages

## Verifying Changes (Browser & MCP)

### Local Browser
1. Start dev environment:
   ```bash
   composer run dev
   ```
2. Open the app:
   - App: `http://127.0.0.1:8000`
   - Vite HMR: `http://localhost:5173`
3. Make a change in `resources/js/...` or Laravel routes/controllers and refresh to verify.

### MCP (Browser) Workflow
If you use a Browser MCP to validate UI flows:
- Navigate to `http://127.0.0.1:8000`
- Exercise the flow you changed (e.g., login, add income, open calendar)
- Capture screenshots or notes if acceptance criteria require evidence

Tips:
- Check DevTools Console/Network for errors
- Validate acceptance criteria from `docs/requirements.md`
- Run tests if applicable: `php artisan test`
