import {
  Sidebar,
  TaxEventsTimeline,
  TaxEventsWidget,
  StatsWidget,
  ViewsChartWidget,
  CongratulationsWidget,
  MeetingsWidget,
  Header,
  QuarterlyGanttChart,
  GanttTimelineWidget
} from '@/components/clean-dashboard'

export default function CleanDashboard() {
  const userName = "John"

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col lg:flex-row gap-4 h-full">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-4">

             {/* Header */}
      <Header
        userName={userName}
        userAvatar="https://cdn.dribbble.com/users/13467747/avatars/normal/data?1665609907"
        notificationsCount={3}
      />
          {/* Tax Events Timeline */}
          {/*<TaxEventsTimeline />*/}

          {/* New Gantt Timeline Widget */}
          {/*<GanttTimelineWidget title="Податкові події 2025" />*/}

          {/* Quarterly Gantt Chart */}
          {/* <QuarterlyGanttChart /> */}

          {/* Tax Events Section */}
          <TaxEventsWidget />

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Stats Cards */}
            {/* <StatsWidget /> */}

            {/* Views Chart Card */}
            {/* <ViewsChartWidget /> */}

            {/* Congratulations Card */}
            {/* <CongratulationsWidget userName={userName} /> */}

            {/* Meetings Card */}
            {/* <MeetingsWidget /> */}
          </div>
        </main>
      </div>
      {/* Script to draw the chart */}
    </div>
  )
}
