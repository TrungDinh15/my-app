import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const q = searchParams.get("q");
  const category = searchParams.get("category");

  let filtered = [...products];

  if (q) {
    const lower = q.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower)
    );
  }

  if (category) {
    const lowerCat = category.toLowerCase();
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === lowerCat
    );
  }

  return NextResponse.json(filtered);
}
