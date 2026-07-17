// app/admin/layout.tsx
import { ArrowLeft } from 'lucide-react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Admin Dashboard | Shoe World',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  
  // Inline Server Action for logging out
  async function handleLogout() {
    'use server';
    const cookieStore = await cookies();
    cookieStore.delete('admin_session'); // Destroys the auth cookie
    redirect('/'); // Redirects the user back to the public storefront
  }

  return (
    <div className="h-screen w-full bg-brand-dark text-white flex flex-col overflow-hidden">
      {/* Clean Admin Header - explicitly sized and non-shrinkable */}
      <header className="bg-brand-card border-b border-white/10 px-6 py-4 flex justify-between items-center h-14 shrink-0 w-full">
        <div className="font-display text-xl uppercase tracking-widest text-brand-primary">
          Admin Control
        </div>
        
        {/* Replaced <Link> with a <form> executing the Server Action */}
        <form action={handleLogout}>
          <button 
            type="submit" 
            className="text-gray-400 hover:text-white flex items-center text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Exit Admin
          </button>
        </form>
      </header>
      
      {/* Admin Content Area - Fills the exact remaining height */}
      <main className="flex-1 min-h-0 relative">
        {children}
      </main>
    </div>
  );
}