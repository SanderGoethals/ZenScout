import React from 'react';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { toggle } from '../../../store/favorites/slice';
import SpaCarousel from './SpaCarousel';
import { FavoriteCarouselProps } from './spa.types';
import { getCategoryColor } from '../../../theme/categoryHelpers';

const FavoritesCarousel = ({ favorites }: FavoriteCarouselProps) => {
  const dispatch = useAppDispatch();

  return (
    <SpaCarousel
      data={favorites}
        getItemColor={(index) =>
        getCategoryColor(
          'recentlyViewed',
          index % 2 === 0 ? 'first' : 'second'
        )
      }
      onActionPress={(item) => dispatch(toggle(item))}
      actionIcon="heart"
      actionColor="#E0245E"
    />
  );
};

export default FavoritesCarousel;
