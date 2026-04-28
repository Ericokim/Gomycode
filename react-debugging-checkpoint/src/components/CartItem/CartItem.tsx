import { CartItem as CartItemType } from '../../types';

interface CartItemProps {
  cartItem: CartItemType;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
}

export function CartItem({ cartItem, onRemove, onUpdateQuantity }: CartItemProps) {
  const { product, quantity } = cartItem;
  return (
    <div className="flex flex-col gap-2 border-b border-slate-100 py-3 last:border-0">
      <div className="flex items-start justify-between gap-2">
        <span className="flex-1 text-sm font-medium text-slate-800">{product.name}</span>
        <span className="shrink-0 text-sm font-semibold text-amber-500">${(product.price * quantity).toFixed(2)}</span>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => onUpdateQuantity(quantity - 1)} className="flex h-6 w-6 items-center justify-center rounded border border-slate-200 bg-white text-sm font-bold text-slate-700 hover:bg-slate-50">−</button>
        <span className="min-w-[1.5rem] text-center text-sm font-semibold text-slate-800">{quantity}</span>
        <button onClick={() => onUpdateQuantity(quantity + 1)} className="flex h-6 w-6 items-center justify-center rounded border border-slate-200 bg-white text-sm font-bold text-slate-700 hover:bg-slate-50">+</button>
        <button onClick={onRemove} className="ml-auto text-slate-300 transition hover:text-rose-400">✕</button>
      </div>
    </div>
  );
}
