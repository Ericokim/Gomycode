import { useDeferredValue, useState } from 'react';
import { Cart } from './components/Cart/Cart';
import { Header } from './components/Header/Header';
import { ProductList } from './components/ProductList/ProductList';
import { products } from './data/products';
import { useCart } from './hooks/useCart';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const deferredSearchTerm = useDeferredValue(searchTerm);
  const { cartItems, addToCart, removeFromCart, updateQuantity, subtotal, total } = useCart();
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const categories = ['All', ...new Set(products.map((product) => product.category))];
  const normalizedSearchTerm = deferredSearchTerm.trim().toLowerCase();

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;

      const matchesSearch =
        product.name.toLowerCase().includes(normalizedSearchTerm) ||
        product.description.toLowerCase().includes(normalizedSearchTerm) ||
        product.badge.toLowerCase().includes(normalizedSearchTerm);

      return matchesCategory && matchesSearch;
    })
    .sort((leftProduct, rightProduct) => {
      if (sortBy === 'price-low') {
        return leftProduct.price - rightProduct.price;
      }

      if (sortBy === 'price-high') {
        return rightProduct.price - leftProduct.price;
      }

      if (sortBy === 'name') {
        return leftProduct.name.localeCompare(rightProduct.name);
      }

      if (leftProduct.featured === rightProduct.featured) {
        return leftProduct.id - rightProduct.id;
      }

      return leftProduct.featured ? -1 : 1;
    });

  const featureStats = [
    { label: 'Products', value: String(products.length) },
    { label: 'Categories', value: String(categories.length - 1) },
    { label: 'Cart items', value: String(itemCount) },
  ];

  return (
    <div className={styles.page}>
      <Header itemCount={itemCount} total={total} />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <h1 className={styles.heroTitle}>React Shopping Cart</h1>
            <p className={styles.heroText}>
              Browse the catalogue, filter by category, sort by price or name, and manage your cart
              with live totals and persistent state across page refreshes.
            </p>
          </div>

          <div className={styles.heroStats}>
            {featureStats.map((stat) => (
              <article key={stat.label} className={styles.statCard}>
                <span className={styles.statLabel}>{stat.label}</span>
                <strong className={styles.statValue}>{stat.value}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.workspace}>
          <div className={styles.primaryColumn}>
            <ProductList
              products={filteredProducts}
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              sortBy={sortBy}
              categories={categories}
              onSearchChange={setSearchTerm}
              onCategoryChange={setSelectedCategory}
              onSortChange={setSortBy}
              onAddToCart={addToCart}
            />
          </div>

          <div className={styles.sidebarColumn}>
            <Cart
              cartItems={cartItems}
              onRemove={removeFromCart}
              onUpdateQuantity={updateQuantity}
              subtotal={subtotal}
              total={total}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

const styles = {
  page: 'min-h-screen bg-[#f5efe6] text-slate-900',
  main: 'mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:py-10',
  hero:
    'rounded-[36px] bg-slate-900 px-6 py-8 text-white shadow-2xl shadow-slate-300/40 sm:px-8 sm:py-10',
  heroCopy: 'max-w-4xl',
  heroTitle: 'text-4xl font-bold tracking-tight sm:text-5xl',
  heroText: 'mt-4 max-w-3xl text-sm leading-7 text-slate-200 sm:text-base',
  heroStats: 'mt-8 grid gap-4 md:grid-cols-3',
  statCard: 'rounded-3xl bg-white/10 p-5 ring-1 ring-white/10 backdrop-blur',
  statLabel: 'text-xs uppercase tracking-[0.2em] text-slate-300',
  statValue: 'mt-3 block text-2xl font-bold text-amber-300',
  workspace: 'grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.85fr)]',
  primaryColumn: 'min-w-0',
  sidebarColumn: 'flex min-w-0 flex-col gap-6',
};

export default App;
