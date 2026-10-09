"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { products } from "@/data/products";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function FavoritesPage() {
  const { user, loading } = useAuth();
  const { favorites } = useFavorites();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return null;
  }

  if (!user) {
    return null;
  }

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div
      data-testid="favorites-page"
      className="min-h-screen bg-gradient-to-b from-background to-muted/30"
    >
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight mb-6">
          My Favorites
        </h1>

        {favoriteProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p
              data-testid="favorites-empty"
              className="text-muted-foreground text-lg"
            >
              You haven&apos;t added any favorites yet.
            </p>
            <Link
              href="/"
              className="mt-4 text-sm font-semibold text-primary hover:underline"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {favoriteProducts.map((product) => (
              <Card
                key={product.id}
                data-testid="favorite-item"
                className="transition-all duration-200 hover:shadow-md"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    <Link
                      href={`/products/${product.id}`}
                      data-testid="link-detail"
                      className="hover:underline"
                    >
                      {product.name}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
