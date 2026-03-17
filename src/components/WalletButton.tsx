import { useWallet } from '@/lib/wallet-context';
import { truncateAddress } from '@/lib/stx-utils';
import { Button } from '@/components/ui/button';
import { Copy, LogOut, Wallet } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export function WalletButton() {
  const { connected, address, connect, disconnect } = useWallet();

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast({ title: 'Address copied', description: address });
    }
  };

  if (!connected) {
    return (
      <Button onClick={connect} size="sm" className="gap-2">
        <Wallet className="h-4 w-4" />
        Connect Wallet
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 rounded-md bg-secondary px-3 py-1.5 text-xs font-mono text-secondary-foreground hover:bg-secondary/80 transition-colors"
      >
        {truncateAddress(address!)}
        <Copy className="h-3 w-3 text-muted-foreground" />
      </button>
      <Button variant="ghost" size="icon" onClick={disconnect} className="h-8 w-8">
        <LogOut className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
