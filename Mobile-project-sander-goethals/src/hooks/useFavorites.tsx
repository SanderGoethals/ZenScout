import { useContext } from "react";
import { FavoritesContext } from "../contexts/favoritesContext";

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error("No provider wrapping the component tree!");
    }
    return context;
}