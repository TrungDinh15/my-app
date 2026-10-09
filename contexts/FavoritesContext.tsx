"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
  type ReactNode,
} from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";

// ── Types ──────────────────────────────────────────────
type FavoritesState = number[];

type FavoritesAction =
  | { type: "SET"; payload: number[] }
  | { type: "ADD"; payload: number }
  | { type: "REMOVE"; payload: number };

interface FavoritesContextType {
  favorites: number[];
  isFavorite: (id: number | string) => boolean;
  toggleFavorite: (id: number | string) => void;
}

// ── Reducer ────────────────────────────────────────────
function favoritesReducer(
  state: FavoritesState,
  action: FavoritesAction
): FavoritesState {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "ADD":
      if (state.includes(action.payload)) return state;
      return [...state, action.payload];
    case "REMOVE":
      return state.filter((id) => id !== action.payload);
    default:
      return state;
  }
}

// ── Context ────────────────────────────────────────────
const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [favorites, dispatch] = useReducer(favoritesReducer, []);

  // Load favorites when user changes
  useEffect(() => {
    if (!user) {
      dispatch({ type: "SET", payload: [] });
      return;
    }

    let cancelled = false;

    async function loadFavorites() {
      const { data, error } = await supabase
        .from("favorites")
        .select("product_id");

      if (!cancelled && !error && data) {
        dispatch({
          type: "SET",
          payload: data.map((row: { product_id: number }) => row.product_id),
        });
      }
    }

    loadFavorites();

    return () => {
      cancelled = true;
    };
  }, [user]);

  const isFavorite = useCallback(
    (id: number | string) => favorites.includes(Number(id)),
    [favorites]
  );

  const toggleFavorite = useCallback(
    async (id: number | string) => {
      if (!user) return; // caller should handle redirect

      const numId = Number(id);
      const isCurrentlyFavorite = favorites.includes(numId);

      if (isCurrentlyFavorite) {
        // Optimistic: remove first
        dispatch({ type: "REMOVE", payload: numId });

        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("product_id", numId)
          .eq("user_id", user.id);

        if (error) {
          // Rollback
          dispatch({ type: "ADD", payload: numId });
        }
      } else {
        // Optimistic: add first
        dispatch({ type: "ADD", payload: numId });

        const { error } = await supabase
          .from("favorites")
          .insert({ product_id: numId, user_id: user.id });

        if (error) {
          // Rollback
          dispatch({ type: "REMOVE", payload: numId });
        }
      }
    },
    [user, favorites]
  );

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextType {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
