// app/admin/actions.ts
'use server';

import { getCloudflareContext } from '@opennextjs/cloudflare';
import { getDb } from '@/lib/db';
import { products } from '@/lib/db/schema';
import { revalidatePath } from 'next/cache';

// Replace this with your actual R2 public URL from the Cloudflare Dashboard
const R2_PUBLIC_URL = 'https://pub-22a2ca70d18d4e32a7cf45d56477c7f9.r2.dev'; 

export async function createProduct(formData: FormData) {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const db = await getDb();

    // 1. Extract files from FormData
    const mainImageFile = formData.get('mainImage') as File;
    const additionalImageFiles = formData.getAll('galleryImages') as File[];

    if (!mainImageFile || mainImageFile.size === 0) {
      throw new Error('Main image is required');
    }

    // 2. Upload Main Image to R2
    const mainImageKey = `products/${Date.now()}-${mainImageFile.name.replace(/\s+/g, '-')}`;
    const mainImageBuffer = await mainImageFile.arrayBuffer();
    
    await env.PRODUCT_IMAGES.put(mainImageKey, mainImageBuffer, {
      httpMetadata: { contentType: mainImageFile.type },
    });
    
    const mainImageUrl = `${R2_PUBLIC_URL}/${mainImageKey}`;

    // 3. Upload Gallery Images to R2
    const galleryUrls: string[] = [mainImageUrl]; // Always include main image in gallery
    for (const file of additionalImageFiles) {
      if (file.size > 0) {
        const key = `products/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const buffer = await file.arrayBuffer();
        await env.PRODUCT_IMAGES.put(key, buffer, {
          httpMetadata: { contentType: file.type },
        });
        galleryUrls.push(`${R2_PUBLIC_URL}/${key}`);
      }
    }

    // 4. Parse text inputs and formatting
    const sizesString = formData.get('sizes') as string;
    const colorsString = formData.get('colors') as string;

    const newProduct = {
      id: `p-${Date.now()}`, // Simple ID generation
      name: formData.get('name') as string,
      price: parseInt(formData.get('price') as string, 10),
      originalPrice: formData.get('originalPrice') ? parseInt(formData.get('originalPrice') as string, 10) : null,
      image: mainImageUrl,
      images: galleryUrls,
      category: formData.get('category') as string,
      description: formData.get('description') as string,
      sizes: sizesString.split(',').map(s => s.trim()).filter(Boolean),
      colors: colorsString.split(',').map(c => c.trim()).filter(Boolean),
      isNewArrival: formData.get('isNewArrival') === 'on',
      isBestSeller: formData.get('isBestSeller') === 'on',
      isFlashDeal: formData.get('isFlashDeal') === 'on',
      rating: 5.0, // Default for new products
      reviews: 0,
      created_at: new Date().toISOString(),
    };

    // 5. Insert into D1 Database
    await db.insert(products).values(newProduct);

    // 6. Purge the cache so the shop updates instantly
    revalidatePath('/shop');
    revalidatePath('/');

    return { success: true, message: 'Product created successfully!' };
  } catch (error: any) {
    console.error('Failed to create product:', error);
    return { success: false, error: error.message };
  }
}