

## Plan: Notification History Panel, Sound Effects & Mobile QA

### Feature 1 — Notification History Panel

**Approach:** Create a shared notification store (React context) that captures every fired pulse notification with timestamp. Add a bell icon button in the navbar that opens a popover/sheet showing the last 20 notifications.

**Files to create/edit:**
- **Create** `src/lib/notification-store.tsx` — React context with state array (max 20 items), `addNotification()` function, and `clearAll()`
- **Edit** `src/hooks/use-pulse-notifications.ts` — When firing a notification, also push it into the notification store
- **Create** `src/components/NotificationPanel.tsx` — Popover (desktop) / Sheet (mobile) triggered by a bell icon button. Shows scrollable list of notifications with relative timestamps, sender, amount, message. Badge counter for unread count. "Clear all" button at the bottom.
- **Edit** `src/components/AppNav.tsx` — Add the NotificationPanel bell icon button between ThemeToggle and NetworkBadge in the right section
- **Edit** `src/components/AppLayout.tsx` — Wrap with NotificationProvider

**Notification item shape:**
```
{ id, sender, amount, message, timestamp, read }
```

### Feature 2 — Sound Effects with Mute Toggle

**Approach:** Use the Web Audio API to generate a short synthetic chime (no audio file needed). Add a `soundEnabled` localStorage toggle.

**Files to create/edit:**
- **Create** `src/lib/notification-sound.ts` — `playNotificationSound()` function using `AudioContext` to play a short sine-wave chime (440Hz, 100ms fade). Reads `localStorage` for mute state.
- **Edit** `src/hooks/use-pulse-notifications.ts` — Call `playNotificationSound()` when firing a notification
- **Edit** `src/pages/SettingsPage.tsx` — Add "Sound Effects" toggle under the Notifications section, persisted to `localStorage` key `stackpulse-sound-enabled`

### Feature 3 — Mobile Responsiveness QA at 375px

After implementing features 1 and 2, test at 375px viewport:
- Hamburger nav opens/closes correctly
- Notification panel renders as a Sheet (not popover) on mobile
- Dashboard metric cards stack vertically
- Activity table scrolls horizontally
- Send Pulse form fields are full-width
- Breadcrumbs wrap properly
- Fix any overflow or layout issues found

### Implementation Order
1. Notification store context
2. Notification panel component
3. Wire into AppNav and pulse notifications hook
4. Sound effect utility
5. Settings page sound toggle
6. Mobile responsiveness testing and fixes

