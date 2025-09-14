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
      <Card ref={ref} className="lg:col-span-1" {...props}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">📊 Податкові ліміти</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm text-muted-foreground">{taxLimits.label}</div>
          <div className="text-2xl font-semibold">
            {(taxLimits.used / 1_000_000).toFixed(1)} млн / {(taxLimits.limit / 1_000_000).toFixed(0)} млн грн
          </div>
          <Progress 
            value={limitPct} 
            className="h-2"
            aria-label={`Tax limit usage: ${limitPct}%`}
          />
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
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
              variant="outline" 
              className="rounded-2xl"
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
