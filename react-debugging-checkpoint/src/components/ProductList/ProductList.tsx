import type { Product } from '../../types';
import { ProductCard } from '../ProductCard/ProductCard';

interface ProductListProps {
  products: Product[];
  searchTerm: string;
  selectedCategory: string;
  sortBy: string;
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onAddToCart: (product: Product) => void;
}

export function ProductList({
  products,
  searchTerm,
  selectedCategory,
  sortBy,
  categories,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onAddToCart,
}: ProductListProps) {
  return (
    <section className={styles.panel}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Product catalogue</h2>
          <p className={styles.subtitle}>
            Filter by category, sort by price or name, and add items to your cart.
          </p>
        </div>

        <div className={styles.countBox}>
          <span className={styles.countLabel}>Showing</span>
          <strong className={styles.countValue}>{products.length}</strong>
        </div>
      </div>

      <div className={styles.controls}>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Search</span>
          <input
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search products..."
            className={styles.input}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>Category</span>
          <select
            value={selectedCategory}
            onChange={(event) => onCategoryChange(event.target.value)}
            className={styles.select}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>Sort</span>
          <select
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value)}
            className={styles.select}
          >
            <option value="featured">Featured first</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </label>
      </div>

      {products.length === 0 ? (
        <div className={styles.emptyState}>
          <h3 className={styles.emptyTitle}>No products matched this filter.</h3>
          <p className={styles.emptyText}>
            Clear the search or switch the category to see all products.
          </p>
        </div>
      ) : (
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}
    </section>
  );
}

const styles = {
  panel: 'rounded-[32px] bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8',
  header:
    'flex flex-col gap-5 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between',
  title: 'text-2xl font-bold text-slate-900 sm:text-3xl',
  subtitle: 'mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base',
  countBox:
    'rounded-3xl border border-amber-200 bg-amber-50 px-5 py-4 lg:min-w-[160px]',
  countLabel: 'text-xs uppercase tracking-[0.2em] text-amber-700',
  countValue: 'mt-2 block text-3xl font-bold text-slate-900',
  controls: 'grid gap-4 py-6 md:grid-cols-3',
  field: 'flex flex-col gap-2',
  fieldLabel: 'text-xs font-semibold uppercase tracking-[0.18em] text-slate-500',
  input:
    'rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:bg-white',
  select:
    'rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white',
  emptyState:
    'rounded-[28px] border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center',
  emptyTitle: 'text-lg font-semibold text-slate-900',
  emptyText: 'mt-3 text-sm leading-6 text-slate-600',
  grid: 'grid gap-6 md:grid-cols-2',
};
