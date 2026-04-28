import React from 'react';
import { CartItem as CartItemType } from '../../types';
import { CartItem } from '../CartItem/CartItem';

interface CartProps {
  cartItems: CartItemType[];
  onRemove: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  total: number;
}

export function Cart({ cartItems, onRemove, onUpdateQuantity, total }: CartProps) {
  return (
    <aside style={styles.sidebar}>
      <h2 style={styles.heading}>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p style={styles.empty}>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <CartItem
              key={item.product.id}
              cartItem={item}
              onRemove={() => onRemove(item.product.id)}
              onUpdateQuantity={(qty) => onUpdateQuantity(item.product.id, qty)}
            />
          ))}
          <div style={styles.total}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button style={styles.checkoutBtn}>Checkout</button>
        </>
      )}
    </aside>
  );
}

const styles: Record<string, React.CSSProperties> = {
  sidebar: {
    width: '320px',
    minWidth: '320px',
    backgroundColor: 'white',
    borderLeft: '1px solid #eee',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100vh - 64px)',
  },
  heading: { margin: '0 0 1rem', fontSize: '1.2rem', color: '#1a1a2e' },
  empty: { color: '#aaa', fontStyle: 'italic', fontSize: '0.9rem' },
  total: {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 700,
    fontSize: '1.1rem',
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '2px solid #1a1a2e',
    color: '#1a1a2e',
  },
  checkoutBtn: {
    marginTop: '1rem',
    padding: '0.75rem',
    backgroundColor: '#e94560',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: '1rem',
  },
};
