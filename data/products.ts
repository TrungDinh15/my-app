export interface Product {
  id: number;
  name: string;
  image: string;
  alt: string;
  description: string;
  price: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones Pro",
    image: "/products/headphones.jpg",
    alt: "Premium wireless headphones with rose gold accents",
    description:
      "Premium noise-cancelling headphones with 40-hour battery life, deep bass, and ultra-comfortable ear cushions.",
    price: "$149.99",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    image: "/products/smartwatch.jpg",
    alt: "Modern smartwatch with fitness tracking display",
    description:
      "Track your health and fitness with heart rate monitoring, GPS, sleep tracking, and a stunning AMOLED display.",
    price: "$249.00",
  },
  {
    id: 3,
    name: "Portable Bluetooth Speaker",
    image: "/products/speaker.jpg",
    alt: "Navy blue portable Bluetooth speaker",
    description:
      "Waterproof speaker with 360° sound, 12-hour playtime, and rugged design perfect for outdoor adventures.",
    price: "$79.99",
  },
  {
    id: 4,
    name: "Mechanical RGB Keyboard",
    image: "/products/keyboard.jpg",
    alt: "Mechanical keyboard with RGB backlighting and white keycaps",
    description:
      "Compact 75% layout with hot-swappable switches, per-key RGB lighting, and a premium aluminum frame.",
    price: "$129.95",
  },
  {
    id: 5,
    name: "Mirrorless Camera X-T4",
    image: "/products/camera.jpg",
    alt: "Mirrorless digital camera with lens attached",
    description:
      "26.1 MP sensor, 4K video at 60fps, in-body image stabilization, and classic retro design for creators.",
    price: "$1,499.00",
  },
  {
    id: 6,
    name: "Urban Laptop Backpack",
    image: "/products/backpack.jpg",
    alt: "Dark gray laptop backpack with leather accents",
    description:
      "Fits up to 16\" laptops with padded compartments, water-resistant canvas, and genuine leather details.",
    price: "$89.99",
  },
];
