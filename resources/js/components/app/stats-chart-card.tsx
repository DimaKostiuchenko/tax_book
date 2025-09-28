import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { type StatItem } from '@/types/dashboard';

export interface StatsChartCardProps {
  stats: StatItem[];
  earnedAmount?: number;
  maxAllowedAmount?: number;
  currency?: string;
  growthPercentage?: number;
}

const StatsChartCard = React.forwardRef<HTMLDivElement, StatsChartCardProps>(
  (
    { stats, earnedAmount = 0, maxAllowedAmount = 0, currency = '', growthPercentage = 0, ...props },
    ref
  ) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const rootRef = useRef<am5.Root | null>(null);

    useEffect(() => {
      if (!chartRef.current) return;

      const root = am5.Root.new(chartRef.current);
      rootRef.current = root;
      root._logo?.dispose();
      root.setThemes([am5themes_Animated.new(root)]);

      const chart = root.container.children.push(
        am5percent.PieChart.new(root, {
          innerRadius: am5.percent(70),
        })
      );

      // Create single pie series for tax limit vs earned amount
      const pieSeries = chart.series.push(
        am5percent.PieSeries.new(root, {
          valueField: "value",
          categoryField: "category",
        })
      );

      pieSeries.labels.template.set("forceHidden", true);
      pieSeries.ticks.template.set("forceHidden", true);

       // Set colors - blue for earned, light gray for remaining
       pieSeries.set("colors", am5.ColorSet.new(root, {
         colors: [
           am5.color("#3b82f6"), // blue for earned
           am5.color("#f3f4f6")  // light gray for remaining limit
         ]
       }));

      // Data: earned amount vs remaining tax limit
      pieSeries.data.setAll([
        { category: "Зароблено", value: earnedAmount },
        { category: "Залишок ліміту", value: Math.max(0, maxAllowedAmount - earnedAmount) }
      ]);

       // Center percentage label
       const percentage = maxAllowedAmount > 0
         ? Math.round((earnedAmount / maxAllowedAmount) * 100)
         : 0;

       // Center percentage label
       chart.seriesContainer.children.push(
         am5.Label.new(root, {
         //  text: `${percentage}%`,
           fontSize: 22,
           fontWeight: "700",
           centerX: am5.percent(50),
           centerY: am5.percent(40),
           fill: am5.color("#1f2937")
         })
       );

       // Trend indicator icon below percentage
      //  chart.seriesContainer.children.push(
      //    am5.Circle.new(root, {
      //      centerX: am5.percent(50),
      //      centerY: am5.percent(60),
      //      radius: 12,
      //      fill: am5.color("#f3f4f6"),
      //      stroke: am5.color("#d1d5db"),
      //      strokeWidth: 1
      //    })
      //  );

      return () => {
        root.dispose();
      };
    }, [stats, earnedAmount, maxAllowedAmount]);


    return (
      <div ref={ref} className="bg-white p-4 hover:bg-gray-50  transition-all duration-200 w-full" {...props}>
        {/* Header */}
        <div className=" pb-3 ">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">Податкові ліміти</h3>
            <button className="p-1 hover:bg-gray-100 rounded-full">
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div
            ref={chartRef}
            className="w-full h-50"
            role="img"
            aria-label="Chart showing earned income vs tax limit"
          />

           {/* Two column legend */}
           <div className="mt-6 grid grid-cols-2 gap-4">
             {/* Left column - Зароблено */}
             <div className="text-left">
               <div className="flex items-center space-x-2 mb-1">
                 <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                 <span className="text-sm text-gray-600">Зароблено</span>
               </div>
               <div className="text-2xl font-bold text-gray-900">
                 {earnedAmount.toLocaleString('de-DE', {
                   minimumFractionDigits: 0,
                   maximumFractionDigits: 0
                 }).replace(/\./g, ' ')}
               </div>
             </div>
             
             {/* Right column - Залишок ліміту */}
             <div className="text-left">
               <div className="flex items-center space-x-2 mb-1">
                 <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                 <span className="text-sm text-gray-600">Залишок</span>
               </div>
               <div className="text-2xl font-bold text-gray-900">
                 {Math.max(0, maxAllowedAmount - earnedAmount).toLocaleString('de-DE', {
                   minimumFractionDigits: 0,
                   maximumFractionDigits: 0
                 }).replace(/\./g, ' ')}
               </div>
             </div>
           </div>
        </div>
      </div>
    );
  }
);

StatsChartCard.displayName = 'StatsChartCard';

export {
  StatsChartCard
};
