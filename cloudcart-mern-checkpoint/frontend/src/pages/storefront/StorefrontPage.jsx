import { useMemo, useState } from "react";
import { Toast } from "../../components/shared/Toast";
import { CartPanel } from "../../components/storefront/CartPanel";
import { Hero } from "../../components/storefront/Hero";
import { ProductFilters } from "../../components/storefront/ProductFilters";
import { ProductGrid } from "../../components/storefront/ProductGrid";
import { useCart } from "../../hooks/useCart";
import { useProducts } from "../../hooks/useProducts";
import { createOrder } from "../../lib/api/orders";
import { getErrorMessage } from "../../lib/api/client";

export function StorefrontPage() {
  const [customerName, setCustomerName] = useState("");
  const [filters, setFilters] = useState({
    search: "",
    sort: "newest",
    stock: "all"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isLoading, loadProducts, products, setToast, toast } = useProducts();
  const { addToCart, cart, clearCart, removeFromCart, total, updateQuantity } = useCart();

  const filteredProducts = useMemo(() => {
    const searchTerm = filters.search.trim().toLowerCase();

    return [...products]
      .filter((product) => {
        const matchesSearch =
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm);
        const matchesStock =
          filters.stock === "all" ||
          (filters.stock === "available" && product.stock > 0) ||
          (filters.stock === "low" && product.stock > 0 && product.stock <= 5);

        return matchesSearch && matchesStock;
      })
      .sort((first, second) => {
        if (filters.sort === "price-low") {
          return first.price - second.price;
        }

        if (filters.sort === "price-high") {
          return second.price - first.price;
        }

        if (filters.sort === "name") {
          return first.name.localeCompare(second.name);
        }

        return new Date(second.createdAt || 0) - new Date(first.createdAt || 0);
      });
  }, [filters, products]);

  function updateFilter(event) {
    const { name, value } = event.target;
    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value
    }));
  }

  async function placeOrder(event) {
    event.preventDefault();

    if (!customerName.trim() || cart.length === 0) {
      setToast({
        message: "Add your name and at least one product before placing an order.",
        type: "error"
      });
      return;
    }

    setIsSubmitting(true);
    setToast({ message: "Placing order...", type: "info" });

    try {
      const order = await createOrder({
        customerName,
        items: cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity
        }))
      });

      clearCart();
      setCustomerName("");
      setToast({
        message: `Order placed. Total: $${order.total.toFixed(2)}`,
        type: "success"
      });
      await loadProducts();
    } catch (error) {
      setToast({
        message: getErrorMessage(error, "Order failed."),
        type: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto grid min-h-screen max-w-6xl gap-5 px-4 py-6">
      <Toast message={toast.message} type={toast.type} />
      <Hero />

      <section className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="grid gap-4">
          <ProductFilters
            filters={filters}
            isLoading={isLoading}
            onChange={updateFilter}
            onRefresh={loadProducts}
            resultCount={filteredProducts.length}
          />
          <ProductGrid
            isLoading={isLoading}
            products={filteredProducts}
            onAddToCart={addToCart}
            onRefresh={loadProducts}
          />
        </div>
        <CartPanel
          cart={cart}
          cartTotal={total}
          customerName={customerName}
          isSubmitting={isSubmitting}
          onCustomerNameChange={setCustomerName}
          onPlaceOrder={placeOrder}
          onRemoveFromCart={removeFromCart}
          onUpdateQuantity={updateQuantity}
        />
      </section>
    </main>
  );
}
