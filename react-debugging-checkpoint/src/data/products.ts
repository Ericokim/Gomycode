import type { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Noise-Cancelling Headphones',
    price: 329.00,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&auto=format&fit=crop',
    category: 'Electronics',
    description:
      'Industry-leading noise cancellation with 30-hour battery life and crystal-clear hands-free calling.',
    badge: 'Best Seller',
    stock: 12,
    featured: true,
  },
  {
    id: 2,
    name: 'Smart Watch Series 5',
    price: 249.00,
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&auto=format&fit=crop',
    category: 'Electronics',
    description:
      'Advanced health monitoring, GPS tracking, and up to 14 days of battery life in smartwatch mode.',
    badge: 'New Arrival',
    stock: 8,
    featured: true,
  },
  {
    id: 3,
    name: 'Classic French Terry Hoodie',
    price: 89.00,
    image:
      'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=900&auto=format&fit=crop',
    category: 'Clothing',
    description:
      'Ultra-soft fleece with a relaxed fit, kangaroo pocket, and an adjustable drawstring hood.',
    badge: 'Trending',
    stock: 24,
    featured: true,
  },
  {
    id: 4,
    name: 'Air Zoom Running Sneakers',
    price: 139.00,
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop',
    category: 'Clothing',
    description:
      'Responsive cushioning and a breathable mesh upper built for everyday training and casual wear.',
    badge: 'Popular',
    stock: 18,
    featured: true,
  },
  {
    id: 5,
    name: 'Heritage Leather Backpack',
    price: 119.95,
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&auto=format&fit=crop',
    category: 'Accessories',
    description:
      'Fits a 15-inch laptop. Made from full-grain leather with a padded back panel and organiser pockets.',
    badge: 'Top Pick',
    stock: 7,
    featured: false,
  },
  {
    id: 6,
    name: 'Polarized Aviator Sunglasses',
    price: 79.99,
    image:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=900&auto=format&fit=crop',
    category: 'Accessories',
    description:
      'Scratch-resistant polarized lenses with 100% UV400 protection in a lightweight titanium frame.',
    badge: 'Classic',
    stock: 15,
    featured: false,
  },
  {
    id: 7,
    name: 'Aromatherapy Stone Diffuser',
    price: 54.95,
    image:
      'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=900&auto=format&fit=crop',
    category: 'Home',
    description:
      'Ultrasonic ceramic diffuser with whisper-quiet misting and up to 10 hours of continuous use.',
    badge: 'Wellness',
    stock: 9,
    featured: false,
  },
  {
    id: 8,
    name: 'LED Monitor Light Bar',
    price: 65.00,
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900&auto=format&fit=crop',
    category: 'Home',
    description:
      'Screen-mounted LED bar that eliminates glare with adjustable colour temperature from 2700 K to 6500 K.',
    badge: 'WFH Pick',
    stock: 11,
    featured: false,
  },
];
