import { useEffect, useState } from 'react';
import type { CartItem, Product } from '../types';

const STORAGE_KEY = 'react-debugging-checkpoint.cart';

function loadCartItems() {
  try {
    const storedCart = window.localStorage.getItem(STORAGE_KEY);

    if (!storedCart) {
      return [];
    }

    const parsedCart = JSON.parse(storedCart);

    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch {
    return [];
  }
}

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(loadCartItems);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems((previousItems) => {
      const existingItem = previousItems.find((item) => item.product.id === product.id);

      if (existingItem) {
        return previousItems.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...previousItems, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((previousItems) =>
      previousItems.filter((item) => item.product.id !== productId)
    );
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems((previousItems) =>
      previousItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = cartItems.length > 0 && subtotal < 100 ? 9.99 : 0;
  const total = subtotal + shipping;

  return { cartItems, addToCart, removeFromCart, updateQuantity, subtotal, total };
}
