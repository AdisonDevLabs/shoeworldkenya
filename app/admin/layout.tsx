// app/admin/layout.tsx
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Admin Dashboard | Shoe World',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full bg-brand-dark text-white flex flex-col overflow-hidden">
      {/* Clean Admin Header - explicitly sized and non-shrinkable */}
      <header className="bg-brand-card border-b border-white/10 px-6 py-4 flex justify-between items-center h-14 shrink-0 w-full">
        <div className="font-display text-xl uppercase tracking-widest text-brand-primary">
          Admin Control
        </div>
        <Link href="/" className="text-gray-400 hover:text-white flex items-center text-xs font-bold uppercase tracking-widest transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Exit Admin
        </Link>
      </header>
      
      {/* Admin Content Area - Fills the exact remaining height */}
      <main className="flex-1 min-h-0 relative">
        {children}
      </main>
    </div>
  );
}