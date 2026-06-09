// lib/data/brand.ts
import { Truck, MessageCircle, Star, Sparkles, Tag, CheckCircle, ShieldCheck } from 'lucide-react';

export const brand = {
  name: "Shoe World Kenya",
  tagline: "Step into Confidence",
  description:
    "We are home of quality thrifted shoes and T shirts",
    seo: {
    title: "Shoe World Kenya",
    description: "Premium quality thrifted shoes and T shirts",
  },
  whatsappNumber: "254754431222",
  whatsappMessage: {
    general:
      "Hello Shoe World Kenya,\n\nI would like to place an order.\n\nProduct(s):\n\nSize:\nQuantity:\nDelivery Location:\n\nPlease confirm availability and total price.\n\nThank you.",
  },
  socialLinks: {
    instagram: "https://instagram.com/diva_steps_collection",
    facebook: "https://facebook.com/diva_steps_collection",
    tiktok: "https://tiktok.com/@shoe_world_kenya",
  },
  deliveryInfo: {
    standard: "Ksh 300-500 for Percels Outside Nairobi",
    nairobi: "Ksh 100 for Deliveries/Drop offs Within CBD",
  },
  trustStatements: [
    "Fast Delivery Across Kenya",
    "Quality Checked",
    "WhatsApp Ordering",
    "Secure Ordering",
  ],
  features: [
    {
      title: "Premium Quality",
      description: "Every pair is carefully selected to ensure comfort, durability, and modern style."
    },
    {
      title: "Affordable Prices",
      description: "Get stylish footwear without overspending — value for money guaranteed."
    },
    {
      title: "Fast Delivery",
      description: "We process and deliver orders promptly so you receive your items as fast as possible across Kenya."
    },
    {
      title: "WhatsApp Ordering",
      description: "No complicated checkout — just message us and place your order instantly."
    }
  ],
  whatsappTrustSignals: [
    "Fast response within minutes",
    "Secure and reliable",
    "Quick delivery available",
    "Trusted across Kenya"
  ],
  whatsappMockChat: [
    {
      sender: "user",
      text: `Hello Shoe World Kenya

I'd like to order:

• Pearl & Rhinestone Luxury Statement Heels × 2
Size 38 | Cream/Silver

Delivery: Nairobi CBD

Subtotal: KSh 5,500

Please confirm availability, total payable and payment method.

Thank you.

`,
      time: "10:05 AM"
    },
    {
      sender: "brand",
      text: `Yes, it's available.

Total including delivery: KSh 6,100

You can pay via M-Pesa:
Till: XXXXXXX

Send the confirmation message once payment is complete.
`,
      time: "10:06 AM"
    }
  ],
  salesCallout: "200+ sold this week"
};

export const announcementMessages = [
  { text: "Fast Delivery Across Kenya", icon: Truck },
  { text: "Order Easily Via WhatsApp", icon: MessageCircle },
  { text: "New Arrivals Added Weekly", icon: Sparkles },
  { text: "Trusted by Hundreds of Happy Customers", icon: Star },
  { text: "Flash Deals Available Today", icon: Tag },
];

export const cartTrustFeatures = [
  { text: "Fast Delivery Across Kenya", icon: Truck },
  { text: "Quality Checked", icon: CheckCircle },
  { text: "Secure Ordering", icon: ShieldCheck },
  { text: "WhatsApp Support", icon: MessageCircle },
];

export const footerQuickShopLinks = [
  { label: "New Arrivals", href: "/shop" },
  { label: "Best Sellers", href: "/shop?category=best-sellers" },
  { label: "Heels", href: "/shop" },
  { label: "Sneakers", href: "/shop" },
  { label: "Flats & Sandals", href: "/shop" },
  { label: "Men's Clothing", href: "/shop"},
];

export const footerSupportLinks = [
  { label: "How to Order", href: "/how-to-order" },
  { label: "Delivery Info", href: "/delivery" },
  { label: "Size Guide", href: "/size-guide" },
  { label: "Returns & Exchanges", href: "/returns" },
  { label: "FAQ", href: "/faq" },
];