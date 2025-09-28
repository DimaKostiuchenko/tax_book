import React from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import {
  UserProfileCard,
  TaxLimitsCard,
  NextEventCard,
  StatsChartCard,
  UpcomingEventsCard,
  IntegrationsCard,
  NewsCard,
  QuickActionsCard,
} from "@/components/app";
import ClientManagementLayout from "@/layouts/client-management-layout";

// Event handlers
const handleEditProfile = () => {
  // TODO: Implement profile editing
  console.log('Edit profile clicked');
};

const handleViewDetails = () => {
  // TODO: Implement view details
  console.log('View details clicked');
};

const handleMarkAsPaid = () => {
  // TODO: Implement mark as paid
  console.log('Mark as paid clicked');
};

const handleViewCalendar = () => {
  // TODO: Implement view calendar
  console.log('View calendar clicked');
};

const handleViewEventDetails = (event: any) => {
  // TODO: Implement view event details
  console.log('View event details:', event);
};

const handleViewAllEvents = () => {
  // TODO: Implement view all events
  console.log('View all events clicked');
};

const handleConfigureIntegrations = () => {
  // TODO: Implement configure integrations
  console.log('Configure integrations clicked');
};

const handleReadArticle = (article: any) => {
  // TODO: Implement read article
  console.log('Read article:', article);
};

const handleViewAllNews = () => {
  // TODO: Implement view all news
  console.log('View all news clicked');
};

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

export default function Dashboard() {
  const { user, events, stats, taxLimits, integrations, news, quickActions } = useDashboardData();

  return (
    <ClientManagementLayout>
      <Head title="Dashboard" />
      <div className="min-h-screen relative overflow-hidden"
        style={{ fontFamily: 'Roboto, sans-serif' }}>
        <div className="p-6">
          <div className="space-y-6">

            <UserProfileCard
              user={user}
              onEdit={handleEditProfile}
            />

            {/* Middle grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/*<TaxLimitsCard*/}
              {/*  taxLimits={taxLimits}*/}
              {/*  onViewDetails={handleViewDetails}*/}
              {/*/>*/}
              {/*<NextEventCard*/}
              {/*  event={events.next}*/}
              {/*  onMarkAsPaid={handleMarkAsPaid}*/}
              {/*  onViewCalendar={handleViewCalendar}*/}
              {/*/>*/}
              {/*  */}

              <StatsChartCard
                stats={stats}
                earnedAmount={7090.00}
                maxAllowedAmount={10425.00}
                currency="₴"
                growthPercentage={12.96}
              />

              <IntegrationsCard
                integrations={integrations}
                onConfigure={handleConfigureIntegrations}
              />

<QuickActionsCard actions={quickActions} />




              {/*  <div className="lg:col-span-3">*/}
              {/*      <UpcomingEventsCard*/}
              {/*          events={events.upcoming}*/}
              {/*          onViewDetails={handleViewEventDetails}*/}
              {/*          onViewAll={handleViewAllEvents}*/}
              {/*      />*/}
              {/*</div>*/}
            </div>

            {/* Lower grid */}
            {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
              <IntegrationsCard
                integrations={integrations}
                onConfigure={handleConfigureIntegrations}
              />
            </div> */}

            {/* Bottom: News + Quick actions */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <NewsCard
                news={news}
                onReadArticle={handleReadArticle}
                onViewAll={handleViewAllNews}
              />
              {/* <QuickActionsCard actions={quickActions} /> */}
            </div>
          </div>
        </div>
      </div>
    </ClientManagementLayout>
  );
}
