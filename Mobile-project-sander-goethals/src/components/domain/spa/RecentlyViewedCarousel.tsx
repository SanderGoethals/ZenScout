import React from 'react';
import { useAppSelector } from '../../../hooks/reduxHooks';
import SpaCarousel from './SpaCarousel';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { toggle } from '../../../store/favorites/slice';
import { getCategoryColor } from '../../../theme/categoryHelpers';


const RecentlyViewedCarousel = () => {
  const dispatch = useAppDispatch();

  const recentlyViewed = useAppSelector(
    (state) => state.recentlyViewed
  );

  const favorites = useAppSelector(
    (state) => state.favorites
  );

  const isFavorite = (id: string) =>
    favorites.some((fav) => fav.id === id);

  if (recentlyViewed.length === 0) return null;

  return <SpaCarousel 
        data={recentlyViewed}       
        getItemColor={(index) =>
        getCategoryColor(
          'recentlyViewed',
          index % 2 === 0 ? 'first' : 'second')}
        isItemFavorite={(item) => isFavorite(item.id)}
        onActionPress={(item) => dispatch(toggle(item))}
        actionIcon="heart"
        actionColor="#E0245E" />;
};

export default RecentlyViewedCarousel;
