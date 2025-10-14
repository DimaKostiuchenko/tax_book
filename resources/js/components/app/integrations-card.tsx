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
      <div ref={ref} className="bg-white hover:bg-gray-50 transition-all duration-200 w-full" {...props}>
        {/* Header */}
        <div className="p-4 pb-3 mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Нагадування</h3>
        </div>
        
        {/* Content */}
        <div className="p-4 pt-0">
          <div className="space-y-2" role="list" aria-label="Integration channels">
            {integrations.map((integration) => {
              const isActive = integration.status === "active";
              return (
                <div
                  key={integration.key}
                  className={`flex items-center justify-between p-3 transition-all duration-200 ${
                    isActive 
                      ? ' hover:bg-gray-100 ' 
                      : 'hover:bg-gray-100 '
                  }`}
                  role="listitem"
                >
                  <div className="flex items-center gap-3">
                    {/* <div className={`w-3 h-3 rounded-full ${
                      isActive ? 'bg-green-400' : 'bg-gray-200 text-gray-600 '
                    }`}></div> */}
                    <div className=" font-semibold text-gray-900">
                      {integration.label}
                    </div>
                  </div>
                  <div className={`px-3 py-2 text-xs rounded-full font-normal  ${
                    isActive 
                      ? 'bg-gradient-to-r from-green-400 to-green-300 text-gray-900' 
                      : 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-600'
                  }`}>
                    {isActive ? 'Активний' : 'Неактивний'}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="flex justify-center mt-8">
            <Button
            size={"lg"}
              className="bg-[#344CB7] hover:bg-[#2A3A9A] text-white rounded-full px-6 py-5 font-medium transition-all duration-200"
              onClick={onConfigure}
              aria-label="Configure integration channels"
            >
              Налаштувати 
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

IntegrationsCard.displayName = 'IntegrationsCard';

export { IntegrationsCard };
