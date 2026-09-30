"use client";

import { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export default function Header() {
  const auth = useContext(AuthContext);
  const user = auth?.user ?? null;
  const loading = auth?.loading ?? false;
  const signOut = auth?.signOut;

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/">
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
            🛍️ TechStore
          </h1>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3">
          {loading ? null : user ? (
            <>
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
