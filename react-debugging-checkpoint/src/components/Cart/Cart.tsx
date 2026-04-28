import type { CartItem as CartItemType } from '../../types';
import { CartItem } from '../CartItem/CartItem';

interface CartProps {
  cartItems: CartItemType[];
  onRemove: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  subtotal: number;
  total: number;
}

export function Cart({ cartItems, onRemove, onUpdateQuantity, subtotal, total }: CartProps) {
  const shipping = total - subtotal;

  return (
    <aside className={styles.panel}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Your cart</h2>
          <p className={styles.subtitle}>Review your selected items before checkout.</p>
        </div>
        <span className={styles.count}>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</span>
      </div>

      {cartItems.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyTitle}>Your cart is empty.</p>
          <p className={styles.emptyText}>
            Add items from the catalogue to get started.
          </p>
        </div>
      ) : (
        <>
          <div className={styles.itemsWrap}>
            {cartItems.map((item) => (
              <CartItem
                key={item.product.id}
                cartItem={item}
                onRemove={() => onRemove(item.product.id)}
                onUpdateQuantity={(quantity) => onUpdateQuantity(item.product.id, quantity)}
              />
            ))}
          </div>

          <div className={styles.summary}>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className={styles.button}>Checkout</button>
          </div>
        </>
      )}
    </aside>
  );
}

const styles = {
  panel: 'rounded-[32px] bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8',
  header: 'flex items-start justify-between gap-4 border-b border-slate-200 pb-5',
  title: 'text-2xl font-bold text-slate-900',
  subtitle: 'mt-2 text-sm leading-6 text-slate-600',
  count:
    'rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500',
  emptyState: 'rounded-[28px] bg-slate-50 px-5 py-8 text-center',
  emptyTitle: 'text-lg font-semibold text-slate-900',
  emptyText: 'mt-3 text-sm leading-6 text-slate-600',
  itemsWrap: 'mt-6 flex flex-col gap-4',
  summary: 'mt-6 rounded-[28px] bg-slate-900 p-5 text-white',
  summaryRow:
    'flex items-center justify-between border-b border-white/10 py-3 text-sm text-slate-200',
  summaryTotal: 'flex items-center justify-between pt-4 text-base font-bold text-white',
  button:
    'mt-5 w-full rounded-full bg-amber-300 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-200 active:scale-[0.98]',
};
