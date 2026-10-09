export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones Pro",
    price: 149.99,
    description:
      "Premium noise-cancelling headphones with 40-hour battery life, deep bass, and ultra-comfortable ear cushions.",
    category: "Audio",
    image: "/products/headphones.jpg",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 249.0,
    description:
      "Track your health and fitness with heart rate monitoring, GPS, sleep tracking, and a stunning AMOLED display.",
    category: "Wearables",
    image: "/products/smartwatch.jpg",
  },
  {
    id: 3,
    name: "Portable Bluetooth Speaker",
    price: 79.99,
    description:
      "Waterproof speaker with 360° sound, 12-hour playtime, and rugged design perfect for outdoor adventures.",
    category: "Audio",
    image: "/products/speaker.jpg",
  },
  {
    id: 4,
    name: "Mechanical RGB Keyboard",
    price: 129.95,
    description:
      "Compact 75% layout with hot-swappable switches, per-key RGB lighting, and a premium aluminum frame.",
    category: "Accessories",
    image: "/products/keyboard.jpg",
  },
  {
    id: 5,
    name: "Mirrorless Camera X-T4",
    price: 1499.0,
    description:
      "26.1 MP sensor, 4K video at 60fps, in-body image stabilization, and classic retro design for creators.",
    category: "Photography",
    image: "/products/camera.jpg",
  },
  {
    id: 6,
    name: "Urban Laptop Backpack",
    price: 89.99,
    description:
      'Fits up to 16" laptops with padded compartments, water-resistant canvas, and genuine leather details.',
    category: "Accessories",
    image: "/products/backpack.jpg",
  },
];
