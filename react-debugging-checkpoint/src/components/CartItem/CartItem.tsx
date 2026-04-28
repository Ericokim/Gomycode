import React from 'react';
import { CartItem as CartItemType } from '../../types';

interface CartItemProps {
  cartItem: CartItemType;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
}

export function CartItem({ cartItem, onRemove, onUpdateQuantity }: CartItemProps) {
  const { product, quantity } = cartItem;
  return (
    <div style={styles.row}>
      <div style={styles.info}>
        <span style={styles.name}>{product.name}</span>
        <span style={styles.lineTotal}>${(product.price * quantity).toFixed(2)}</span>
      </div>
      <div style={styles.controls}>
        <button style={styles.qtyBtn} onClick={() => onUpdateQuantity(quantity - 1)}>−</button>
        <span style={styles.qty}>{quantity}</span>
        <button style={styles.qtyBtn} onClick={() => onUpdateQuantity(quantity + 1)}>+</button>
        <button style={styles.removeBtn} onClick={onRemove} title="Remove item">✕</button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  row: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
    padding: '0.75rem 0',
    borderBottom: '1px solid #eee',
  },
  info: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  name: { fontSize: '0.9rem', fontWeight: 500, color: '#1a1a2e', flex: 1, paddingRight: '0.5rem' },
  lineTotal: { fontSize: '0.9rem', color: '#e94560', fontWeight: 600, whiteSpace: 'nowrap' },
  controls: { display: 'flex', alignItems: 'center', gap: '0.4rem' },
  qtyBtn: {
    width: '26px',
    height: '26px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: 'white',
    fontWeight: 700,
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qty: { minWidth: '28px', textAlign: 'center', fontSize: '0.9rem', fontWeight: 600 },
  removeBtn: {
    marginLeft: 'auto',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#bbb',
    fontSize: '1rem',
    padding: '0 4px',
  },
};
