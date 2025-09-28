import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { type BadgeTone } from '@/types/dashboard';

const badgePillVariants = cva(
  'inline-flex items-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:shadow-md',
  {
    variants: {
      tone: {
        default: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        success: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
        warn: 'bg-amber-50 text-amber-700 hover:bg-amber-100',
        danger: 'bg-red-50 text-red-700 hover:bg-red-100',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm rounded-full',
        default: 'px-4 py-2 text-sm rounded-full',
        lg: 'px-5 py-2.5 text-sm rounded-full',
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
