import { createContext, PropsWithChildren, useState } from "react";

interface FavoritesContextType {
  favorites: Wellness[];
  addFavorites: (item: Wellness) => void;
}

export const FavoritesContext = createContext<FavoritesContextType | null>(null);

const FavoritesProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Wellness[]>([]);

  const addFavorites = (item: Wellness) => {
    setFavorites((prev) =>
      prev.some((f) => f.id === item.id)
        ? prev.filter((f) => f.id !== item.id)
        : [...prev, item]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
