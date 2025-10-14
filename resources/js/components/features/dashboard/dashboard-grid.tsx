import React from 'react';
import { StatsChartCard } from './cards/stats-chart-card';
import { IntegrationsCard } from './cards/integrations-card';
import { QuickActionsCard } from './cards/quick-actions-card';
import type { DashboardData } from '@/types/dashboard';

interface DashboardGridProps {
  stats: DashboardData['stats'];
  integrations: DashboardData['integrations'];
  quickActions: DashboardData['quickActions'];
  statsConfig: {
    earnedAmount: number;
    maxAllowedAmount: number;
    currency: string;
    growthPercentage: number;
  };
  onConfigureIntegrations: () => void;
}

export const DashboardGrid = React.memo<DashboardGridProps>(({
  stats,
  integrations,
  quickActions,
  statsConfig,
  onConfigureIntegrations,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <StatsChartCard
        stats={stats}
        earnedAmount={statsConfig.earnedAmount}
        maxAllowedAmount={statsConfig.maxAllowedAmount}
        currency={statsConfig.currency}
        growthPercentage={statsConfig.growthPercentage}
      />

      <IntegrationsCard
        integrations={integrations}
        onConfigure={onConfigureIntegrations}
      />

      <QuickActionsCard actions={quickActions} />
    </div>
  );
});

DashboardGrid.displayName = 'DashboardGrid';

