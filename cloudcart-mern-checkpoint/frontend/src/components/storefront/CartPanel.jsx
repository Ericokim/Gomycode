import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

export function CartPanel({
  cart,
  cartTotal,
  customerName,
  isSubmitting,
  onCustomerNameChange,
  onPlaceOrder,
  onRemoveFromCart,
  onUpdateQuantity
}) {
  return (
    <aside className="sticky top-5 grid gap-4 rounded-2xl bg-white p-5 ring-1 ring-slate-200 max-lg:static">
      <div className="flex items-start justify-between gap-3">
        <h2 className="inline-flex items-center gap-2 text-2xl font-bold text-slate-900">
          <ShoppingBag aria-hidden="true" size={24} />
          Cart
        </h2>
        <div className="text-right">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Total</p>
          <p className="text-xl font-bold text-slate-900">${cartTotal.toFixed(2)}</p>
        </div>
      </div>

      {cart.length === 0 ? (
        <p className="text-sm font-semibold text-slate-500">No items yet.</p>
      ) : (
        <ul className="grid gap-3">
          {cart.map((item) => (
            <li className="grid gap-3 border-b border-slate-200 pb-3" key={item.productId}>
              <div className="flex items-start justify-between gap-3">
                <strong className="text-sm font-bold text-slate-900">{item.name}</strong>
                <span className="text-sm font-semibold text-slate-500">
                  ${item.price.toFixed(2)}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 transition hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
                  type="button"
                  aria-label={`Decrease ${item.name} quantity`}
                  onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                >
                  <Minus aria-hidden="true" size={16} />
                </button>
                <span className="min-w-8 text-center text-sm font-bold text-slate-900">
                  {item.quantity}
                </span>
                <button
                  className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 transition hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
                  type="button"
                  aria-label={`Increase ${item.name} quantity`}
                  onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                  disabled={item.quantity >= item.stock}
                >
                  <Plus aria-hidden="true" size={16} />
                </button>
                <button
                  className="inline-flex items-center gap-1 rounded-2xl px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200"
                  type="button"
                  aria-label={`Remove ${item.name} from cart`}
                  onClick={() => onRemoveFromCart(item.productId)}
                >
                  <Trash2 aria-hidden="true" size={15} />
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <form className="grid gap-3" onSubmit={onPlaceOrder}>
        <label className="text-sm font-bold text-slate-900" htmlFor="customerName">
          Customer name
        </label>
        <input
          className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:bg-white"
          id="customerName"
          value={customerName}
          onChange={(event) => onCustomerNameChange(event.target.value)}
          placeholder="Amina"
        />
        <button
          className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:bg-slate-200 disabled:text-slate-500"
          type="submit"
          disabled={isSubmitting || cart.length === 0}
        >
          Place order
        </button>
      </form>
    </aside>
  );
}
