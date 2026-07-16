// app/admin/products/new/page.tsx
'use client';

import React, { useState } from 'react';
import { createProduct } from '../../actions';
import { Upload, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewProductForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    
    // Call the server action
    const response = await createProduct(formData);
    
    setStatus({
      success: response.success,
      message: response.success ? response.message : response.error
    });
    
    if (response.success) {
      (e.target as HTMLFormElement).reset(); // Clear the form on success
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-brand-dark min-h-screen text-white">
      <div className="mb-8">
        <Link href="/admin" className="text-brand-primary text-sm flex items-center mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Link>
        <h1 className="font-display text-4xl uppercase tracking-wide">Add New Product</h1>
      </div>

      {status && (
        <div className={`p-4 rounded-md mb-6 ${status.success ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'}`}>
          {status.success && <CheckCircle className="w-5 h-5 inline mr-2" />}
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-brand-card p-6 rounded-md border border-white/5">
        
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Product Name</label>
            <input type="text" name="name" required className="w-full bg-brand-dark border border-white/10 rounded-md px-4 py-3 text-white focus:border-brand-primary outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Category</label>
            <select name="category" required className="w-full bg-brand-dark border border-white/10 rounded-md px-4 py-3 text-white focus:border-brand-primary outline-none">
              <option value="Men's Shoes">Men's Shoes</option>
              <option value="Women's Heels">Women's Heels</option>
              <option value="Sneakers">Sneakers</option>
              <option value="Unisex Sandals">Unisex Sandals</option>
            </select>
          </div>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Selling Price (Ksh)</label>
            <input type="number" name="price" required className="w-full bg-brand-dark border border-white/10 rounded-md px-4 py-3 text-white focus:border-brand-primary outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Original Price (Optional - for strikethrough)</label>
            <input type="number" name="originalPrice" className="w-full bg-brand-dark border border-white/10 rounded-md px-4 py-3 text-white focus:border-brand-primary outline-none" />
          </div>
        </div>

        {/* Variants */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Sizes (Comma separated)</label>
            <input type="text" name="sizes" placeholder="e.g. 39, 40, 41, 42" required className="w-full bg-brand-dark border border-white/10 rounded-md px-4 py-3 text-white focus:border-brand-primary outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Colors (Comma separated)</label>
            <input type="text" name="colors" placeholder="e.g. Black, White/Gum" required className="w-full bg-brand-dark border border-white/10 rounded-md px-4 py-3 text-white focus:border-brand-primary outline-none" />
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-6 py-4 border-y border-white/5">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input type="checkbox" name="isNewArrival" className="w-5 h-5 accent-brand-primary bg-brand-dark border-white/10" />
            <span className="text-sm font-bold uppercase tracking-widest text-white">New Arrival</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input type="checkbox" name="isBestSeller" className="w-5 h-5 accent-brand-primary bg-brand-dark border-white/10" />
            <span className="text-sm font-bold uppercase tracking-widest text-white">Best Seller</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input type="checkbox" name="isFlashDeal" className="w-5 h-5 accent-brand-primary bg-brand-dark border-white/10" />
            <span className="text-sm font-bold uppercase tracking-widest text-white">Flash Deal</span>
          </label>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Description</label>
          <textarea name="description" rows={4} required className="w-full bg-brand-dark border border-white/10 rounded-md px-4 py-3 text-white focus:border-brand-primary outline-none"></textarea>
        </div>

        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-brand-dark p-6 rounded-md border border-white/5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 flex items-center">
               <Upload className="w-4 h-4 mr-2" /> Main Image (Required)
            </label>
            <input type="file" name="mainImage" accept="image/*" required className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-bold file:bg-brand-primary file:text-black hover:file:bg-brand-hover" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 flex items-center">
              <Upload className="w-4 h-4 mr-2" /> Gallery Images (Optional, multiple allowed)
            </label>
            <input type="file" name="galleryImages" accept="image/*" multiple className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-bold file:bg-white/10 file:text-white hover:file:bg-white/20" />
          </div>
        </div>

        {/* Submit */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full h-14 bg-brand-primary text-black font-bold uppercase tracking-widest rounded-md hover:bg-brand-hover transition-colors disabled:opacity-50 flex items-center justify-center"
        >
          {isSubmitting ? 'Uploading & Saving...' : 'Publish Product'}
        </button>
      </form>
    </div>
  );
}