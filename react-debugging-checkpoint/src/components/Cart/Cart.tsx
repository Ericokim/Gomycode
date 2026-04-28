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
    <aside className="flex w-80 shrink-0 flex-col border-l border-slate-200 bg-white p-5 min-h-[calc(100vh-56px)]">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-sm italic text-slate-400">Your cart is empty.</p>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto">
            {cartItems.map(item => (
              <CartItem
                key={item.product.id}
                cartItem={item}
                onRemove={() => onRemove(item.product.id)}
                onUpdateQuantity={(qty) => onUpdateQuantity(item.product.id, qty)}
              />
            ))}
          </div>
          <div className="mt-4 border-t-2 border-slate-900 pt-4">
            <div className="flex items-center justify-between text-base font-bold text-slate-900">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="mt-3 w-full rounded-full bg-amber-400 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-amber-300 active:scale-95">
              Checkout
            </button>
          </div>
        </>
      )}
    </aside>
  );
}
