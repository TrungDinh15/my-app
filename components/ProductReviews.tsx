"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star, MessageSquare, Trash2, Edit3, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useReviews } from "@/contexts/ReviewsContext";
import { reviewSchema, type ReviewInput } from "@/lib/reviewSchema";
import { Button, buttonVariants } from "@/components/ui/button";

interface ProductReviewsProps {
  productId: number;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const { user } = useAuth();
  const {
    reviews,
    myReview,
    average,
    count,
    submitReview,
    updateReview,
    deleteReview,
  } = useReviews();

  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Edit state for user's own review
  const [isEditing, setIsEditing] = useState(false);
  const [editRating, setEditRating] = useState<number>(5);
  const [editComment, setEditComment] = useState<string>("");
  const [editError, setEditError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewInput>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      product_id: productId,
      rating: undefined,
      comment: "",
    },
  });

  async function onSubmit(data: ReviewInput) {
    setServerError(null);
    setSuccessMessage(null);

    const result = await submitReview(data.rating, data.comment);
    if (!result.success) {
      setServerError(result.error || "Failed to submit review");
    } else {
      setSuccessMessage("Review submitted successfully!");
      reset({
        product_id: productId,
        rating: undefined,
        comment: "",
      });
    }
  }

  function startEditing() {
    if (myReview) {
      setEditRating(myReview.rating);
      setEditComment(myReview.comment);
      setEditError(null);
      setIsEditing(true);
    }
  }

  async function handleUpdate() {
    if (!editComment.trim()) {
      setEditError("Comment cannot be empty");
      return;
    }
    if (editComment.length > 500) {
      setEditError("Comment cannot exceed 500 characters");
      return;
    }

    setIsUpdating(true);
    setEditError(null);
    const result = await updateReview(editRating, editComment.trim());
    setIsUpdating(false);

    if (!result.success) {
      setEditError(result.error || "Failed to update review");
    } else {
      setIsEditing(false);
    }
  }

  async function handleDelete() {
    setIsDeleting(true);
    await deleteReview();
    setIsDeleting(false);
    setIsEditing(false);
  }

  return (
    <section className="mt-12 border-t pt-10">
      <div className="flex flex-col gap-8">
        {/* Rating and Reviews Overview */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-card border p-6 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              Customer Reviews
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Read what other customers think or share your own thoughts
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end">
                <span
                  data-testid="rating-average"
                  className="text-4xl font-extrabold tracking-tight text-primary"
                >
                  {average}
                </span>
                <div className="flex flex-col items-start">
                  <div className="flex text-amber-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= Math.round(average)
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">out of 5</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Based on{" "}
                <span data-testid="review-count" className="font-semibold text-foreground">
                  {count}
                </span>{" "}
                {count === 1 ? "review" : "reviews"}
              </p>
            </div>
          </div>
        </div>

        {/* Success Alert Banner */}
        {successMessage && (
          <div
            data-testid="review-success"
            className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm font-medium text-emerald-600 dark:text-emerald-400"
          >
            <Check className="h-4 w-4" />
            {successMessage}
          </div>
        )}

        {/* Review Form / Login Prompt / Existing Review Notice */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          {!user ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-4">
                Have you purchased or used this product? Share your review with others!
              </p>
              <Link
                href="/login"
                data-testid="link-login-to-review"
                className={buttonVariants()}
              >
                Log in to review
              </Link>
            </div>
          ) : myReview ? (
            <div className="flex items-center justify-between rounded-xl bg-muted/40 p-4 border border-dashed">
              <div>
                <p className="font-semibold text-sm">
                  You have already reviewed this product
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  You can edit or delete your review below
                </p>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
              <form
                data-testid="review-form"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="rating-select"
                    className="block text-sm font-medium mb-1.5"
                  >
                    Rating
                  </label>
                  <select
                    id="rating-select"
                    data-testid="input-rating"
                    {...register("rating", { valueAsNumber: true })}
                    className="w-full sm:w-64 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <option value="">Select rating</option>
                    <option value="5">5 - Excellent (⭐⭐⭐⭐⭐)</option>
                    <option value="4">4 - Very Good (⭐⭐⭐⭐)</option>
                    <option value="3">3 - Average (⭐⭐⭐)</option>
                    <option value="2">2 - Poor (⭐⭐)</option>
                    <option value="1">1 - Terrible (⭐)</option>
                  </select>
                  {errors.rating && (
                    <p
                      data-testid="error-rating"
                      className="mt-1.5 text-xs font-medium text-destructive"
                    >
                      {errors.rating.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="comment-input"
                    className="block text-sm font-medium mb-1.5"
                  >
                    Your Review
                  </label>
                  <textarea
                    id="comment-input"
                    data-testid="input-comment"
                    rows={4}
                    placeholder="Tell us what you like or dislike about this product (1-500 characters)..."
                    {...register("comment")}
                    className="w-full rounded-md border border-input bg-background p-3 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  />
                  {errors.comment && (
                    <p
                      data-testid="error-comment"
                      className="mt-1.5 text-xs font-medium text-destructive"
                    >
                      {errors.comment.message}
                    </p>
                  )}
                </div>

                {serverError && (
                  <p
                    data-testid="error-review"
                    className="text-sm font-medium text-destructive"
                  >
                    {serverError}
                  </p>
                )}

                <div>
                  <Button
                    type="submit"
                    data-testid="btn-submit-review"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Reviews List */}
        <div>
          <h3 className="text-xl font-bold mb-4">All Reviews</h3>

          {reviews.length === 0 ? (
            <div
              data-testid="reviews-empty"
              className="rounded-2xl border border-dashed py-12 text-center text-muted-foreground"
            >
              <MessageSquare className="mx-auto h-10 w-10 opacity-30 mb-2" />
              <p className="font-medium">No reviews yet.</p>
              <p className="text-sm">Be the first to share your thoughts on this product!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => {
                const isOwnReview = user?.id === review.user_id;

                return (
                  <div
                    key={review.id}
                    data-testid="review-item"
                    className={`rounded-2xl border bg-card p-5 shadow-sm transition-all ${
                      isOwnReview
                        ? "border-primary/40 ring-1 ring-primary/20"
                        : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            data-testid="review-author"
                            className="font-bold text-sm sm:text-base text-foreground"
                          >
                            {review.author}
                          </span>
                          {isOwnReview && (
                            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                              You
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 mt-1">
                          <div className="flex text-amber-500">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-3.5 w-3.5 ${
                                  star <= review.rating
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-muted-foreground/30"
                                }`}
                              />
                            ))}
                          </div>
                          <span
                            data-testid="review-rating"
                            className="text-xs font-semibold text-muted-foreground"
                          >
                            {review.rating}
                          </span>
                          <span className="text-xs text-muted-foreground">/ 5</span>
                          {review.created_at && (
                            <>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">
                                {new Date(review.created_at).toLocaleDateString()}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Edit and Delete Buttons - ONLY for Own Review */}
                      {isOwnReview && (
                        <div className="flex items-center gap-1">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            data-testid="btn-edit-review"
                            onClick={() => {
                              if (isEditing) {
                                setIsEditing(false);
                              } else {
                                startEditing();
                              }
                            }}
                            className="h-8 gap-1 text-xs"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                            {isEditing ? "Cancel" : "Edit"}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            data-testid="btn-delete-review"
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="h-8 gap-1 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            {isDeleting ? "..." : "Delete"}
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Inline Editing Form */}
                    {isOwnReview && isEditing ? (
                      <div className="mt-4 border-t pt-4 space-y-3">
                        <div>
                          <label className="block text-xs font-medium mb-1">
                            Update Rating:
                          </label>
                          <select
                            value={editRating}
                            onChange={(e) => setEditRating(Number(e.target.value))}
                            className="w-full sm:w-48 rounded-md border border-input bg-background px-2.5 py-1.5 text-xs"
                          >
                            <option value={5}>5 - Excellent</option>
                            <option value={4}>4 - Very Good</option>
                            <option value={3}>3 - Average</option>
                            <option value={2}>2 - Poor</option>
                            <option value={1}>1 - Terrible</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-1">
                            Update Comment:
                          </label>
                          <textarea
                            rows={3}
                            value={editComment}
                            onChange={(e) => setEditComment(e.target.value)}
                            className="w-full rounded-md border border-input bg-background p-2 text-xs"
                          />
                        </div>
                        {editError && (
                          <p className="text-xs text-destructive">{editError}</p>
                        )}
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            onClick={handleUpdate}
                            disabled={isUpdating}
                            className="h-7 text-xs"
                          >
                            {isUpdating ? "Saving..." : "Save Changes"}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setIsEditing(false)}
                            className="h-7 text-xs"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p
                        data-testid="review-comment"
                        className="mt-3 text-sm text-foreground/90 whitespace-pre-line leading-relaxed"
                      >
                        {review.comment}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
