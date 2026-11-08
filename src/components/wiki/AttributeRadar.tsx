import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts";
import type { RadarStat } from "@/types/game";

interface AttributeRadarProps {
  data: RadarStat[];
}

/** 属性雷达图：多维属性可视化，维度名与数值同步标注 */
export default function AttributeRadar({ data }: AttributeRadarProps) {
  return (
    <div className="h-full w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="68%" cy="50%">
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis
            dataKey="label"
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            tickFormatter={(label: string) => {
              const entry = data.find((d) => d.label === label);
              return entry ? `${label} ${entry.value}` : label;
            }}
          />
          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            dataKey="value"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.35}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
