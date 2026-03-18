import { Outlet } from 'react-router-dom';
import { AppNav } from './AppNav';
import { Footer } from './Footer';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppNav />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
