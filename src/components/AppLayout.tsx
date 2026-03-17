import { Outlet } from 'react-router-dom';
import { AppNav } from './AppNav';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
