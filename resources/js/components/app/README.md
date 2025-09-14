# Dashboard Components

This directory contains the refactored dashboard components following shadcn/ui best practices and React modern patterns.

## 🏗️ Architecture

### Component Structure
- **Single Responsibility**: Each component has one clear purpose
- **Composition over Inheritance**: Components are composed together rather than extended
- **TypeScript First**: All components are fully typed with proper interfaces
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA labels and keyboard navigation

### File Organization
```
app/
├── index.ts                    # Barrel exports
├── badge-pill.tsx             # Reusable badge component with CVA variants
├── section-title.tsx          # Section header component
├── user-profile-card.tsx      # User profile display card
├── tax-limits-card.tsx        # Tax limits visualization
├── next-event-card.tsx        # Next upcoming event display
├── stats-chart-card.tsx       # Statistics pie chart
├── upcoming-events-card.tsx   # List of upcoming events
├── integrations-card.tsx      # Integration channels status
├── news-card.tsx              # News and updates display
├── quick-actions-card.tsx     # Quick action buttons
└── README.md                  # This documentation
```

## 🎨 Design System

### Variants & Styling
- **CVA (Class Variance Authority)**: Used for component variants
- **shadcn/ui Design Tokens**: Consistent spacing, colors, and typography
- **Dark Mode Support**: All components support theme switching
- **Responsive Design**: Mobile-first approach with proper breakpoints

### Accessibility Features
- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Visible focus indicators
- **Semantic HTML**: Proper heading hierarchy and landmarks

## 🚀 Usage

### Import Components
```typescript
import {
  UserProfileCard,
  TaxLimitsCard,
  BadgePill,
  // ... other components
} from '@/components/app';
```

### Component Props
All components use TypeScript interfaces for props with proper documentation:

```typescript
interface UserProfileCardProps {
  user: User;
  onEdit?: () => void;
}
```

### Event Handlers
Components accept optional event handlers for user interactions:

```typescript
<UserProfileCard 
  user={user} 
  onEdit={handleEditProfile}
/>
```

## 🔧 Customization

### Adding New Variants
Use CVA to add new variants to existing components:

```typescript
const badgePillVariants = cva(
  'base-classes',
  {
    variants: {
      tone: {
        // Add new tone variants here
      }
    }
  }
);
```

### Extending Components
Create new components by composing existing ones:

```typescript
const CustomCard = ({ children, ...props }) => (
  <Card {...props}>
    <CardHeader>
      <SectionTitle icon={CustomIcon}>
        Custom Section
      </SectionTitle>
    </CardHeader>
    <CardContent>
      {children}
    </CardContent>
  </Card>
);
```

## 📊 Data Flow

### Custom Hooks
Data management is handled through custom hooks:

```typescript
const { user, events, stats } = useDashboardData();
```

### Type Safety
All data structures are properly typed:

```typescript
interface DashboardData {
  user: User;
  events: {
    next: TaxEvent;
    upcoming: UpcomingEvent[];
  };
  // ... other properties
}
```

## 🧪 Testing

### Component Testing
Each component can be tested independently:

```typescript
import { render, screen } from '@testing-library/react';
import { UserProfileCard } from '@/components/app';

test('renders user profile card', () => {
  render(<UserProfileCard user={mockUser} />);
  expect(screen.getByText(/Вітаємо/)).toBeInTheDocument();
});
```

### Accessibility Testing
Use testing-library/jest-dom for accessibility assertions:

```typescript
expect(screen.getByRole('button')).toHaveAttribute('aria-label');
```

## 🔄 Migration from Original

### Before (Monolithic)
- 282 lines in single file
- Inline components mixed with logic
- No TypeScript interfaces
- Limited reusability

### After (Modular)
- 13 focused components
- Proper separation of concerns
- Full TypeScript support
- Highly reusable and testable

## 🎯 Benefits

1. **Maintainability**: Easy to modify individual components
2. **Reusability**: Components can be used across the application
3. **Testability**: Each component can be tested in isolation
4. **Type Safety**: Full TypeScript support prevents runtime errors
5. **Accessibility**: Built-in accessibility features
6. **Performance**: Optimized rendering with React.memo where needed
7. **Developer Experience**: Clear component APIs and documentation
