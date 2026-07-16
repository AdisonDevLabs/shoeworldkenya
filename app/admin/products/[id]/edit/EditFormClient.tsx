// app/admin/products/[id]/edit/EditFormClient.tsx
'use client';

import React, { useState } from 'react';
import { updateProduct } from '../../../actions';
import { Upload, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditFormClient({ product }: { product: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const response = await updateProduct(product.id, formData);
    
    setStatus({ success: response.success, message: response.success ? response.message : response.error });
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-brand-dark min-h-screen text-white pt-24">
      <div className="mb-8">
        <Link href="/admin" className="text-brand-primary text-sm flex items-center mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Link>
        <h1 className="font-display text-4xl uppercase tracking-wide">Edit Product</h1>
      </div>

      {status && (
        <div className={`p-4 rounded-md mb-6 ${status.success ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-brand-card p-6 rounded-md border border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Product Name</label>
            <input type="text" name="name" defaultValue={product.name} required className="w-full bg-brand-dark border border-white/10 rounded-md px-4 py-3 text-white outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Category</label>
            <select name="category" defaultValue={product.category} required className="w-full bg-brand-dark border border-white/10 rounded-md px-4 py-3 text-white outline-none">
              <option value="Men's Shoes">Men's Shoes</option>
              <option value="Women's Heels">Women's Heels</option>
              <option value="Sneakers">Sneakers</option>
              <option value="Unisex Sandals">Unisex Sandals</option>
              <option value="Men's Clothing">Men's Clothing</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Price (Ksh)</label>
            <input type="number" name="price" defaultValue={product.price} required className="w-full bg-brand-dark border border-white/10 rounded-md px-4 py-3 text-white outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Original Price</label>
            <input type="number" name="originalPrice" defaultValue={product.originalPrice || ''} className="w-full bg-brand-dark border border-white/10 rounded-md px-4 py-3 text-white outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Sizes (Comma separated)</label>
            <input type="text" name="sizes" defaultValue={product.sizes?.join(', ')} required className="w-full bg-brand-dark border border-white/10 rounded-md px-4 py-3 text-white outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Colors (Comma separated)</label>
            <input type="text" name="colors" defaultValue={product.colors?.join(', ')} required className="w-full bg-brand-dark border border-white/10 rounded-md px-4 py-3 text-white outline-none" />
          </div>
        </div>

        <div className="flex flex-wrap gap-6 py-4 border-y border-white/5">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input type="checkbox" name="isNewArrival" defaultChecked={product.isNewArrival} className="w-5 h-5 accent-brand-primary" />
            <span className="text-sm font-bold uppercase tracking-widest text-white">New Arrival</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input type="checkbox" name="isBestSeller" defaultChecked={product.isBestSeller} className="w-5 h-5 accent-brand-primary" />
            <span className="text-sm font-bold uppercase tracking-widest text-white">Best Seller</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input type="checkbox" name="isFlashDeal" defaultChecked={product.isFlashDeal} className="w-5 h-5 accent-brand-primary" />
            <span className="text-sm font-bold uppercase tracking-widest text-white">Flash Deal</span>
          </label>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Description</label>
          <textarea name="description" rows={4} defaultValue={product.description} required className="w-full bg-brand-dark border border-white/10 rounded-md px-4 py-3 text-white outline-none"></textarea>
        </div>

        <div className="bg-brand-dark p-6 rounded-md border border-white/5">
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 flex items-center">
             <Upload className="w-4 h-4 mr-2" /> Update Main Image (Leave blank to keep existing)
          </label>
          <input type="file" name="mainImage" accept="image/*" className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-white/10 file:text-white" />
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full h-14 bg-brand-primary text-black font-bold uppercase tracking-widest rounded-md disabled:opacity-50">
          {isSubmitting ? 'Saving...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
}