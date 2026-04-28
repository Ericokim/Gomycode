import React from 'react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div style={styles.card}>
      <img src={product.image} alt={product.name} style={styles.image} />
      <div style={styles.info}>
        <span style={styles.category}>{product.category}</span>
        <h3 style={styles.name}>{product.name}</h3>
        <p style={styles.price}>${product.price.toFixed(2)}</p>
        <button style={styles.button} onClick={() => onAddToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    overflow: 'hidden',
    backgroundColor: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
  },
  image: { width: '100%', height: '180px', objectFit: 'cover' },
  info: { padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 },
  category: { fontSize: '0.7rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' },
  name: { margin: 0, fontSize: '1rem', fontWeight: 600, color: '#1a1a2e' },
  price: { margin: 0, fontSize: '1.15rem', color: '#e94560', fontWeight: 700 },
  button: {
    marginTop: 'auto',
    padding: '0.6rem',
    backgroundColor: '#1a1a2e',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '0.9rem',
  },
};
