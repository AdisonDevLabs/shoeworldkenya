// app/page.tsx
import { getDb } from '@/lib/db';
import { products, categories, testimonials } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import HomeClient from './HomeClient';

// Cache the homepage data so you aren't hitting Cloudflare D1 on every single page load
export const revalidate = 60; 

export default async function HomePage() {
  const db = getDb();

  // 1. Fetch all active products
  const allProducts = await db.select().from(products);
  
  // 2. Fetch the top 5 featured categories for the horizontal scroll
  const heroCategories = await db.select().from(categories).limit(5);
  
  // 3. Fetch only the global testimonials designated for the homepage
  const globalTestimonials = await db
    .select()
    .from(testimonials)
    .where(eq(testimonials.isGlobal, true));

  return (
    <HomeClient 
      initialProducts={allProducts} 
      initialCategories={heroCategories} 
      initialTestimonials={globalTestimonials} 
    />
  );
}