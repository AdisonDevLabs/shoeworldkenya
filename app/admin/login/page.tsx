// app/admin/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // This is a simple client-side check for the demo
    // In production, you would ideally verify this against an API
    if (password === process.env.NEXT_PUBLIC_ADMIN_SECRET) {
      document.cookie = `admin_token=${password}; path=/; max-age=86400`; // 24hr session
      router.push('/admin');
    } else {
      alert('Unauthorized');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-brand-dark text-white">
      <form onSubmit={handleLogin} className="p-8 bg-brand-card rounded-md border border-white/10">
        <h2 className="mb-4 text-xl uppercase tracking-widest">Admin Access</h2>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-brand-dark p-3 border border-white/10 mb-4 text-black"
        />
        <button className="w-full bg-brand-primary text-black p-3 font-bold uppercase">Login</button>
      </form>
    </div>
  );
}