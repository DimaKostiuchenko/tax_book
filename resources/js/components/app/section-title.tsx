import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  action?: React.ReactNode;
}

const SectionTitle = React.forwardRef<HTMLDivElement, SectionTitleProps>(
  ({ icon: Icon, children, action, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-between mb-2', className)}
        role="heading"
        aria-level={3}
        {...props}
      >
        <div className="flex items-center gap-2">
          <Icon 
            className="h-5 w-5 text-muted-foreground" 
            aria-hidden="true"
          />
          <h3 className="text-base font-medium text-muted-foreground">
            {children}
          </h3>
        </div>
        {action && (
          <div role="group" aria-label="Section actions">
            {action}
          </div>
        )}
      </div>
    );
  }
);

SectionTitle.displayName = 'SectionTitle';

export { SectionTitle };
