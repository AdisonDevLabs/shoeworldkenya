// app/product/[id]/page.tsx
import { Metadata } from 'next';
import { dummyProducts } from '@/lib/data';
import { brand } from '@/lib/data/brand';
import ProductDetailsClient from './ProductDetailsClient';

type Props = {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  // Find the product to generate specific metadata
  const product = dummyProducts.find(p => p.id === id);
  
  if (!product) {
    return { title: 'Product Not Found' };
  }

  // Determine the primary image to show in the WhatsApp preview
  const previewImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : product.image;

  return {
    title: `${product.name} | ${brand.name}`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: `Order the ${product.name} directly on WhatsApp.`,
      url: `${brand.url}/product/${id}`, // Inherits base URL from your brand data
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

export default function ProductPage() {
  return <ProductDetailsClient />;
}