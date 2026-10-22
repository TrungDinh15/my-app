import { z } from "zod";

export const reviewSchema = z.object({
  product_id: z
    .number({
      error: (issue) =>
        issue.input === undefined
          ? "Product ID is required"
          : "Product ID must be a positive integer",
    })
    .int("Product ID must be an integer")
    .positive("Product ID must be positive"),
  rating: z
    .number({
      error: (issue) =>
        issue.input === undefined || (issue.input as unknown) === ""
          ? "Please select a rating"
          : "Rating must be an integer between 1 and 5",
    })
    .int("Rating must be an integer")
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5"),
  comment: z
    .string({
      error: () => "Comment is required",
    })
    .trim()
    .min(1, "Comment cannot be empty")
    .max(500, "Comment cannot exceed 500 characters"),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
