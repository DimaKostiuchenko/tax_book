import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { type BadgeTone } from '@/types/dashboard';

const badgePillVariants = cva(
  'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      tone: {
        default: 'bg-muted text-muted-foreground hover:bg-muted/80',
        success: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400',
        warn: 'bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/20 dark:text-amber-400',
        danger: 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        default: 'px-2.5 py-1 text-xs',
        lg: 'px-3 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      tone: 'default',
      size: 'default',
    },
  }
);

export interface BadgePillProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgePillVariants> {
  children: React.ReactNode;
}

const BadgePill = React.forwardRef<HTMLSpanElement, BadgePillProps>(
  ({ className, tone, size, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgePillVariants({ tone, size }), className)}
        role="status"
        aria-label={`Status: ${children}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

BadgePill.displayName = 'BadgePill';

export { BadgePill, badgePillVariants };
