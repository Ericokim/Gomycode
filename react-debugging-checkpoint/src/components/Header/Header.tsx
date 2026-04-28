import React from 'react';

interface HeaderProps {
  itemCount: number;
}

export function Header({ itemCount }: HeaderProps) {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>React Shop 🛍️</h1>
      <div style={styles.cartBadge}>
        🛒
        {itemCount > 0 && (
          <span style={styles.badge}>{itemCount}</span>
        )}
      </div>
    </header>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#1a1a2e',
    color: 'white',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  title: { margin: 0, fontSize: '1.5rem' },
  cartBadge: { position: 'relative', fontSize: '1.8rem', cursor: 'pointer' },
  badge: {
    position: 'absolute',
    top: '-8px',
    right: '-10px',
    backgroundColor: '#e94560',
    color: 'white',
    borderRadius: '50%',
    width: '22px',
    height: '22px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.7rem',
    fontWeight: 'bold',
  },
};
