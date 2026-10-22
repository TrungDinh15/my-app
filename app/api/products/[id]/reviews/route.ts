import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";
import { getProductReviews } from "@/lib/reviews";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const productId = Number(id);

  if (isNaN(productId)) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const data = await getProductReviews(productId);
  return NextResponse.json(data);
}
