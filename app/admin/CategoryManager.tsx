// app/admin/CategoryManager.tsx
'use client';

import React, { useState } from 'react';
import { Plus, X, Trash2, Tag, FolderPlus } from 'lucide-react';
import { createQuickCategory, deleteCategory } from './actions';

export default function CategoryManager({ categories }: { categories: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newCat, setNewCat] = useState('');
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState(categories);

  const handleAdd = async () => {
    if (!newCat.trim()) return;
    setLoading(true);
    const res = await createQuickCategory(newCat);
    if (res.success) {
      setList([...list, res.category]);
      setNewCat('');
    }
    setLoading(false);
  };

  const handleDelete = async (slug: string) => {
    if (confirm('Delete this category?')) {
      await deleteCategory(slug);
      setList(list.filter(c => c.slug !== slug));
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-md font-bold uppercase tracking-widest text-xs sm:text-sm flex items-center hover:bg-white/10 transition-colors shrink-0">
        <Tag className="w-4 h-4 mr-2" /> Manage Categories
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-brand-card w-full max-w-md rounded-md border border-white/10 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display text-xl uppercase">Manage Categories</h3>
              <button onClick={() => setIsOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            
            <div className="flex gap-2 mb-6">
              <input value={newCat} onChange={(e) => setNewCat(e.target.value)} placeholder="New Category Name" className="flex-1 bg-brand-dark px-3 py-2 rounded-md border border-white/10 outline-none" />
              <button onClick={handleAdd} disabled={loading} className="bg-brand-primary text-black px-4 py-2 rounded-md font-bold text-xs uppercase">{loading ? '...' : <FolderPlus className="w-4 h-4"/>}</button>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-auto">
              {list.map(c => (
                <div key={c.slug} className="flex justify-between items-center bg-brand-dark p-3 rounded-md border border-white/5">
                  <span className="text-sm">{c.name}</span>
                  <button onClick={() => handleDelete(c.slug)} className="text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4"/></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}