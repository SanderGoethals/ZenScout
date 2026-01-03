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

  if (recentlyViewed.length === 0) return null;

  return <SpaCarousel 
        data={recentlyViewed}       
        getItemColor={(index) =>
        getCategoryColor(
          'recentlyViewed',
          index % 2 === 0 ? 'first' : 'second')}
        onActionPress={(item) => dispatch(toggle(item))}
        actionIcon="heart"
        actionColor="#E0245E" />;
};

export default RecentlyViewedCarousel;
