import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface MetricCardProps {
  label: string;
  value: string;
  sublabel?: string;
  trend?: { value: string; positive: boolean };
  icon?: LucideIcon;
  sparkline?: number[];
  className?: string;
}

export function MetricCard({ label, value, sublabel, trend, icon: Icon, sparkline, className }: MetricCardProps) {
  const chartData = sparkline?.map((v, i) => ({ i, v }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'relative rounded-lg bg-card p-6 shadow-sm hover:shadow-md transition-all overflow-hidden group',
        className
      )}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent pointer-events-none" />

      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-bold tabular-nums text-card-foreground">{value}</p>
          <div className="mt-1 flex items-center gap-2">
            {sublabel && <span className="text-xs text-muted-foreground">{sublabel}</span>}
            {trend && (
              <span className={cn('text-xs font-medium', trend.positive ? 'text-success' : 'text-destructive')}>
                {trend.positive ? '↑' : '↓'} {trend.value}
              </span>
            )}
          </div>
        </div>
        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>

      {/* Sparkline */}
      {chartData && chartData.length > 0 && (
        <div className="relative mt-3 h-10 -mx-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={`spark-${label}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke="hsl(217, 91%, 60%)"
                strokeWidth={1.5}
                fill={`url(#spark-${label})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
}
