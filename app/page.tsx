import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
            🛍️ TechStore
          </h1>
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link href="/login">
              <Button data-testid="btn-login" variant="outline" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button data-testid="btn-register" size="sm">
                Register
              </Button>
            </Link>
          </nav>
        </div>
      </header>

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