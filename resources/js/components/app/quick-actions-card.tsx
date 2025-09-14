import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { type QuickAction } from '@/types/dashboard';

export interface QuickActionsCardProps {
  actions: QuickAction[];
}

const QuickActionsCard = React.forwardRef<HTMLDivElement, QuickActionsCardProps>(
  ({ actions, ...props }, ref) => {
    return (
      <Card ref={ref} {...props}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">⚡ Швидкі дії</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button 
                key={action.label}
                variant="secondary" 
                className="rounded-2xl justify-start"
                onClick={action.onClick}
                asChild={!!action.href}
                aria-label={action.label}
              >
                {action.href ? (
                  <a href={action.href} className="flex items-center">
                    <Icon className="h-4 w-4 mr-2" aria-hidden="true" />
                    {action.label}
                  </a>
                ) : (
                  <>
                    <Icon className="h-4 w-4 mr-2" aria-hidden="true" />
                    {action.label}
                  </>
                )}
              </Button>
            );
          })}
        </CardContent>
      </Card>
    );
  }
);

QuickActionsCard.displayName = 'QuickActionsCard';

export { QuickActionsCard };
