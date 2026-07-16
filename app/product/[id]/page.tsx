// app/product/[id]/page.tsx
import { Metadata } from 'next';
import { brand } from '@/lib/data/brand';
import ProductDetailsClient from './ProductDetailsClient';
import { getDb } from '@/lib/db';
import { products } from '@/lib/db/schema';
import { eq, and, not, sql } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const db = await getDb();
  
  // Find the product to generate specific metadata
  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  const product = result[0];
  
  if (!product) {
    return { title: 'Product Not Found' };
  }

  const previewImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : product.image;

  return {
    title: `${product.name} | ${brand.name}`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: `Order the ${product.name} directly on WhatsApp.`,
      url: `${brand.url}/product/${id}`,
      siteName: brand.name,
      images: [
        {
          url: previewImage,
          width: 800,
          height: 800,
          alt: `${product.name} preview image`,
        },
      ],
      type: 'website',
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const db = await getDb();
  
  // 1. Fetch the main product
  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  const product = result[0];

  if (!product) {
    return <ProductDetailsClient product={null} relatedProducts={[]} recentlyViewed={[]} />;
  }

  // 2. Fetch related products (same category, excluding the current product, limit 4)
  const relatedProducts = await db.select()
    .from(products)
    .where(and(eq(products.category, product.category), not(eq(products.id, product.id))))
    .limit(4);

  // 3. Fetch recently viewed/others (randomized products excluding the current one, limit 8)
  const recentlyViewed = await db.select()
    .from(products)
    .where(not(eq(products.id, product.id)))
    .orderBy(sql`RANDOM()`)
    .limit(8);

  return (
    <ProductDetailsClient 
      product={product} 
      relatedProducts={relatedProducts} 
      recentlyViewed={recentlyViewed} 
    />
  );
}