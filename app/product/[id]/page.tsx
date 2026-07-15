// app/product/[id]/page.tsx
import { Metadata } from 'next';
import { dummyProducts } from '@/lib/data';
import { brand } from '@/lib/data/brand';
import ProductDetails from './ProductDetailsClient';

// 1. Generate dynamic metadata for WhatsApp Open Graph previews
export async function generateMetadata({ params }): Promise<Metadata> {
  const { id } = params;
  
  // Find the specific product
  const product = dummyProducts.find(p => p.id === id);
  
  if (!product) {
    return { title: 'Product Not Found' };
  }

  // Determine the primary image for the WhatsApp preview
  const primaryImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : product.image;

  return {
    title: `${product.name} | ${brand.seo.title}`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: `Order the ${product.name} directly on WhatsApp.`,
      url: `https://shoeworldkenya.vercel.app/product/${id}`, // Ensure this points to your production URL
      siteName: 'Shoe World Kenya',
      images: [
        {
          url: primaryImage, // This is the image WhatsApp will unfurl
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
      type: 'website',
    },
  };
}

// 2. Render the interactive Client Component
export default function ProductPage({ params }) {
  // Pass the params down to your client component so it can handle the UI
  return <ProductDetailsClient params={params} />;
}