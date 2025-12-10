import React from 'react';
import { useRoute } from '@react-navigation/native';

import { RootStackNavProps } from '../../navigators/types';
import SpaDetailsView from '../../components/SpaDetailsView';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { toggle } from '../../store/favorites/slice';

const EVEN_COLOR = '#E3ECE8';
const ODD_COLOR  = '#C7DAD0';

const WellnessDetailsScreen = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites);

  const {
    params: { data },
  } =
    useRoute<
      RootStackNavProps<'wellnessDetails'>['route']
    >();

  return (
    <SpaDetailsView
      data={data}
      isFavorite={favorites.some(f => f.id === data.id)}
      onToggleFavorite={(item) => dispatch(toggle(item))}
      evenColor={EVEN_COLOR}
      oddColor={ODD_COLOR}
    />
  );
};

export default WellnessDetailsScreen;
