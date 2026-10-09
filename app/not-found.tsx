import Link from "next/link";

export default function NotFound() {
  return (
    <div
      data-testid="not-found"
      className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 px-4"
    >
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-extrabold tracking-tight text-primary">
          404
        </h1>
        <h2 className="text-2xl font-bold">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It
          might have been moved or doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
