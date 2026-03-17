import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface MetricCardProps {
  label: string;
  value: string;
  sublabel?: string;
  trend?: { value: string; positive: boolean };
  className?: string;
}

export function MetricCard({ label, value, sublabel, trend, className }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'rounded-lg bg-card p-6 shadow-sm hover:shadow-md transition-shadow',
        className
      )}
    >
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
    </motion.div>
  );
}
