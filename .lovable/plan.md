

## StackPulse — Enterprise Frontend UI Plan

### Overview
StackPulse is an on-chain micro-tipping protocol on Stacks. We'll build a production-ready, enterprise-grade frontend with mock data (no live blockchain integration), following the design brief's dense, geometric, utility-first aesthetic.

---

### Pages & Routes

**1. Home / Dashboard (`/`)**
- Protocol stats cards: Total Pulses, Total Volume, Platform Fees — large numeric callouts with tabular numbers
- Recent activity feed (5–10 latest pulses) with sender/recipient/amount/message
- Hero CTA: "Send a Pulse" button prominently placed
- Network health indicator badge

**2. Send Pulse (`/send`)**
- Multi-step transaction composer:
  - **Inputs:** Recipient address, amount (STX/microSTX toggle), optional message (280 char limit with counter)
  - **Inline validation:** Address format, self-send guard, amount > 0, message length
  - **Fee preview panel:** Shows amount, protocol fee, net recipient amount
  - **Transaction stepper:** Draft → Ready → Wallet Approval → Broadcasted → Pending → Confirmed/Failed
- Success state: Pulse ID, tx hash, explorer link, "Send Another" action
- Failure state: Error category, retry button, diagnostic copy

**3. Activity Feed (`/activity`)**
- Filterable table/list of recent pulses
- Filters: sender, recipient, min amount, date range
- Pagination with deterministic ordering
- Click row → side-peek drawer with pulse details
- Skeleton loading states

**4. Address Insights (`/address`)**
- Address lookup input
- User stats panel: Pulses Sent, Pulses Received, Total Sent, Total Received
- Activity slice for that address
- Empty state when no data found

**5. Pulse Lookup (`/pulse`)**
- Pulse ID search input
- Detail card: sender, recipient, amount, message, block height, timestamp
- Deep-linkable URLs (`/pulse/:id`)

**6. Settings/Help (`/settings`)**
- Network selector (testnet/mainnet toggle)
- Docs links, support diagnostics export button
- App version info

---

### App Shell & Navigation
- **Top navigation bar:** StackPulse logo, nav links, network badge (testnet/mainnet chip), wallet connect button
- Wallet connect/disconnect with mock address display and copy-to-clipboard
- Network mismatch warning banner
- Global toast system for transaction status updates

---

### Core Components
- **MetricCard** — Reusable stat display with label, value, optional trend indicator
- **WalletButton** — Connect/disconnect with address chip and network indicator
- **NetworkBadge** — Testnet (amber) / Mainnet (green) indicator
- **TransactionStepper** — Visual progress through tx lifecycle states
- **FeeBreakdown** — Amount, fee, net display with clear formatting
- **PulseComposer** — The send form with validation and preview
- **ActivityTable** — Sortable, filterable pulse list
- **PulseDetailDrawer** — Side-peek panel for inspecting a pulse
- **FilterBar** — Reusable filter controls for activity views
- **Skeleton loaders** for all data surfaces

---

### Design System
- Dark charcoal primary palette per design brief, with precision blue accent for CTAs and interactive elements
- Semantic colors: success (green), error (red), warning (amber), info (blue) — used sparingly per anti-patterns
- Tabular numbers for all financial values, STX formatting with precision-safe display
- Layered shadows instead of borders, 6px/12px radius system
- `Geist Sans`-inspired typography scale (12/14/16/20/32px)
- Light theme (dark theme tokens prepared but light as default)

---

### Data Layer
- All data mocked with realistic Stacks addresses and STX amounts
- Typed models: `Pulse`, `UserStats`, `PlatformStats`, `TxLifecycleState`
- Mock service layer that simulates async contract reads and tx lifecycle
- React Query for data fetching patterns (cache, loading, error states)

---

### Key UX Details
- Keyboard accessible throughout, proper focus management
- ARIA live regions for transaction status announcements
- Address display with truncation and copy button
- STX/microSTX toggle with precision-safe conversion
- All empty, loading, and error states designed (no cartoon illustrations — structured checklists/skeletons per brief)
- Responsive web layout (no mobile app, but mobile-friendly)

