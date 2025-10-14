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
      <Card ref={ref} className="relative overflow-hidden" {...props}>
        <div className="relative z-10">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <CardTitle className="text-xl font-bold text-gray-800">
                Швидкі дії
              </CardTitle>
            </div>
          </CardHeader>
          
          <CardContent className="grid grid-cols-2 gap-6 py-6 px-6">
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <div
                  key={action.label}
                  onClick={action.onClick}
                  aria-label={action.label}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <span className="font-medium">{action.label}</span>
                  
                  {action.href ? (
                    <a href={action.href} className="absolute inset-0" />
                  ) : null}
                </div>
              );
            })}
          </CardContent>
        </div>
      </Card>
    );
  }
);

QuickActionsCard.displayName = 'QuickActionsCard';

export { QuickActionsCard };
