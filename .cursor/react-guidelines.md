# React Component Refactoring Guidelines

## Project Structure
```
resources/js/
├── components/
│   ├── common/          # Reusable UI elements (icons, branding, navigation)
│   ├── features/        # Feature-specific components (dashboard, settings, events)
│   ├── forms/           # Form-related components (fields, actions, feedback)
│   ├── layout/          # Layout structural components (header, sidebar, shell)
│   └── ui/              # Shadcn/UI components (primitives, design system)
├── pages/               # Inertia.js pages (dashboard, events, settings, auth)
├── layouts/             # Page layouts (client-layout, auth-layout)
├── hooks/               # Custom React hooks
├── lib/                 # Utilities and constants
└── types/               # TypeScript type definitions
```

## SOLID Principles

### 1. Single Responsibility Principle (SRP)
- **One component = One responsibility**
- Extract reusable logic into custom hooks (e.g., `use-dashboard-handlers.ts`)
- Separate concerns: presentation components vs. container components
- Example: `PreferencesTab` handles preferences, not authentication

### 2. Open/Closed Principle (OCP)
- Components should be open for extension but closed for modification
- Use composition over inheritance
- Pass behavior through props and children
- Example: `<Select>` accepts options array for different use cases

### 3. Liskov Substitution Principle (LSP)
- Child components must be substitutable for parent components
- Maintain consistent prop interfaces
- Use TypeScript interfaces to enforce contracts

### 4. Interface Segregation Principle (ISP)
- Keep prop interfaces focused and minimal
- Don't force components to depend on props they don't use
- Create specific interfaces for specific needs

### 5. Dependency Inversion Principle (DIP)
- Depend on abstractions (interfaces) not concretions
- Use dependency injection through props
- Keep components framework-agnostic where possible

## DRY (Don't Repeat Yourself)

### Extract Repeated Logic
- **Repeated UI patterns** → Create reusable components in `/components/common/` or `/components/ui/`
- **Repeated business logic** → Extract to custom hooks in `/hooks/`
- **Repeated styles** → Use Tailwind utility classes or extract to constants
- **Repeated data transformations** → Create utility functions in `/lib/`
- **Repeated constants** → Store in `/lib/constants/`

### Component Extraction Rules
1. If code is used 2+ times → Extract to component/function
2. If component >150 lines → Break into smaller components
3. If logic is complex → Extract to custom hook
4. **Always check for existing components** before implementing similar patterns
5. **Update existing components** when new reusable patterns are created

## KISS (Keep It Simple, Stupid)

### Simplicity Guidelines
- **Prefer simple solutions** over clever ones
- **Avoid premature optimization**
- **Clear naming** over clever naming
- **Small, focused components** over large monoliths
- **Flat component hierarchy** when possible

## Component Refactoring Checklist

### 1. Component Organization
```typescript
// ✅ Good Structure
import { dependencies } from 'libraries';
import { CustomComponent } from '@/components';
import { useCustomHook } from '@/hooks';
import type { Props } from '@/types';

interface ComponentProps {
  // Props definition
}

export default function Component({ props }: ComponentProps) {
  // 1. Hooks
  // 2. State
  // 3. Derived state/computed values
  // 4. Event handlers
  // 5. Effects
  // 6. Return JSX
}
```

### 2. Props Interface Best Practices
```typescript
// ✅ Good - Specific and focused
interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}

// ❌ Bad - Too generic
interface ButtonProps {
  [key: string]: any;
}
```

### 3. Component Extraction
```typescript
// ❌ Bad - Repeated code
<div className="w-full h-24 bg-white border-2 rounded-lg">...</div>
<div className="w-full h-24 bg-gray-900 border-2 rounded-lg">...</div>

// ✅ Good - Extracted component
<ThemeCard theme="light" active={isActive} onClick={handleClick} />
```

### 4. Custom Hooks
```typescript
// ✅ Good - Extract complex logic
function useThemeSelection(initialTheme: Theme) {
  const [theme, setTheme] = useState(initialTheme);
  const handleChange = (newTheme: Theme) => setTheme(newTheme);
  return { theme, handleChange };
}
```

### 5. Constants and Configuration
```typescript
// ✅ Good - Centralized constants
// /lib/constants/form-options.ts
export const THEME_OPTIONS = [
  { value: 'light', label: 'Світла', icon: 'sun' },
  { value: 'dark', label: 'Темна', icon: 'moon' },
] as const;
```

## Naming Conventions

### Files
- **Components**: PascalCase (e.g., `PreferencesTab.tsx`)
- **Hooks**: kebab-case with prefix (e.g., `use-theme-selection.ts`)
- **Utils**: kebab-case (e.g., `form-validation.ts`)
- **Types**: kebab-case (e.g., `dashboard-types.ts`)

### Components
- **Pages**: Noun (e.g., `Settings`, `Dashboard`)
- **Feature components**: Descriptive (e.g., `UserProfileCard`, `ThemeSelector`)
- **UI components**: Generic (e.g., `Button`, `Input`, `Card`)

### Functions
- **Event handlers**: `handle` + Event (e.g., `handleSubmit`, `handleThemeChange`)
- **Boolean functions**: `is/has/should` + State (e.g., `isActive`, `hasError`)
- **Getters**: `get` + Data (e.g., `getUserData`)

## Performance Best Practices

### 1. Memoization
```typescript
// Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  // Render logic
});

// Use useMemo for expensive calculations
const computed = useMemo(() => expensiveCalculation(data), [data]);

// Use useCallback for event handlers passed as props
const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies]);
```

### 2. Avoid Prop Drilling
- Use React Context for deeply nested props
- Consider state management (if needed)
- Keep component tree shallow

### 3. Code Splitting
- Lazy load heavy components
- Split by routes/features
- Use dynamic imports

## TypeScript Best Practices

### 1. Type Everything
```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
  email: string;
}

// ❌ Bad
const user: any = {...};
```

### 2. Use Type Inference
```typescript
// ✅ Good - Let TypeScript infer
const count = useState(0);

// ❌ Bad - Unnecessary annotation
const count: number = useState<number>(0);
```

### 3. Shared Types
- Define shared types in `/types/`
- Export and reuse across components
- Keep types DRY

## Testing Considerations

### Testable Components
- Small, focused components are easier to test
- Separate logic from presentation
- Use dependency injection
- Avoid tight coupling to external services

## Refactoring Process

### Step-by-Step Refactoring
1. **Analyze** - Identify code smells (duplication, complexity, long files)
2. **Plan** - Decide what to extract (components, hooks, utils)
3. **Extract** - Move code to appropriate locations
4. **Test** - Ensure functionality remains intact
5. **Clean** - Remove unused code and imports
6. **Document** - Update comments and types

### Red Flags (When to Refactor)
- Component >150 lines
- Function >30 lines
- >3 levels of nesting
- Repeated code patterns
- Complex conditional logic
- Hard to test
- Tight coupling

## Common Anti-Patterns to Avoid

### 1. Manual Implementation of Existing Patterns
```typescript
// ❌ Bad - Manual implementation when component exists
<div className="mb-4 flex items-center gap-2">
  {tooltip && (
    <Tooltip>
      <TooltipTrigger asChild>
        <button type="button" className="text-gray-900 hover:text-gray-600">
          <IconInfo size="md" />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  )}
  <Label htmlFor={id} className="text-lg font-semibold text-gray-900">
    {label}
  </Label>
</div>

// ✅ Good - Use existing component
<LabelWithTooltip
  htmlFor={id || ''}
  label={label}
  tooltip={tooltip || ''}
/>
```

### 2. Incomplete Refactoring
- **Problem**: Creating reusable components but not updating existing code
- **Solution**: Always search for existing patterns before implementing new ones
- **Check**: Look for similar components in `/components/forms/`, `/components/ui/`, `/components/common/`

### 3. Label Duplication Anti-Pattern
```typescript
// ❌ Bad - Duplicate label handling
<LabelWithTooltip
  htmlFor="field"
  label="Field Label"
  tooltip="Tooltip text"
/>
<Select
  label=""  // Empty but still present
  // ... other props
/>

// ✅ Good - Integrated label handling
<Select
  label="Field Label"
  tooltip="Tooltip text"
  // ... other props
/>
```

**Rule**: Form components should integrate `LabelWithTooltip` internally to avoid duplication.

### 4. Copy-Paste Development
- **Problem**: Implementing similar patterns multiple times
- **Solution**: Extract common patterns immediately
- **Rule**: If you copy code, extract it to a component

## Examples from Current Codebase

### Good Patterns
✅ Extracted components: `ProfileTab`, `SecurityTab`, `PreferencesTab`
✅ Custom hooks: `use-dashboard-handlers`, `use-password-visibility`
✅ Centralized constants: `/lib/constants/form-options.ts`
✅ Reusable UI: `/components/ui/` (shadcn components)
✅ Feature organization: `/components/features/dashboard/`

### Areas for Improvement
❌ Theme cards have repeated structure → Extract to `ThemeCard` component
❌ Settings tabs have similar structure → Extract common tab wrapper
❌ Form fields have repeated patterns → Create form field factory

## Quick Reference

### When to Extract Components
- [ ] Code is used 2+ times
- [ ] Component >150 lines
- [ ] Complex conditional rendering
- [ ] Repeated UI patterns
- [ ] Business logic mixed with presentation

### When to Extract Hooks
- [ ] Complex state logic
- [ ] Repeated state patterns
- [ ] Side effects logic
- [ ] Data fetching logic
- [ ] Form validation logic

### When to Extract Utils
- [ ] Pure functions used multiple times
- [ ] Data transformation logic
- [ ] Validation functions
- [ ] Formatting functions
- [ ] Calculation logic

### File Organization
- **UI Components**: `/components/ui/` (shadcn primitives)
- **Feature Components**: `/components/features/[feature]/`
- **Common Components**: `/components/common/`
- **Form Components**: `/components/forms/`
- **Layout Components**: `/components/layout/`
- **Custom Hooks**: `/hooks/`
- **Utilities**: `/lib/`
- **Types**: `/types/`
- **Constants**: `/lib/constants/`

## Quick Checklist for New Components

### Before Creating
- [ ] Check if similar component exists
- [ ] Search existing components in `/components/forms/`, `/components/ui/`, `/components/common/`
- [ ] Identify single responsibility
- [ ] Plan prop interface
- [ ] Consider reusability

### During Development
- [ ] Keep component <150 lines
- [ ] Use TypeScript interfaces
- [ ] Follow naming conventions
- [ ] Extract complex logic to hooks
- [ ] Use composition over inheritance

### After Creation
- [ ] Test component in isolation
- [ ] Check for unused props
- [ ] Verify accessibility
- [ ] Document component usage
- [ ] Consider performance implications
- [ ] **Update existing components** that implement similar patterns
- [ ] **Search codebase** for manual implementations that could use new component

---

*This document should be referenced when creating new components or refactoring existing ones. Keep it updated as patterns evolve.*
