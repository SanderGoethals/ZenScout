import { createContext, PropsWithChildren, useState } from "react";

interface FavoritesContextType {
  favorites: Wellness[];
  addFavorites: (item: Wellness) => void;
}

export const FavoritesContext = createContext<FavoritesContextType | null>(null);

const FavoritesProvider = (props: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Wellness[]>([]);

  const addFavorites = (item: Wellness) => {
    if (favorites.some((favoriteItem) => favoriteItem.id === item.id)) {
      const newFavorites = favorites.filter((favoriteItem) => favoriteItem.id !== item.id);
      setFavorites(newFavorites);
    } else {
      setFavorites([...favorites, item]);
    }
  };

  return <FavoritesContext.Provider value={{favorites, addFavorites}}>
    {props.children}
  </FavoritesContext.Provider>
}

export default FavoritesProvider