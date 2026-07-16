// app/admin/actions.ts
'use server';

import { getCloudflareContext } from '@opennextjs/cloudflare';
import { getDb } from '@/lib/db';
import { products, categories } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

const R2_PUBLIC_URL = 'https://pub-22a2ca70d18d4e32a7cf45d56477c7f9.r2.dev'; 

export async function createProduct(formData: FormData) {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const db = await getDb();

    const mainImageFile = formData.get('mainImage') as File;
    if (!mainImageFile || mainImageFile.size === 0) throw new Error('Main image is required');

    const mainImageKey = `products/${Date.now()}-${mainImageFile.name.replace(/\s+/g, '-')}`;
    await env.PRODUCT_IMAGES.put(mainImageKey, await mainImageFile.arrayBuffer(), { httpMetadata: { contentType: mainImageFile.type } });
    const mainImageUrl = `${R2_PUBLIC_URL}/${mainImageKey}`;

    const newProduct = {
      id: `p-${Date.now()}`,
      name: formData.get('name') as string,
      price: parseInt(formData.get('price') as string, 10),
      originalPrice: formData.get('originalPrice') ? parseInt(formData.get('originalPrice') as string, 10) : null,
      image: mainImageUrl,
      images: [mainImageUrl], // Simplified for brevity; loop gallery images here if needed
      category: formData.get('category') as string,
      description: formData.get('description') as string,
      sizes: (formData.get('sizes') as string).split(',').map(s => s.trim()).filter(Boolean),
      colors: (formData.get('colors') as string).split(',').map(c => c.trim()).filter(Boolean),
      isNewArrival: formData.get('isNewArrival') === 'on',
      isBestSeller: formData.get('isBestSeller') === 'on',
      isFlashDeal: formData.get('isFlashDeal') === 'on',
      rating: 5.0,
      reviews: 0,
      created_at: new Date().toISOString(),
    };

    await db.insert(products).values(newProduct);
    revalidatePath('/shop');
    revalidatePath('/');
    revalidatePath('/admin');

    return { success: true, message: 'Product created successfully!' };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateProduct(id: string, formData: FormData) {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const db = await getDb();

    // Fetch existing to keep old images if new ones aren't uploaded
    const existing = await db.select().from(products).where(eq(products.id, id)).limit(1);
    if (!existing[0]) throw new Error('Product not found');

    let mainImageUrl = existing[0].image;
    
    // Upload new image if provided
    const mainImageFile = formData.get('mainImage') as File;
    if (mainImageFile && mainImageFile.size > 0) {
      const mainImageKey = `products/${Date.now()}-${mainImageFile.name.replace(/\s+/g, '-')}`;
      await env.PRODUCT_IMAGES.put(mainImageKey, await mainImageFile.arrayBuffer(), { httpMetadata: { contentType: mainImageFile.type } });
      mainImageUrl = `${R2_PUBLIC_URL}/${mainImageKey}`;
    }

    const updatedData = {
      name: formData.get('name') as string,
      price: parseInt(formData.get('price') as string, 10),
      originalPrice: formData.get('originalPrice') ? parseInt(formData.get('originalPrice') as string, 10) : null,
      image: mainImageUrl,
      category: formData.get('category') as string,
      description: formData.get('description') as string,
      sizes: (formData.get('sizes') as string).split(',').map(s => s.trim()).filter(Boolean),
      colors: (formData.get('colors') as string).split(',').map(c => c.trim()).filter(Boolean),
      isNewArrival: formData.get('isNewArrival') === 'on',
      isBestSeller: formData.get('isBestSeller') === 'on',
      isFlashDeal: formData.get('isFlashDeal') === 'on',
    };

    await db.update(products).set(updatedData).where(eq(products.id, id));
    
    revalidatePath('/shop');
    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath(`/product/${id}`);

    return { success: true, message: 'Product updated successfully!' };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteProduct(id: string) {
  try {
    const db = await getDb();
    await db.delete(products).where(eq(products.id, id));
    
    revalidatePath('/shop');
    revalidatePath('/');
    revalidatePath('/admin');
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createQuickCategory(name: string) {
  try {
    const db = await getDb();
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    await db.insert(categories).values({
      slug,
      name,
      label: 'New Category',
      image: '/pexels-wedding-maps-130174465-10114295.jpg', // Safe fallback image from your existing assets
      span: 'md:col-span-2'
    });
    
    revalidatePath('/admin');
    return { success: true, category: { name, slug } };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Add these to app/admin/actions.ts
export async function createCategory(formData: FormData) {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const db = await getDb();
    
    const imageFile = formData.get('image') as File;
    const name = formData.get('name') as string;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    let imageUrl = '/placeholder.jpg';
    if (imageFile && imageFile.size > 0) {
      const key = `categories/${slug}-${Date.now()}`;
      await env.PRODUCT_IMAGES.put(key, await imageFile.arrayBuffer(), { httpMetadata: { contentType: imageFile.type } });
      imageUrl = `https://pub-22a2ca70d18d4e32a7cf45d56477c7f9.r2.dev/${key}`;
    }

    await db.insert(categories).values({ slug, name, image: imageUrl, label: 'New Collection' });
    revalidatePath('/admin');
    return { success: true };
  } catch (e: any) { return { success: false, error: e.message }; }
}

export async function deleteCategory(slug: string) {
  const db = await getDb();
  await db.delete(categories).where(eq(categories.slug, slug));
  revalidatePath('/admin');
  return { success: true };
}