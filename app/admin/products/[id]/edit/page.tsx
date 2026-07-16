// app/admin/products/[id]/edit/page.tsx
import { getDb } from '@/lib/db';
import { products } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import EditFormClient from './EditFormClient';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const db = await getDb();
  
  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  const product = result[0];

  if (!product) return <div className="p-24 text-white text-center">Product not found</div>;

  return <EditFormClient product={product} />;
}