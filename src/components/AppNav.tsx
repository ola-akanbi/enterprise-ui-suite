import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NetworkBadge } from './NetworkBadge';
import { WalletButton } from './WalletButton';
import { Zap, LayoutDashboard, Send, Activity, Search, Settings } from 'lucide-react';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/send', label: 'Send', icon: Send },
  { to: '/activity', label: 'Activity', icon: Activity },
  { to: '/address', label: 'Address', icon: Search },
  { to: '/pulse', label: 'Lookup', icon: Search },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export function AppNav() {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-6 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-display text-lg text-foreground">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          StackPulse
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
            const active = pathname === to || (to !== '/' && pathname.startsWith(to));
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <NetworkBadge />
          <WalletButton />
        </div>
      </div>
    </header>
  );
}
