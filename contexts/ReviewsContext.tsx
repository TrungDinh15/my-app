"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";
import type { Review } from "@/lib/reviews";

type ReviewAction =
  | { type: "SET"; payload: Review[] }
  | { type: "ADD"; payload: Review }
  | { type: "UPDATE"; payload: Review }
  | { type: "REMOVE"; payload: number };

function reviewsReducer(state: Review[], action: ReviewAction): Review[] {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "ADD":
      return [
        action.payload,
        ...state.filter((r) => r.id !== action.payload.id),
      ];
    case "UPDATE":
      return state.map((r) =>
        r.id === action.payload.id ? action.payload : r
      );
    case "REMOVE":
      return state.filter((r) => r.id !== action.payload);
    default:
      return state;
  }
}

interface ReviewsContextType {
  reviews: Review[];
  myReview: Review | null;
  average: number;
  count: number;
  submitReview: (
    rating: number,
    comment: string
  ) => Promise<{ success: boolean; error?: string }>;
  updateReview: (
    rating: number,
    comment: string
  ) => Promise<{ success: boolean; error?: string }>;
  deleteReview: () => Promise<{ success: boolean; error?: string }>;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

interface ReviewsProviderProps {
  productId: number;
  initialReviews: Review[];
  children: ReactNode;
}

export function ReviewsProvider({
  productId,
  initialReviews,
  children,
}: ReviewsProviderProps) {
  const [reviews, dispatch] = useReducer(reviewsReducer, initialReviews);
  const { user } = useAuth();
  const router = useRouter();

  // Sync state if initialReviews prop updates (e.g., from server revalidation / router.refresh)
  useEffect(() => {
    dispatch({ type: "SET", payload: initialReviews });
  }, [initialReviews]);

  // Find the logged-in user's review
  const myReview = useMemo(() => {
    if (!user) return null;
    return reviews.find((r) => r.user_id === user.id) ?? null;
  }, [reviews, user]);

  const count = reviews.length;
  const average =
    count === 0
      ? 0
      : Math.round(
          (reviews.reduce((sum, r) => sum + r.rating, 0) / count) * 10
        ) / 10;

  async function submitReview(
    rating: number,
    comment: string
  ): Promise<{ success: boolean; error?: string }> {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const token = session?.access_token;

    if (!token) {
      return { success: false, error: "Unauthorized" };
    }

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: productId,
          rating,
          comment,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          error: data.error || "Failed to submit review",
        };
      }

      dispatch({ type: "ADD", payload: data as Review });
      router.refresh();
      return { success: true };
    } catch {
      return { success: false, error: "An unexpected error occurred" };
    }
  }

  async function updateReview(
    rating: number,
    comment: string
  ): Promise<{ success: boolean; error?: string }> {
    if (!myReview) {
      return { success: false, error: "No review found to update" };
    }

    const { data, error } = await supabase
      .from("reviews")
      .update({ rating, comment })
      .eq("id", myReview.id)
      .select("id, user_id, product_id, rating, comment, author, created_at")
      .single();

    if (error || !data) {
      return {
        success: false,
        error: error?.message || "Failed to update review",
      };
    }

    dispatch({ type: "UPDATE", payload: data as Review });
    router.refresh();
    return { success: true };
  }

  async function deleteReview(): Promise<{
    success: boolean;
    error?: string;
  }> {
    if (!myReview) {
      return { success: false, error: "No review found to delete" };
    }

    const reviewToDelete = myReview;

    // Optimistic deletion: immediately remove from state
    dispatch({ type: "REMOVE", payload: reviewToDelete.id });

    // Call Supabase delete
    const { error } = await supabase
      .from("reviews")
      .delete()
      .eq("id", reviewToDelete.id);

    if (error) {
      // Rollback optimistic removal on error
      dispatch({ type: "ADD", payload: reviewToDelete });
      return { success: false, error: error.message };
    }

    router.refresh();
    return { success: true };
  }

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        myReview,
        average,
        count,
        submitReview,
        updateReview,
        deleteReview,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
}

export function useReviews(): ReviewsContextType {
  const context = useContext(ReviewsContext);
  if (context === undefined) {
    throw new Error("useReviews must be used within a ReviewsProvider");
  }
  return context;
}
