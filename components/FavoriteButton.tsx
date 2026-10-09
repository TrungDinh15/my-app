"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";

interface FavoriteButtonProps {
  productId: number;
}

export default function FavoriteButton({ productId }: FavoriteButtonProps) {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const router = useRouter();

  const favorited = isFavorite(productId);

  function handleClick() {
    if (!user) {
      router.push("/login");
      return;
    }
    toggleFavorite(productId);
  }

  return (
    <button
      data-testid="btn-favorite"
      aria-pressed={favorited ? "true" : "false"}
      onClick={handleClick}
      className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200 ${
        favorited
          ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
          : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={favorited ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={2}
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
      {favorited ? "Favorited" : "Favorite"}
    </button>
  );
}
