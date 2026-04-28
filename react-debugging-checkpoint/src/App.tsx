import { products } from './data/products';
import { useCart } from './hooks/useCart';
import { Header } from './components/Header/Header';
import { ProductList } from './components/ProductList/ProductList';
import { Cart } from './components/Cart/Cart';

function App() {
  const { cartItems, addToCart, removeFromCart, updateQuantity, total } = useCart();
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex min-h-screen flex-col bg-[#f5efe6]">
      <Header itemCount={itemCount} />
      <div className="flex flex-1">
        <ProductList products={products} onAddToCart={addToCart} />
        <Cart cartItems={cartItems} onRemove={removeFromCart} onUpdateQuantity={updateQuantity} total={total} />
      </div>
    </div>
  );
}

export default App;
