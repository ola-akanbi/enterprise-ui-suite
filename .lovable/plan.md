

## Final Polish Plan — 8.5 → 9+/10

### Phase 1 — Page Transitions & Navigation Feel
- Wrap `<Outlet />` in `AppLayout` with `framer-motion` `AnimatePresence` and a fade/slide transition component
- Each page gets a motion wrapper with `initial={{ opacity: 0, y: 8 }}`, `animate={{ opacity: 1, y: 0 }}`, `exit={{ opacity: 0 }}`
- Add breadcrumb navigation to Pulse Lookup and Address pages showing "Dashboard > Pulse Lookup > #abc123"

### Phase 2 — Interaction Feedback
- Show a success toast when wallet connects ("Wallet connected" with truncated address)
- Add a subtle gradient border/glow effect to the "Send a Pulse" CTA button on the dashboard
- Add copy-to-clipboard for tx hash in the Activity detail drawer with toast feedback

### Phase 3 — Favicon & Meta
- Replace default Vite favicon with a StackPulse-branded SVG favicon (Zap icon in primary blue circle)
- Update `index.html` meta description and OG tags for professional sharing

### Phase 4 — Minor Activity Drawer Enhancement
- Add "View on Explorer" button inside the Activity pulse detail drawer
- Add a copy button next to the tx hash field in the drawer

### Technical Approach
- **Page transitions:** Create a `PageTransition` wrapper component using `framer-motion`. Use `useLocation` key for `AnimatePresence`.
- **Breadcrumbs:** Use the existing `breadcrumb.tsx` UI component already in the project
- **Favicon:** Create an inline SVG favicon in `index.html` (no external file needed)
- **All changes are additive** — no breaking refactors

### Files to Create/Edit
- `src/components/PageTransition.tsx` — new motion wrapper
- `src/components/AppLayout.tsx` — wrap Outlet with AnimatePresence
- `src/components/Breadcrumbs.tsx` — new breadcrumb component for detail pages
- `src/pages/PulseLookup.tsx` — add breadcrumb
- `src/pages/AddressPage.tsx` — add breadcrumb
- `src/pages/Index.tsx` — upgrade CTA button styling
- `src/lib/wallet-context.tsx` — add toast on connect
- `src/pages/ActivityPage.tsx` — enhance detail drawer with copy/explorer
- `index.html` — favicon + meta tags

