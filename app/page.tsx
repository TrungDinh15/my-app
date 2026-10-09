import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import { products } from "@/data/products";

// Extract unique categories for the filter dropdown
const categories = Array.from(new Set(products.map((p) => p.category))).sort();

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";
  const category = typeof params.category === "string" ? params.category : "";

  let filtered = [...products];

  if (q) {
    const lower = q.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower)
    );
  }

  if (category) {
    const lowerCat = category.toLowerCase();
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === lowerCat
    );
  }

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

      {/* Search & Filter Form */}
      <section className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
        <form
          method="get"
          action="/"
          className="flex flex-col gap-3 sm:flex-row sm:items-end"
        >
          <div className="flex-1">
            <input
              type="text"
              name="q"
              data-testid="search-input"
              defaultValue={q}
              placeholder="Search products…"
              className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <select
              name="category"
              data-testid="category-select"
              defaultValue={category}
              className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring sm:w-auto"
            >
              <option value="">All</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            data-testid="btn-search"
            className="rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Search
          </button>
        </form>
      </section>

      {/* Product Grid */}
      <main className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <p
            data-testid="no-results"
            className="py-20 text-center text-lg text-muted-foreground"
          >
            No products found.
          </p>
        ) : (
          <div
            data-testid="product-list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}