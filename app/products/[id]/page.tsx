import { products } from "@/data/products";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));
  if (!product) {
    return { title: "Not Found | TechStore" };
  }
  return { title: `${product.name} | TechStore` };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/"
          data-testid="link-back"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to Products
        </Link>

        <div
          data-testid="product-detail"
          className="mt-4 grid gap-8 md:grid-cols-2"
        >
          <div className="relative aspect-square overflow-hidden rounded-xl border bg-muted/50">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center space-y-4">
            <span
              data-testid="detail-category"
              className="inline-block w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary"
            >
              {product.category}
            </span>

            <h1
              data-testid="detail-name"
              className="text-3xl font-extrabold tracking-tight"
            >
              {product.name}
            </h1>

            <p
              data-testid="detail-price"
              className="text-2xl font-bold text-primary"
            >
              ${product.price.toFixed(2)}
            </p>

            <p
              data-testid="detail-description"
              className="text-muted-foreground leading-relaxed"
            >
              {product.description}
            </p>

            <FavoriteButton productId={product.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
