export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  sizes: string[];
  colors: string[];
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFlashDeal?: boolean;
  description: string;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Eleftheria Strappy Sandals",
    price: 3500,
    originalPrice: 4500,
    image: "https://picsum.photos/seed/shoes1/600/800",
    category: "Sandals",
    rating: 4.8,
    reviews: 124,
    sizes: ["37", "38", "39", "40", "41"],
    colors: ["Black", "Nude", "Gold"],
    isNewArrival: true,
    isFlashDeal: true,
    description:
      "Elegant strappy sandals perfect for evening wear or daytime glam. Featuring a comfortable minimal heel.",
  },
  {
    id: "p2",
    name: "Classic Pointed Stilettos",
    price: 4200,
    image: "https://picsum.photos/seed/shoes2/600/800",
    category: "Heels",
    rating: 4.9,
    reviews: 89,
    sizes: ["36", "37", "38", "39"],
    colors: ["Red", "Black", "Silver"],
    isBestSeller: true,
    description:
      "The quintessential stiletto for a sharp, confident look. A must-have for the office or a night out.",
  },
  {
    id: "p3",
    name: "Chunky Sole Sneakers",
    price: 5500,
    originalPrice: 6500,
    image: "https://picsum.photos/seed/shoes3/600/800",
    category: "Sneakers",
    rating: 4.6,
    reviews: 210,
    sizes: ["38", "39", "40", "41", "42"],
    colors: ["White", "Beige/Pink"],
    isBestSeller: true,
    isFlashDeal: true,
    description:
      "Step into maximum comfort with our premium chunky sneakers. Breathable, stylish, and durable.",
  },
  {
    id: "p4",
    name: "Suede Ankle Boots",
    price: 6000,
    image: "https://picsum.photos/seed/shoes4/600/800",
    category: "Boots",
    rating: 4.7,
    reviews: 56,
    sizes: ["37", "38", "39", "40"],
    colors: ["Camel", "Brown", "Black"],
    isNewArrival: true,
    description:
      "Soft genuine suede ankle boots with a manageable block heel. Pair with jeans or a dress for effortless style.",
  },
  {
    id: "p5",
    name: "Leather Loafer Flats",
    price: 2800,
    image: "https://picsum.photos/seed/shoes5/600/800",
    category: "Flats",
    rating: 4.5,
    reviews: 140,
    sizes: ["36", "37", "38", "39", "40", "41"],
    colors: ["Black", "Tan"],
    description:
      "Classic leather loafers designed for all-day comfort. Perfect for work settings or casual weekends.",
  },
  {
    id: "p6",
    name: "Crystal Embellished Mules",
    price: 4800,
    originalPrice: 5500,
    image: "https://picsum.photos/seed/shoes6/600/800",
    category: "Heels",
    rating: 4.9,
    reviews: 32,
    sizes: ["37", "38", "39", "40"],
    colors: ["Silver", "Champagne"],
    isNewArrival: true,
    description:
      "Make a statement with these gorgeous crystal-embellished low mules. Instantly elevates any outfit.",
  },
  {
    id: "p7",
    name: "Platform Wedge Espadrilles",
    price: 3200,
    image: "https://picsum.photos/seed/shoes7/600/800",
    category: "Sandals",
    rating: 4.4,
    reviews: 78,
    sizes: ["38", "39", "40", "41"],
    colors: ["Navy", "Cream"],
    isBestSeller: true,
    description:
      "Summer essential espadrille wedges. Comfortable height with a secure ankle strap.",
  },
  {
    id: "p8",
    name: "Minimalist White Trainers",
    price: 3800,
    image: "https://picsum.photos/seed/shoes8/600/800",
    category: "Sneakers",
    rating: 4.8,
    reviews: 412,
    sizes: ["36", "37", "38", "39", "40", "41"],
    colors: ["White", "Off-White"],
    isBestSeller: true,
    description:
      "Clean, simple, and versatile. The minimalist white trainer that goes with literally everything in your wardrobe.",
  },
];

export const getBestSellers = () => products.filter((p) => p.isBestSeller);
export const getNewArrivals = () => products.filter((p) => p.isNewArrival);
export const getFlashDeals = () => products.filter((p) => p.isFlashDeal);
export const getProductById = (id: string) => products.find((p) => p.id === id);
