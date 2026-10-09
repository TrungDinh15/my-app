import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Product } from "@/data/products";
import FavoriteButton from "@/components/FavoriteButton";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card
      data-testid="product-card"
      className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <Link href={`/products/${product.id}`} data-testid="link-detail">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img
            data-testid="product-image"
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardHeader className="pb-2">
          <CardTitle data-testid="product-name" className="text-lg leading-tight">
            {product.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          <p
            data-testid="product-description"
            className="text-sm text-muted-foreground line-clamp-2"
          >
            {product.description}
          </p>
        </CardContent>
      </Link>
      <CardFooter className="flex items-center justify-between">
        <span
          data-testid="product-price"
          className="text-lg font-bold text-primary"
        >
          ${product.price.toFixed(2)}
        </span>
        <FavoriteButton productId={product.id} />
      </CardFooter>
    </Card>
  );
}
