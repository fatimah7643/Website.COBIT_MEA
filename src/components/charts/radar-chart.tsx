'use client';

import { CartesianGrid, PolarAngleAxis, PolarGrid, Radar, RadarChart as RechartsRadarChart, ResponsiveContainer } from 'recharts';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '../ui/chart';

interface RadarChartProps {
  data: Array<{ [key: string]: any }>;
  dataKey: string;
  children?: React.ReactNode;
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  config?: ChartConfig;
}

export function RadarChart({ 
  data, 
  dataKey, 
  children, 
  margin = { top: 20, right: 20, bottom: 20, left: 20 },
  config = {}
}: RadarChartProps) {
  return (
    <ChartContainer config={config}>
      <RechartsRadarChart data={data} margin={margin}>
        <CartesianGrid stroke="none" />
        <PolarGrid stroke="hsl(var(--border))" />
        <PolarAngleAxis dataKey={dataKey} tick={{ fontSize: 12 }} />
        <Radar 
          name="Skor" 
          dataKey="score" 
          stroke="hsl(var(--chart-1))" 
          fill="hsl(var(--chart-1))" 
          fillOpacity={0.25} 
          dot={{
            r: 4,
            fillOpacity: 1,
          }}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
      </RechartsRadarChart>
    </ChartContainer>
  );
}