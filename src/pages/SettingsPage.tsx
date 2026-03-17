import { useWallet } from '@/lib/wallet-context';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Download, Info } from 'lucide-react';

export default function SettingsPage() {
  const { network, setNetwork } = useWallet();

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <div>
        <h1 className="text-2xl font-display text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Configure network and app preferences</p>
      </div>

      {/* Network */}
      <section className="rounded-lg bg-card p-6 shadow-sm space-y-4">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Network</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Use Mainnet</p>
            <p className="text-xs text-muted-foreground">Switch between testnet and mainnet</p>
          </div>
          <Switch
            checked={network === 'mainnet'}
            onCheckedChange={(v) => setNetwork(v ? 'mainnet' : 'testnet')}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Current:</span>
          <Badge
            className={
              network === 'testnet'
                ? 'bg-warning/15 text-warning border-0'
                : 'bg-success/15 text-success border-0'
            }
          >
            {network === 'testnet' ? 'Testnet' : 'Mainnet'}
          </Badge>
        </div>
      </section>

      {/* Info */}
      <section className="rounded-lg bg-card p-6 shadow-sm space-y-4">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">About</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Version</span>
            <span className="font-mono text-xs">1.0.0-beta</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Protocol</span>
            <span className="font-mono text-xs">StackPulse v1</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Fee Rate</span>
            <span className="font-mono text-xs">1.00%</span>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="rounded-lg bg-card p-6 shadow-sm space-y-3">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Resources</h2>
        <div className="flex flex-col gap-2">
          <Button variant="outline" size="sm" className="justify-start gap-2">
            <ExternalLink className="h-3.5 w-3.5" /> Documentation
          </Button>
          <Button variant="outline" size="sm" className="justify-start gap-2">
            <ExternalLink className="h-3.5 w-3.5" /> Stacks Explorer
          </Button>
          <Button variant="outline" size="sm" className="justify-start gap-2">
            <Download className="h-3.5 w-3.5" /> Export Diagnostics
          </Button>
        </div>
      </section>
    </div>
  );
}
