// app/admin/layout.tsx
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Admin Dashboard | Shoe World',
  robots: 'noindex, nofollow', // Prevent search engines from indexing the admin panel
};

export default function AdminLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="min-h-screen bg-brand-dark text-white">
      {/* Clean Admin Header */}
      <header className="bg-brand-card border-b border-white/10 px-6 py-4 flex justify-between items-center fixed top-0 w-full z-50">
        <div className="font-display text-xl uppercase tracking-widest text-brand-primary">
          Admin Control
        </div>
        <Link href="/" className="text-gray-400 hover:text-white flex items-center text-xs font-bold uppercase tracking-widest transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Exit Admin
        </Link>
      </header>
      
      {/* Admin Content Area - Removed mobile bottom nav padding */}
      <main className="pt-[72px]">
        {children}
      </main>
    </div>
  );
}