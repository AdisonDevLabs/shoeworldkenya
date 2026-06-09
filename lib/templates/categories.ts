export interface Category {
  name: string;
  slug: string;
  label?: string;
  image: string;
  span?: string;
}

export const categories: Category[] = [
  {
    name: "HEELS",
    slug: "heels",
    label: "Trending Now",
    image: "https://picsum.photos/seed/editorialheels/800/1000",
    span: "md:col-span-2",
  },
  {
    name: "SNEAKERS",
    slug: "sneakers",
    label: "Everyday Comfort",
    image: "https://picsum.photos/seed/editorialsneakers/800/1000",
    span: "md:col-span-2",
  },
  {
    name: "SANDALS",
    slug: "sandals",
    label: "Best Sellers",
    image: "https://picsum.photos/seed/editorialsandals/800/1000",
    span: "md:col-span-2",
  },
  {
    name: "OFFICE SHOES",
    slug: "office",
    label: "Workwear",
    image: "https://picsum.photos/seed/editorialoffice/1200/800",
    span: "md:col-span-3",
  },
  {
    name: "PARTY WEAR",
    slug: "party",
    label: "Occasion",
    image: "https://picsum.photos/seed/editorialparty/1200/800",
    span: "md:col-span-3",
  },
  {
    name: "BOOTS",
    slug: "boots",
    label: "New Arrivals",
    image: "https://picsum.photos/seed/shoes4/600/800",
    span: "md:col-span-2",
  },
  {
    name: "FLATS",
    slug: "flats",
    label: "Casual",
    image: "https://picsum.photos/seed/shoes5/600/800",
    span: "md:col-span-2",
  },
];

export const heroCategories = categories.slice(0, 5);
