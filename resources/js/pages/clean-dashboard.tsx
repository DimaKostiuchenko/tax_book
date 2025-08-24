import {
  Sidebar,
  TargetsWidget,
  TaxEventsWidget,
  StatsWidget,
  ViewsChartWidget,
  CongratulationsWidget,
  MeetingsWidget,
  Header
} from '@/components/clean-dashboard'

export default function CleanDashboard() {
  const userName = "John"

  return (
    <div className="min-h-screen" style={{
      backgroundImage: 'linear-gradient(to bottom, #ffffff, #fcfcfd, #faf9fb, #f8f6f8, #f6f3f6, #f5f2f7, #f4f2f7, #f2f1f8, #f0f3fb, #ecf5fe, #e8f7ff, #e4f9ff)'
    }}>
      <div className="flex flex-col lg:flex-row gap-4 h-full p-4">
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
          {/* Targets Section */}
          <TargetsWidget />
          
          {/* Tax Events Section */}
          <TaxEventsWidget />
          
          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Stats Cards */}
            <StatsWidget />
            
            {/* Views Chart Card */}
            <ViewsChartWidget />

            {/* Congratulations Card */}
            <CongratulationsWidget userName={userName} />
            
            {/* Meetings Card */}
            <MeetingsWidget />
          </div>
        </main>
      </div>
      {/* Script to draw the chart */}
    </div>
  )
}
