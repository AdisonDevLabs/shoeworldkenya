// app/admin/CategoryManager.tsx
'use client';

import React, { useState } from 'react';
import { X, Trash2, Tag, Upload, FolderPlus } from 'lucide-react';
import { createCategory, deleteCategory } from './actions';

export default function CategoryManager({ categories }: { categories: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState(categories);

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const res = await createCategory(formData);
    
    if (res.success && res.category) {
      // Optimistically update the list without refreshing
      setList([...list, { slug: res.category.slug, name: res.category.name }]);
      (e.target as HTMLFormElement).reset();
    } else {
      alert(res.error);
    }
    setLoading(false);
  };

  const handleDelete = async (slug: string) => {
    if (confirm('Delete this category? Products in this category will lose their filter association.')) {
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
          <div className="bg-brand-card w-full max-w-md rounded-md border border-white/10 p-6 flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center mb-6 shrink-0">
              <h3 className="font-display text-xl uppercase">Manage Categories</h3>
              <button onClick={() => setIsOpen(false)}><X className="w-5 h-5 hover:text-brand-primary transition-colors" /></button>
            </div>
            
            {/* Full Form for Category Creation */}
            <form onSubmit={handleAdd} className="space-y-4 mb-6 shrink-0 bg-brand-dark p-4 rounded-md border border-white/5">
              <input type="text" name="name" required placeholder="Category Name (e.g. Men's Shoes)" className="w-full bg-brand-dark px-3 py-2 rounded-md border border-white/10 outline-none focus:border-brand-primary text-sm" />
              <input type="text" name="label" required placeholder="Marketing Label (e.g. Trending Now)" className="w-full bg-brand-dark px-3 py-2 rounded-md border border-white/10 outline-none focus:border-brand-primary text-sm" />
              
              <div className="flex items-center justify-between bg-brand-card px-3 py-2 rounded-md border border-white/10">
                 <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Grid Span:</span>
                 <select name="span" className="bg-transparent text-sm text-white outline-none cursor-pointer">
                    <option value="md:col-span-2">Half Width (col-span-2)</option>
                    <option value="md:col-span-4">Full Width (col-span-4)</option>
                 </select>
              </div>

              <div className="border border-white/10 p-3 rounded-md flex items-center">
                <Upload className="w-4 h-4 mr-2 text-gray-400" />
                <input type="file" name="image" accept="image/*" required className="text-xs text-gray-400 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer w-full" />
              </div>
              
              <button type="submit" disabled={loading} className="w-full bg-brand-primary text-black px-4 py-3 rounded-md font-bold text-xs uppercase tracking-widest hover:bg-brand-hover transition-colors disabled:opacity-50 flex items-center justify-center">
                {loading ? 'Uploading...' : <><FolderPlus className="w-4 h-4 mr-2"/> Add Category</>}
              </button>
            </form>

            {/* List of Existing Categories */}
            <div className="space-y-2 overflow-auto scrollbar-hide flex-1">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Existing Categories</h4>
              {list.map(c => (
                <div key={c.slug} className="flex justify-between items-center bg-brand-dark p-3 rounded-md border border-white/5">
                  <span className="text-sm font-medium">{c.name}</span>
                  <button onClick={() => handleDelete(c.slug)} className="text-red-400 hover:text-red-300 transition-colors p-1"><Trash2 className="w-4 h-4"/></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}