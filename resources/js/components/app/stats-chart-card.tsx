import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { type StatItem } from '@/types/dashboard';

export interface StatsChartCardProps {
  stats: StatItem[];
}

const COLORS = ["#22c55e", "#eab308", "#ef4444"];

const StatsChartCard = React.forwardRef<HTMLDivElement, StatsChartCardProps>(
  ({ stats, ...props }, ref) => {
    const pieTotal = stats.reduce((a, b) => a + b.value, 0);

    return (
      <Card ref={ref} className="bg-white rounded-none border-0 shadow-none lg:col-span-1" {...props}>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold text-gray-900">📈 Статистика подій</CardTitle>
        </CardHeader>
        <CardContent className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart role="img" aria-label="Statistics chart showing event distribution">
              <Pie 
                data={stats} 
                dataKey="value" 
                nameKey="name" 
                innerRadius={50} 
                outerRadius={75} 
                paddingAngle={4}
              >
                {stats.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Pie>
              <RechartsTooltip 
                formatter={(value: number, name: string) => [`${value}`, name]}
                labelStyle={{ color: '#374151' }}
                contentStyle={{ 
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div 
            className="flex justify-center gap-4 text-xs text-gray-400 mt-2"
            role="list"
            aria-label="Chart legend"
          >
            {stats.map((stat, index) => (
              <div 
                key={stat.name} 
                className="flex items-center gap-1"
                role="listitem"
              >
                <span 
                  className="inline-block h-2 w-2 rounded" 
                  style={{ background: COLORS[index] }}
                  aria-hidden="true"
                />
                <span>
                  {stat.name}: {stat.value}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
);

StatsChartCard.displayName = 'StatsChartCard';

export { StatsChartCard };
