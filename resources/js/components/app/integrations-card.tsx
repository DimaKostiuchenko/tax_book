import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BadgePill } from './badge-pill';
import { type Integration } from '@/types/dashboard';

export interface IntegrationsCardProps {
  integrations: Integration[];
  onConfigure?: () => void;
}

const IntegrationsCard = React.forwardRef<HTMLDivElement, IntegrationsCardProps>(
  ({ integrations, onConfigure, ...props }, ref) => {
    return (
      <Card ref={ref} className="bg-white rounded-none border-0 shadow-none" {...props}>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold text-gray-900">📡 Інтеграції / Канали</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2" role="list" aria-label="Integration channels">
            {integrations.map((integration) => {
              const Icon = integration.icon;
              return (
                <div 
                  key={integration.key} 
                  className="flex items-center justify-between border border-gray-200 p-3"
                  role="listitem"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    <div className="text-sm font-medium text-gray-900">{integration.label}</div>
                  </div>
                  {integration.status === "active" ? (
                    <BadgePill tone="success">Активний</BadgePill>
                  ) : (
                    <BadgePill tone="warn">Не підключено</BadgePill>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-end">
            <Button 
              className="bg-[#344CB7] text-white rounded-full px-6 py-2"
              onClick={onConfigure}
              aria-label="Configure integration channels"
            >
              Налаштувати канали
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
);

IntegrationsCard.displayName = 'IntegrationsCard';

export { IntegrationsCard };
