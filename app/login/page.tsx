"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [success, setSuccess] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const newErrors: { email?: string; password?: string } = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setSuccess("");

    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSuccess("Login successful (demo)");
    }
  }

  // Re-validate on change after first submit
  function handleEmailChange(value: string) {
    setEmail(value);
    if (submitted) {
      const trimmed = value.trim();
      if (!trimmed) {
        setErrors((prev) => ({ ...prev, email: "Email is required" }));
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        setErrors((prev) => ({
          ...prev,
          email: "Please enter a valid email address",
        }));
      } else {
        setErrors((prev) => {
          const { email: _, ...rest } = prev;
          return rest;
        });
      }
      setSuccess("");
    }
  }

  function handlePasswordChange(value: string) {
    setPassword(value);
    if (submitted) {
      if (!value) {
        setErrors((prev) => ({ ...prev, password: "Password is required" }));
      } else {
        setErrors((prev) => {
          const { password: _, ...rest } = prev;
          return rest;
        });
      }
      setSuccess("");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-white to-blue-100 p-4">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-sky-300/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl" />

      <Card className="relative w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-extrabold tracking-tight">
            Welcome Back
          </CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            data-testid="login-form"
            noValidate
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                data-testid="login-email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
              />
              {errors.email && (
                <p
                  data-testid="error-email"
                  className="text-sm font-medium text-destructive"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                data-testid="login-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
              />
              {errors.password && (
                <p
                  data-testid="error-password"
                  className="text-sm font-medium text-destructive"
                >
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              data-testid="login-submit"
              type="submit"
              className="w-full"
            >
              Sign In
            </Button>

            {/* Success */}
            {success && (
              <p
                data-testid="form-success"
                className="rounded-lg bg-emerald-50 p-3 text-center text-sm font-semibold text-emerald-700"
              >
                {success}
              </p>
            )}
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-primary hover:underline"
            >
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
