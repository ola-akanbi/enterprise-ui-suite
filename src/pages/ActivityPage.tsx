import { useState, useMemo } from 'react';
import { getMockPulses } from '@/lib/mock-data';
import { formatSTX, truncateAddress } from '@/lib/stx-utils';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from '@/components/ui/sheet';
import { Search, CheckCircle2, Clock, XCircle, ExternalLink, Copy } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Pulse } from '@/lib/types';
import { toast } from '@/hooks/use-toast';

const allPulses = getMockPulses();

export default function ActivityPage() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Pulse | null>(null);

  const filtered = useMemo(() => {
    if (!search) return allPulses;
    const q = search.toLowerCase();
    return allPulses.filter(
      (p) =>
        p.sender.toLowerCase().includes(q) ||
        p.recipient.toLowerCase().includes(q) ||
        p.message.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display text-foreground">Activity Feed</h1>
          <p className="text-sm text-muted-foreground">Browse all on-chain Pulse transactions</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search address, message, ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 text-sm"
          />
        </div>
      </div>

      <div className="rounded-lg bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Sender</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="hidden md:table-cell">Message</TableHead>
              <TableHead className="text-right hidden sm:table-cell">Block</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((pulse, i) => (
              <TableRow
                key={pulse.id}
                className="cursor-pointer"
                onClick={() => setSelected(pulse)}
              >
                <TableCell><StatusBadge status={pulse.status} /></TableCell>
                <TableCell className="font-mono text-xs">{truncateAddress(pulse.sender)}</TableCell>
                <TableCell className="font-mono text-xs">{truncateAddress(pulse.recipient)}</TableCell>
                <TableCell className="text-right font-semibold tabular-nums text-sm">
                  {formatSTX(pulse.amount)}
                </TableCell>
                <TableCell className="hidden md:table-cell text-xs text-muted-foreground max-w-[200px] truncate">
                  {pulse.message}
                </TableCell>
                <TableCell className="text-right hidden sm:table-cell tabular-nums text-xs text-muted-foreground">
                  #{pulse.blockHeight.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                  No pulses found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Detail Drawer */}
      <Sheet open={!!selected} onOpenChange={() => setSelected(null)}>
        <SheetContent className="overflow-y-auto">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle className="text-lg">Pulse Details</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <DetailRow label="Pulse ID" value={selected.id} mono copyable />
                <DetailRow label="Status">
                  <StatusBadge status={selected.status} />
                </DetailRow>
                <DetailRow label="Sender" value={selected.sender} mono copyable />
                <DetailRow label="Recipient" value={selected.recipient} mono copyable />
                <DetailRow label="Amount" value={formatSTX(selected.amount)} />
                <DetailRow label="Protocol Fee" value={formatSTX(selected.protocolFee)} />
                <DetailRow label="Net Amount" value={formatSTX(selected.amount - selected.protocolFee)} />
                <DetailRow label="Block Height" value={`#${selected.blockHeight.toLocaleString()}`} />
                <DetailRow label="Timestamp" value={new Date(selected.timestamp).toLocaleString()} />
                <DetailRow label="Tx Hash" value={truncateAddress(selected.txHash, 10, 8)} mono copyable fullValue={selected.txHash} />
                {selected.message && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Message</p>
                    <p className="text-sm bg-muted/50 rounded-md p-3">{selected.message}</p>
                  </div>
                )}
                <Button variant="outline" size="sm" className="w-full gap-1.5 mt-4">
                  <ExternalLink className="h-3.5 w-3.5" /> View on Explorer
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'confirmed')
    return <Badge className="bg-success/15 text-success border-0 gap-1"><CheckCircle2 className="h-3 w-3" />Confirmed</Badge>;
  if (status === 'pending')
    return <Badge className="bg-warning/15 text-warning border-0 gap-1"><Clock className="h-3 w-3" />Pending</Badge>;
  return <Badge className="bg-destructive/15 text-destructive border-0 gap-1"><XCircle className="h-3 w-3" />Failed</Badge>;
}

function DetailRow({
  label,
  value,
  mono,
  copyable,
  fullValue,
  children,
}: {
  label: string;
  value?: string;
  mono?: boolean;
  copyable?: boolean;
  fullValue?: string;
  children?: React.ReactNode;
}) {
  const handleCopy = () => {
    navigator.clipboard.writeText(fullValue || value || '');
    toast({ title: 'Copied', description: fullValue || value });
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="flex items-center gap-1.5">
        {children || (
          <span className={cn('text-sm', mono && 'font-mono text-xs')}>{value}</span>
        )}
        {copyable && (
          <button onClick={handleCopy} className="text-muted-foreground hover:text-foreground">
            <Copy className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  );
}
