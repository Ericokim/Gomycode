import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const categoryColors: Record<string, string> = {
  Electronics: 'border-sky-200 bg-sky-50 text-sky-800',
  Clothing: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  Accessories: 'border-amber-200 bg-amber-50 text-amber-800',
  Home: 'border-rose-200 bg-rose-50 text-rose-800',
};

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={product.image} alt={product.name} className={styles.image} />
        <div className={styles.imageOverlay} />
        <span className={`${styles.categoryTag} ${categoryColors[product.category] ?? styles.defaultCategory}`}>
          {product.category}
        </span>
        <span className={styles.badge}>{product.badge}</span>
      </div>

      <div className={styles.body}>
        <div className={styles.titleWrap}>
          <h3 className={styles.title}>{product.name}</h3>
          {product.featured ? <span className={styles.featured}>Featured</span> : null}
        </div>

        <p className={styles.description}>{product.description}</p>

        <div className={styles.metaRow}>
          <div>
            <p className={styles.metaLabel}>Stock left</p>
            <p className={styles.metaValue}>{product.stock}</p>
          </div>
          <div className={styles.priceWrap}>
            <p className={styles.metaLabel}>Price</p>
            <p className={styles.price}>${product.price.toFixed(2)}</p>
          </div>
        </div>

        <button onClick={() => onAddToCart(product)} className={styles.button}>
          Add to cart
        </button>
      </div>
    </article>
  );
}

const styles = {
  card:
    'group flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70',
  imageWrap: 'relative h-56 overflow-hidden',
  image: 'h-full w-full object-cover transition duration-500 group-hover:scale-105',
  imageOverlay: 'absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-900/10 to-transparent',
  categoryTag:
    'absolute left-4 top-4 rounded-full border px-3 py-1 text-xs font-semibold',
  defaultCategory: 'border-slate-200 bg-slate-100 text-slate-700',
  badge:
    'absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 backdrop-blur',
  body: 'flex flex-1 flex-col gap-4 p-5',
  titleWrap: 'flex items-start justify-between gap-3',
  title: 'text-lg font-semibold text-slate-900',
  featured:
    'shrink-0 rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-300',
  description: 'text-sm leading-6 text-slate-600',
  metaRow: 'grid grid-cols-2 gap-4 rounded-2xl bg-slate-50 p-4',
  metaLabel: 'text-xs uppercase tracking-[0.18em] text-slate-500',
  metaValue: 'mt-2 text-base font-semibold text-slate-900',
  priceWrap: 'text-right',
  price: 'mt-2 text-base font-bold text-amber-600',
  button:
    'mt-auto rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 active:scale-[0.98]',
};
