import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const categoryColors: Record<string, string> = {
  Electronics: 'bg-violet-50 text-violet-700 border-violet-200',
  Clothing: 'bg-blue-50 text-blue-700 border-blue-200',
  Food: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-200/60 animate-fade-up">
      <div className="relative h-48 w-full shrink-0 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
        <span className={`absolute right-3 top-3 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${categoryColors[product.category] ?? 'bg-slate-100 text-slate-700 border-slate-200'}`}>
          {product.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-base font-semibold text-slate-900">{product.name}</h3>
        <p className="text-xl font-bold text-amber-500">${product.price.toFixed(2)}</p>
        <button
          onClick={() => onAddToCart(product)}
          className="mt-auto rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
