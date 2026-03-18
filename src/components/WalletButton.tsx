import { useWallet } from '@/lib/wallet-context';
import { truncateAddress } from '@/lib/stx-utils';
import { Button } from '@/components/ui/button';
import { Copy, LogOut, Wallet } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

export function WalletButton() {
  const { connected, address, connect, disconnect } = useWallet();

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast({ title: 'Address copied', description: address });
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!connected ? (
        <motion.div
          key="disconnected"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15 }}
        >
          <Button onClick={connect} size="sm" className="gap-2">
            <Wallet className="h-4 w-4" />
            Connect Wallet
          </Button>
        </motion.div>
      ) : (
        <motion.div
          key="connected"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-1"
        >
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-md bg-secondary px-3 py-1.5 text-xs font-mono text-secondary-foreground hover:bg-secondary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {truncateAddress(address!)}
            <Copy className="h-3 w-3 text-muted-foreground" />
          </button>
          <Button variant="ghost" size="icon" onClick={disconnect} className="h-8 w-8">
            <LogOut className="h-3.5 w-3.5" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
