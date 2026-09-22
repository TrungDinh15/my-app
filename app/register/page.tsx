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

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function validate(): FormErrors {
    const newErrors: FormErrors = {};

    // Full name
    if (!name.trim()) {
      newErrors.name = "Full name is required";
    }

    // Email
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Confirm password
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
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
      setSuccess("Registration successful (demo)");
    }
  }

  function revalidateField(
    field: keyof FormErrors,
    values: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    }
  ) {
    if (!submitted) return;
    setSuccess("");

    setErrors((prev) => {
      const next = { ...prev };

      // Always re-check the changed field
      const fieldsToCheck: (keyof FormErrors)[] = [field];
      // If password changes, also re-check confirmPassword
      if (field === "password" && values.confirmPassword) {
        fieldsToCheck.push("confirmPassword");
      }

      for (const f of fieldsToCheck) {
        switch (f) {
          case "name":
            if (!values.name.trim()) next.name = "Full name is required";
            else delete next.name;
            break;
          case "email": {
            const t = values.email.trim();
            if (!t) next.email = "Email is required";
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))
              next.email = "Please enter a valid email address";
            else delete next.email;
            break;
          }
          case "password":
            if (!values.password) next.password = "Password is required";
            else if (values.password.length < 6)
              next.password = "Password must be at least 6 characters";
            else delete next.password;
            break;
          case "confirmPassword":
            if (!values.confirmPassword)
              next.confirmPassword = "Confirm password is required";
            else if (values.confirmPassword !== values.password)
              next.confirmPassword = "Passwords do not match";
            else delete next.confirmPassword;
            break;
        }
      }

      return next;
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 via-white to-fuchsia-100 p-4">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-violet-300/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-fuchsia-300/30 blur-3xl" />

      <Card className="relative w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-extrabold tracking-tight">
            Create Account
          </CardTitle>
          <CardDescription>
            Register to start shopping with us
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            data-testid="register-form"
            noValidate
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Full Name */}
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                data-testid="register-name"
                type="text"
                placeholder="Nguyen Van A"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  revalidateField("name", {
                    name: e.target.value,
                    email,
                    password,
                    confirmPassword,
                  });
                }}
              />
              {errors.name && (
                <p
                  data-testid="error-name"
                  className="text-sm font-medium text-destructive"
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                data-testid="register-email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  revalidateField("email", {
                    name,
                    email: e.target.value,
                    password,
                    confirmPassword,
                  });
                }}
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
                data-testid="register-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  revalidateField("password", {
                    name,
                    email,
                    password: e.target.value,
                    confirmPassword,
                  });
                }}
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

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                data-testid="register-confirm-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  revalidateField("confirmPassword", {
                    name,
                    email,
                    password,
                    confirmPassword: e.target.value,
                  });
                }}
              />
              {errors.confirmPassword && (
                <p
                  data-testid="error-confirm-password"
                  className="text-sm font-medium text-destructive"
                >
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              data-testid="register-submit"
              type="submit"
              className="w-full"
            >
              Create Account
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
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
