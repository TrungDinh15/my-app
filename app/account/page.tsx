"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AccountPage() {
  const auth = useContext(AuthContext);
  const user = auth?.user ?? null;
  const loading = auth?.loading ?? false;
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-100 p-4">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-emerald-300/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-teal-300/30 blur-3xl" />

      <Card data-testid="account-page" className="relative w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-extrabold tracking-tight">
            My Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border bg-muted/50 p-4 text-center">
            <p className="text-sm text-muted-foreground">Logged in as</p>
            <p
              data-testid="account-email"
              className="mt-1 text-lg font-semibold"
            >
              {user.email}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
