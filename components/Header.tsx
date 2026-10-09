"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { user, signOut } = useAuth();
  const { favorites } = useFavorites();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/">
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
            🛍️ TechStore
          </h1>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <>
              <Link
                href="/favorites"
                data-testid="link-favorites"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                ♥ Favorites{" "}
                <span
                  data-testid="favorites-count"
                  className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-bold text-primary-foreground"
                >
                  {favorites.length}
                </span>
              </Link>
              <span
                data-testid="user-email"
                className="hidden text-sm font-medium text-muted-foreground sm:inline"
              >
                {user.email}
              </span>
              <Button
                data-testid="btn-logout"
                variant="outline"
                size="sm"
                onClick={signOut}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
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
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
