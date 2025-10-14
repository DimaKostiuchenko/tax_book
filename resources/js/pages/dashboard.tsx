import React from "react";
import { Head } from "@inertiajs/react";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import { useDashboardHandlers } from "@/hooks/use-dashboard-handlers";
import { UserProfileCard } from "@/components/features/dashboard";
import { DashboardGrid } from "@/components/features/dashboard/dashboard-grid";
import ClientLayout from "@/layouts/client-layout";

// Constants
const DASHBOARD_STATS = {
  earnedAmount: 7090.00,
  maxAllowedAmount: 10425.00,
  currency: "₴",
  growthPercentage: 12.96,
} as const;

export default function Dashboard() {
  const { user, stats, integrations, quickActions } = useDashboardData();
  const { handleEditProfile, handleConfigureIntegrations } = useDashboardHandlers();

  return (
    <ClientLayout>
      <Head title="Dashboard" />
      <div className="min-h-screen relative overflow-hidden">
        <div className="p-6">
          <div className="space-y-6">
            <UserProfileCard
              user={user}
              onEdit={handleEditProfile}
            />

            <DashboardGrid
              stats={stats}
              integrations={integrations}
              quickActions={quickActions}
              statsConfig={DASHBOARD_STATS}
              onConfigureIntegrations={handleConfigureIntegrations}
            />
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
