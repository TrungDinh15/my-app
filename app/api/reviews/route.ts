import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabaseClient";
import { reviewSchema } from "@/lib/reviewSchema";
import { products } from "@/data/products";

export async function POST(request: NextRequest) {
  // 1. Authentication check
  const authHeader =
    request.headers.get("authorization") ||
    request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Validation
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid input", issues: [{ message: "Invalid JSON" }] },
      { status: 400 }
    );
  }

  const parseResult = reviewSchema.safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json(
      { error: "Invalid input", issues: parseResult.error.issues },
      { status: 400 }
    );
  }

  const { product_id, rating, comment } = parseResult.data;

  // 3. Product check
  const product = products.find((p) => p.id === product_id);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  // 4. Insert with user token (RLS applies, user_id and author from database defaults)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const userSupabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  });

  const { data, error } = await userSupabase
    .from("reviews")
    .insert({
      product_id,
      rating,
      comment,
    })
    .select("id, product_id, rating, comment, author, created_at")
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "You already reviewed this product" },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // 5. Revalidate cached page and return 201
  revalidatePath("/products/" + product_id);

  return NextResponse.json(data, { status: 201 });
}
