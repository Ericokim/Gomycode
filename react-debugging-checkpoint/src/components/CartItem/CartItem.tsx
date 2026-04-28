import type { CartItem as CartItemType } from '../../types';

interface CartItemProps {
  cartItem: CartItemType;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
}

export function CartItem({ cartItem, onRemove, onUpdateQuantity }: CartItemProps) {
  const { product, quantity } = cartItem;

  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <div className={styles.info}>
          <span className={styles.name}>{product.name}</span>
          <span className={styles.category}>{product.category}</span>
        </div>
        <span className={styles.rowTotal}>${(product.price * quantity).toFixed(2)}</span>
      </div>

      <div className={styles.controls}>
        <div className={styles.qty}>
          <button
            onClick={() => onUpdateQuantity(quantity - 1)}
            className={styles.qtyBtn}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className={styles.qtyVal}>{quantity}</span>
          <button
            onClick={() => onUpdateQuantity(quantity + 1)}
            className={styles.qtyBtn}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <span className={styles.unitPrice}>${product.price.toFixed(2)} each</span>
        <button onClick={onRemove} className={styles.removeBtn}>
          Remove
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: 'rounded-3xl border border-slate-200 bg-slate-50 p-4',
  topRow: 'flex items-start justify-between gap-3',
  info: 'flex flex-col gap-1',
  name: 'text-sm font-semibold text-slate-900',
  category: 'text-xs uppercase tracking-[0.16em] text-slate-500',
  rowTotal: 'shrink-0 text-sm font-bold text-amber-600',
  controls: 'mt-4 flex items-center gap-3',
  qty: 'flex items-center gap-2',
  qtyBtn:
    'flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-bold text-slate-700 transition hover:border-slate-900 hover:text-slate-900',
  qtyVal: 'min-w-[1.5rem] text-center text-sm font-semibold text-slate-900',
  unitPrice: 'text-xs text-slate-400',
  removeBtn:
    'ml-auto rounded-full border border-rose-200 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-rose-500 transition hover:bg-rose-50',
};
