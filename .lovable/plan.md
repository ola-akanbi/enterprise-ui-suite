

## Real-Time Pulse Notifications

### What It Does
A simulated real-time notification system that periodically generates incoming pulse transactions and displays them as toast notifications. This creates the feel of a live, active protocol even with mock data.

### How It Works

**1. Notification Engine (`src/hooks/use-pulse-notifications.ts`)**
- Custom hook that runs an interval (every 8-15 seconds, randomized) generating mock incoming pulses
- Each notification includes: sender address (truncated), amount in STX, and message snippet
- Uses the existing `toast()` system from `use-toast` with a custom style variant
- Only fires when wallet is connected (simulates receiving pulses to your address)
- Provides `enabled` toggle so users can turn it off in Settings
- Stores enabled/disabled preference in localStorage

**2. Notification Toast Styling**
- Add a new toast variant or use a custom class for incoming pulse toasts — subtle blue/indigo left border accent to distinguish from standard toasts
- Toast shows: "Incoming Pulse" title, "SP1HT...S8QE sent 12.50 STX" description, with a small Zap icon

**3. Integration Points**
- Mount the hook in `AppLayout.tsx` so it runs app-wide when wallet is connected
- Add "Pulse Notifications" toggle switch to `SettingsPage.tsx` under a new "Notifications" section
- Increase `TOAST_LIMIT` from 1 to 3 in `use-toast.ts` so multiple notifications can stack

**4. Notification Queue Logic**
- Keep a small queue (max 3 visible toasts) — older ones auto-dismiss after 5 seconds
- Each new pulse uses a random sender from the existing `ADDRESSES` array and a random message from `MESSAGES`
- Random amount between 0.5 and 50 STX

### Files to Create/Edit
- **Create** `src/hooks/use-pulse-notifications.ts` — notification engine hook
- **Edit** `src/components/AppLayout.tsx` — mount the notification hook
- **Edit** `src/pages/SettingsPage.tsx` — add notifications toggle
- **Edit** `src/hooks/use-toast.ts` — increase toast limit to 3, reduce remove delay

### Technical Details
- No new dependencies required — uses existing toast system, mock data arrays, and wallet context
- Interval cleanup handled by useEffect return
- localStorage key: `stackpulse-notifications-enabled` (default: true)

