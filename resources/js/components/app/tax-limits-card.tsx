import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, TrendingUp } from 'lucide-react';
import { type TaxLimits } from '@/types/dashboard';

export interface TaxLimitsCardProps {
  taxLimits: TaxLimits;
  onViewDetails?: () => void;
}

const TaxLimitsCard = React.forwardRef<HTMLDivElement, TaxLimitsCardProps>(
  ({ taxLimits, onViewDetails, ...props }, ref) => {
    const limitPct = Math.min(100, Math.round((taxLimits.used / taxLimits.limit) * 100));
    const isNearLimit = limitPct >= 90;

    return (
      <Card ref={ref} className="bg-white rounded-none border-0 shadow-none lg:col-span-1" {...props}>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold text-gray-900">📊 Податкові ліміти</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-gray-400">{taxLimits.label}</div>
          <div className="text-2xl font-semibold text-gray-900">
            {(taxLimits.used / 1_000_000).toFixed(1)} млн / {(taxLimits.limit / 1_000_000).toFixed(0)} млн грн
          </div>
          <Progress 
            value={limitPct} 
            className="h-2"
            aria-label={`Tax limit usage: ${limitPct}%`}
          />
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-gray-400">
              {isNearLimit ? (
                <AlertTriangle 
                  className="h-4 w-4 text-red-500" 
                  aria-label="Warning: Near limit"
                />
              ) : (
                <TrendingUp 
                  className="h-4 w-4 text-emerald-500" 
                  aria-label="Good: Within limits"
                />
              )}
              <span>Використано: {limitPct}%</span>
            </div>
            <Button 
              size="sm" 
              className="bg-[#344CB7] text-white rounded-full px-6 py-2"
              onClick={onViewDetails}
              aria-label="View detailed tax limits"
            >
              Детальніше
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
);

TaxLimitsCard.displayName = 'TaxLimitsCard';

export { TaxLimitsCard };
