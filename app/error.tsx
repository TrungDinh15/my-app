"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      data-testid="error-boundary"
      className="flex min-h-screen flex-col items-center justify-center gap-4 px-4"
    >
      <h2 className="text-2xl font-bold text-destructive">
        Something went wrong!
      </h2>
      <p className="text-muted-foreground text-center max-w-md">
        {error.message || "An unexpected error occurred."}
      </p>
      <button
        data-testid="btn-retry"
        onClick={reset}
        className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Try again
      </button>
    </div>
  );
}
