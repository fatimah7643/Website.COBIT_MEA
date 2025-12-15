'use client';

import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '../ui/chart';

interface BarChartProps {
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

export function BarChart({ 
  data, 
  dataKey, 
  children, 
  margin = { top: 20, right: 20, bottom: 20, left: 20 },
  config = {}
}: BarChartProps) {
  return (
    <ChartContainer config={config}>
      <RechartsBarChart data={data} margin={margin}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey={dataKey} tick={{ fontSize: 12 }} />
        <YAxis domain={[0, 5]} tickCount={6} tick={{ fontSize: 12 }} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar 
          name="Skor" 
          dataKey="score" 
          fill="hsl(var(--chart-2))" 
          radius={[4, 4, 0, 0]} 
        />
      </RechartsBarChart>
    </ChartContainer>
  );
}