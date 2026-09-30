import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import { products } from "@/data/products";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Auth-aware Header */}
      <Header />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-10 pb-6 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Featured Products
        </h2>
        <p className="mt-2 text-muted-foreground">
          Discover our handpicked collection of premium tech gear.
        </p>
      </section>

      {/* Product Grid */}
      <main className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div
          data-testid="product-list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}